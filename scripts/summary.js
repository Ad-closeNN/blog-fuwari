/* This is a script to generate AI summary for a post */

import fs from "fs"
import path from "path"
import https from "https"
import readline from "readline"

const targetDir = "./src/content/posts/"
const summaryModel = "gpt-5-nano"
const batchDelayMs = 1500
const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

function parseAiSummaryValue(value) {
    const trimmed = value.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('"')) {
        try {
            return JSON.parse(trimmed)
        } catch {
            return trimmed
        }
    }
    return trimmed
}

function extractAiSummary(frontmatter) {
    const summaryMatch = frontmatter.match(/^aiSummary:[ \t]*(.*)$/m)
    if (!summaryMatch) return null

    const inlineValue = summaryMatch[1].trim()
    if (inlineValue !== ">" && inlineValue !== "|") {
        return parseAiSummaryValue(inlineValue)
    }

    const afterSummary = frontmatter.slice(summaryMatch.index + summaryMatch[0].length)
    const lines = afterSummary.split(/\r?\n/)
    const blockLines = []
    for (const line of lines) {
        if (!line.startsWith(" ") && line.trim()) break
        blockLines.push(line.replace(/^ {1,2}/, ""))
    }
    return blockLines.join("\n").trim() || null
}

function formatFrontmatterField(key, value) {
    return `${key}: ${JSON.stringify(value.replace(/\r?\n/g, " "))}`
}

function upsertFrontmatterField(frontmatter, key, value) {
    const fieldPattern = new RegExp(`^${key}:[ \\t]*(?:.*(?:\\r?\\n[ \\t].*)*)`, "m")
    const formattedField = formatFrontmatterField(key, value)
    return fieldPattern.test(frontmatter)
        ? frontmatter.replace(fieldPattern, formattedField)
        : `${frontmatter.trimEnd()}\n${formattedField}`
}

function stripAdmonitionMarkers(text) {
    return text
        .replace(/^:::(note|tip|important|caution|warning)(?:\[[^\]]*\])?\s*$/gim, "")
        .replace(/^:::\s*$/gm, "")
        .replace(/^>\s*\[!(note|tip|important|caution|warning)\]\s*$/gim, "")
        .replace(/^\s*\[!(note|tip|important|caution|warning)\]\s*/gim, "")
}

function cleanGeneratedSummary(summary) {
    return stripAdmonitionMarkers(summary)
        .replace(/^(note|tip|important|caution|warning|警告|注意|提示)[：:\s-]+/i, "")
        .replace(/\s+/g, " ")
        .trim()
}

function getPostFiles() {
    const files = fs.readdirSync(targetDir)
    return files.filter(f => f.endsWith(".md") || f.endsWith(".mdx"))
}

function getCurrentAiSummary(fileName) {
    const fullPath = path.join(targetDir, fileName)
    const content = fs.readFileSync(fullPath, "utf-8")
    const match = content.match(frontmatterRegex)
    if (match) {
        const frontmatter = match[1]
        const summary = extractAiSummary(frontmatter)
        if (summary) {
            return summary
        }
    }
    return null
}

function selectFile(files) {
    return new Promise((resolve) => {
        const rl = createInterface()
        const summaries = new Map(files.map(file => [file, getCurrentAiSummary(file)]))
        const wasRaw = process.stdin.isRaw
        let selectedIndex = 0
        let closed = false

        readline.emitKeypressEvents(process.stdin, rl)
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(true)
        }

        const cleanup = () => {
            if (closed) return
            closed = true
            process.stdin.removeListener("keypress", onKey)
            if (process.stdin.isTTY) {
                process.stdin.setRawMode(Boolean(wasRaw))
            }
            process.stdout.write("\x1b[?25h")
            rl.close()
        }

        const draw = () => {
            const rows = process.stdout.rows || 24
            const listHeight = Math.max(5, rows - 8)
            const start = Math.min(
                Math.max(0, selectedIndex - Math.floor(listHeight / 2)),
                Math.max(0, files.length - listHeight),
            )
            const visibleFiles = files.slice(start, start + listHeight)
            let output = "\x1b[?25l\x1b[2J\x1b[H"
            output += "选择文章（↑/↓ 或 j/k 移动，Enter 确认，q/Esc 取消）\n\n"

            visibleFiles.forEach((file, offset) => {
                const index = start + offset
                const currentSummary = summaries.get(file)
                const prefix = index === selectedIndex ? "❯" : " "
                const hasSummary = currentSummary ? "  已有摘要" : ""
                output += `${prefix} ${file}${hasSummary}\n`
            })

            const currentFile = files[selectedIndex]
            const currentSummary = summaries.get(currentFile)
            output += `\n${selectedIndex + 1}/${files.length} ${currentFile}\n`
            if (currentSummary) {
                output += `当前摘要：${currentSummary}\n`
            }
            process.stdout.write(output)
        }

        const cancel = () => {
            cleanup()
            process.stdout.write("已取消\n")
            process.exit(0)
        }

        const onKey = (_str, key = {}) => {
            if (key.ctrl && key.name === "c") {
                cancel()
            }

            if (key.name === "up" || key.name === "k") {
                selectedIndex = Math.max(0, selectedIndex - 1)
                draw()
                return
            }

            if (key.name === "down" || key.name === "j") {
                selectedIndex = Math.min(files.length - 1, selectedIndex + 1)
                draw()
                return
            }

            if (key.name === "return") {
                const selectedFile = files[selectedIndex]
                cleanup()
                resolve(selectedFile)
                return
            }

            if (key.name === "escape" || key.name === "q") {
                cancel()
            }
        }

        process.stdin.on("keypress", onKey)
        draw()
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getRetryAfterMs(value) {
    if (!value) return null

    const seconds = Number(value)
    if (Number.isFinite(seconds)) {
        return Math.max(0, seconds * 1000)
    }

    const timestamp = Date.parse(value)
    if (Number.isFinite(timestamp)) {
        return Math.max(0, timestamp - Date.now())
    }

    return null
}

function getRetryDelayMs(error, attempt) {
    const retryAfterMs = getRetryAfterMs(error.retryAfter)
    if (retryAfterMs !== null) {
        return Math.min(retryAfterMs, 120000)
    }

    const exponentialDelay = 3000 * 2 ** (attempt - 1)
    const jitter = Math.floor(Math.random() * 1000)
    return Math.min(exponentialDelay + jitter, 120000)
}

function shouldRetry(error) {
    return !error.statusCode || error.statusCode === 429 || error.statusCode >= 500
}

function requestSummary(options, requestBody) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = ""

            res.on("data", (chunk) => {
                data += chunk
            })

            res.on("end", () => {
                if (res.statusCode !== 200) {
                    const error = new Error(`HTTP ${res.statusCode}`)
                    error.statusCode = res.statusCode
                    error.retryAfter = res.headers["retry-after"]
                    error.responseBody = data.slice(0, 500)
                    reject(error)
                    return
                }

                try {
                    const response = JSON.parse(data)
                    const output = response.output
                    if (!output || !Array.isArray(output)) {
                        reject(new Error("Failed to generate summary"))
                        return
                    }

                    const messageOutput = output.find(o => o.type === "message")
                    if (!messageOutput || !messageOutput.content) {
                        reject(new Error("No message output found"))
                        return
                    }

                    const textBlock = messageOutput.content.find((block) => block.type === "output_text")
                    if (!textBlock) {
                        reject(new Error("No output_text block found"))
                        return
                    }

                    resolve(textBlock.text.trim())
                } catch (error) {
                    reject(error)
                }
            })
        })

        req.on("error", (error) => {
            reject(error)
        })

        req.write(requestBody)
        req.end()
    })
}

async function generateSummary(fileName) {
    const fullPath = path.join(targetDir, fileName)
    const fileContent = fs.readFileSync(fullPath, "utf-8")
    const frontmatterMatch = fileContent.match(frontmatterRegex)
    const bodyContent = stripAdmonitionMarkers(
        frontmatterMatch
            ? fileContent.slice(frontmatterMatch[0].length).trimStart()
            : fileContent,
    )

    console.log("\n生成 AI 摘要中...\n")

    const apiKey = "public"
    const apiUrl = "opencode.ai/zen"
    const prompt = `请为以下博客文章生成一个不超过100字的中文摘要。

输出要求：
- 只输出摘要正文，不要解释，不要加标题。
- 摘要必须以“本文介绍了”开头。
- 使用一句话概括文章主题、关键内容和用途。
- 不要输出 Markdown 语法、admonition 标记或提示框类型，例如 :::warning、:::caution、[!warning]、警告、注意。

文章内容：
${bodyContent}`

    const requestBody = JSON.stringify({
        model: summaryModel,
        input: [
            {
                role: "user",
                content: [{ type: "input_text", text: prompt }]
            }
        ],
        max_output_tokens: 500,
        stream: false,
        reasoning: { effort: "minimal" }
    })

    const url = new URL(`https://${apiUrl}/v1/responses`)
    const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "anthropic-version": "2023-06-01"
        }
    }

    const maxAttempts = 6
    let summary = ""
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            summary = cleanGeneratedSummary(await requestSummary(options, requestBody))
            break
        } catch (error) {
            if (!shouldRetry(error) || attempt === maxAttempts) {
                if (error.responseBody) {
                    console.error("Error response:", error.responseBody)
                }
                throw error
            }

            const delayMs = getRetryDelayMs(error, attempt)
            console.warn(`请求失败：${error.message}，${Math.ceil(delayMs / 1000)} 秒后重试（${attempt}/${maxAttempts - 1}）`)
            await sleep(delayMs)
        }
    }

    let newContent
    if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1]
        const newFrontmatter = upsertFrontmatterField(
            upsertFrontmatterField(frontmatter, "aiSummary", summary),
            "aiSummaryModel",
            summaryModel,
        )

        newContent = `---\n${newFrontmatter}\n---\n${bodyContent}`
    } else {
        newContent = `---\n${formatFrontmatterField("aiSummary", summary)}\n${formatFrontmatterField("aiSummaryModel", summaryModel)}\n---\n${bodyContent}`
    }

    fs.writeFileSync(fullPath, newContent)
    return summary
}

function createInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
}

async function generateMissingSummaries(files, { force = false } = {}) {
    const pendingFiles = force ? files : files.filter(file => !getCurrentAiSummary(file))

    if (pendingFiles.length === 0) {
        console.log("所有文章都已有 AI 摘要")
        return
    }

    if (force) {
        console.log(`将强制为 ${pendingFiles.length} 篇文章重新生成 AI 摘要。\n`)
    } else {
        console.log(`将为 ${pendingFiles.length} 篇文章生成 AI 摘要，跳过 ${files.length - pendingFiles.length} 篇已有摘要的文章。\n`)
    }

    const failedFiles = []

    for (const [index, file] of pendingFiles.entries()) {
        console.log(`[${index + 1}/${pendingFiles.length}] ${file}`)
        try {
            const summary = await generateSummary(file)
            console.log(`完成：${summary}\n`)
            if (index < pendingFiles.length - 1) {
                await sleep(batchDelayMs)
            }
        } catch (err) {
            failedFiles.push({ file, message: err.message })
            console.error(`失败：${file} - ${err.message}\n`)
        }
    }

    if (failedFiles.length > 0) {
        console.error("以下文章生成失败：")
        failedFiles.forEach(({ file, message }) => {
            console.error(`- ${file}: ${message}`)
        })
        process.exitCode = 1
    }
}

async function main() {
    const files = getPostFiles()
    const args = process.argv.slice(2)
    const force = args.includes("--force")
    const all = args.includes("--all")
    const positionalArgs = args.filter(arg => !arg.startsWith("--"))

    if (files.length === 0) {
        console.log("没有找到任何文章文件")
        process.exit(1)
    }

    if (all) {
        await generateMissingSummaries(files, { force })
    } else if (positionalArgs.length > 0) {
        const fileName = positionalArgs[0]
        let targetFile = fileName

        const fileExtensionRegex = /\.md(x)?$/i
        if (!fileExtensionRegex.test(targetFile)) {
            targetFile += ".md"
        }

        if (!files.includes(targetFile)) {
            console.error(`Error: File ${targetFile} does not exist`)
            process.exit(1)
        }

        try {
            const summary = await generateSummary(targetFile)
            console.log(`AI 摘要已生成: \n${summary}`)
        } catch (err) {
            console.error(`生成失败: ${err.message}`)
            process.exit(1)
        }
    } else {
        const selectedFile = await selectFile(files)
        console.log(`已选择: ${selectedFile}\n`)

        try {
            const summary = await generateSummary(selectedFile)
            console.log(`AI 摘要已生成: ${summary}`)
        } catch (err) {
            console.error(`生成失败: ${err.message}`)
            process.exit(1)
        }
    }
}

main().catch((err) => {
    console.error("Error:", err.message)
    process.exit(1)
})