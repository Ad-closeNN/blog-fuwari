import { visit } from "unist-util-visit";

function rewritePublicPath(url) {
	if (typeof url !== "string") {
		return url;
	}

	if (url === "/public") {
		return "/";
	}

	if (url.startsWith("/public/")) {
		return url.slice("/public".length);
	}

	return url;
}

export function remarkPublicImagePaths() {
	return (tree) => {
		visit(tree, "image", (node) => {
			node.url = rewritePublicPath(node.url);
		});
	};
}
