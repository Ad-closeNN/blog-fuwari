import fs from "node:fs/promises";
import path from "node:path";

const DIST_DIR = path.resolve("dist");
const REMOTE_RAW_ORIGIN = "https://cnb.cool/CLN-Grated/blog-fuwari/-/git/raw/main/public";
const TEXT_FILE_EXTENSIONS = new Set([".html", ".xml", ".json", ".js", ".css", ".txt"]);
const PIC_PATH_PATTERN = /(?:https:\/\/blog\.adclosenn\.top)?\/pic\/([^"'\s)<>]+)/g;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      return [fullPath];
    }),
  );

  return files.flat();
}

async function rewriteFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!TEXT_FILE_EXTENSIONS.has(ext)) {
    return 0;
  }

  const original = await fs.readFile(filePath, "utf8");
  let replacements = 0;
  const rewritten = original.replace(PIC_PATH_PATTERN, (_match, rest) => {
    replacements += 1;
    return `${REMOTE_RAW_ORIGIN}/pic/${rest}`;
  });

  if (rewritten === original) {
    return 0;
  }

  await fs.writeFile(filePath, rewritten, "utf8");
  return replacements;
}

async function main() {
  try {
    await fs.access(DIST_DIR);
  } catch {
    console.error(`[rewrite-built-image-links] dist directory not found: ${DIST_DIR}`);
    process.exit(1);
  }

  const files = await walk(DIST_DIR);
  let touchedFiles = 0;
  let totalReplacements = 0;

  for (const filePath of files) {
    const replacements = await rewriteFile(filePath);
    if (replacements > 0) {
      touchedFiles += 1;
      totalReplacements += replacements;
    }
  }

  console.log(
    `[rewrite-built-image-links] Replaced ${totalReplacements} link(s) in ${touchedFiles} file(s).`,
  );
}

await main();
