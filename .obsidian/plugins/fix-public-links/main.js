const { Plugin } = require('obsidian');

module.exports = class FixPublicLinksPlugin extends Plugin {
	async onload() {
		console.log('Loading Fix Public Links plugin');

		// 监听文件创建事件（粘贴图片时触发）
		this.registerEvent(
			this.app.vault.on('create', (file) => {
				// 延迟执行，确保 Obsidian 已经插入了链接
				setTimeout(() => {
					this.fixPublicLinksInActiveFile();
				}, 100);
			})
		);

		// 添加命令：手动修复当前文件的所有链接
		this.addCommand({
			id: 'fix-public-links',
			name: 'Fix public/ links in current file',
			editorCallback: (editor) => {
				this.fixPublicLinksInEditor(editor);
			}
		});
	}

	fixPublicLinksInActiveFile() {
		const activeView = this.app.workspace.getActiveViewOfType(require('obsidian').MarkdownView);
		if (!activeView) return;

		const editor = activeView.editor;
		this.fixPublicLinksInEditor(editor);
	}

	fixPublicLinksInEditor(editor) {
		const cursor = editor.getCursor();
		const lineCount = editor.lineCount();
		let fixed = false;

		// 遍历所有行
		for (let i = 0; i < lineCount; i++) {
			const line = editor.getLine(i);

			// 匹配 Markdown 图片语法：![...](public/...)
			const fixedLine = line.replace(/\]\(public\//g, '](/public/');

			if (fixedLine !== line) {
				editor.replaceRange(
					fixedLine,
					{ line: i, ch: 0 },
					{ line: i, ch: line.length }
				);
				fixed = true;
			}
		}

		if (fixed) {
			console.log('Fixed public/ links in current file');
		}
	}

	onunload() {
		console.log('Unloading Fix Public Links plugin');
	}
};
