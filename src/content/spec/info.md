# 信息/提交记录
## 概览
**当前提交：**
<span>
    <a id="github-commit-link2" href="#" target="_blank">
        <span id="github-commit2">加载中...</span>
    </a>
</span>
<br>
提交哈希：<code id="github-commit-full-hash">加载中...</code>
<br>
提交者：
<span>
    <a id="github-commit-author-link" href="#" target="_blank">
        <span id="github-commit-author">加载中...</span>
    </a>
</span>
<br>
提交日期：<span id="github-commit-date">加载中...</span>
<br>
提交详情：
<pre id="github-commit-message">加载中...</pre>

## 完整提交记录
<pre id="github-commit-full">加载中...</pre>


<script>
    async function loadCommitStats2() {
        try {
            const statsElement = document.getElementById('github-commit2'); // 查找 id
            const link = document.getElementById('github-commit-link2'); // 查找 id

            const hashElement = document.getElementById('github-commit-hash'); // 查找 id
            const fullHashElement = document.getElementById('github-commit-full-hash'); // 查找 id
            const messageElement = document.getElementById('github-commit-message'); // 查找 id
            const authorElement = document.getElementById('github-commit-author'); // 查找 id
            const dateElement = document.getElementById('github-commit-date'); // 查找 id
            const urlElement = document.getElementById('github-commit-url'); // 查找 id
            const authorElementUrl = document.getElementById('github-commit-author-link'); // 查找 id
            const fullElement = document.getElementById('github-commit-full'); // 查找 id

            // 第一步：调用 API                
            const githubResponse = await fetch(`https://api.github.com/repos/Ad-closeNN/blog-fuwari/commits?per_page=1`);

            if (!githubResponse.ok) {
                throw new Error('获取信息失败');
            }

            let Data = await githubResponse.json();
            Data = Data[0];

            // 第二步：获取 Commit 数据
            const latestCommit = Data;
            
            const commitData = {
                hash: latestCommit.sha.slice(0, 7),
                fullHash: latestCommit.sha,
                message: latestCommit.commit.message.split('\n')[0],
                author: latestCommit.commit.author.name,
                date: latestCommit.commit.author.date,
                url: latestCommit.html_url
            };
            
            
            if (statsElement) {
                statsElement.textContent = `${Data.sha.slice(0,7)}`;
            }
            
            if (hashElement) {
                hashElement.textContent = commitData.hash;
            }

            if (fullHashElement) {
                fullHashElement.textContent = commitData.fullHash;
            }
            if (messageElement) {
                messageElement.textContent = "1. " + Data.commit.message.replace('\n\n', '\n');
            }
            if (authorElement) {
                authorElement.textContent = commitData.author;
            }
            if (authorElementUrl) {
                authorElementUrl.href = "https://github.com/"+commitData.author;
                authorElementUrl.title = "查看提交者 "+commitData.author;
            }

                        function convertToUTC8(utcTimeString) {
            const date = new Date(utcTimeString);
            
            // 明确指定时区为 Asia/Shanghai (UTC+8)
            return date.toLocaleString("zh-CN", {
                timeZone: "Asia/Shanghai", // 强制使用 UTC+8 时区
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });
            }

            if (dateElement) {
                dateElement.textContent = convertToUTC8(commitData.date) + " " + "(UTC+8:00)";
            }
            if (urlElement) {
                urlElement.textContent = commitData.url;
            }

            if (fullElement) {
                fullElement.textContent = JSON.stringify(Data, null, 2);
            }

            if (link){
            const gurl = "https://github.com/Ad-closeNN/blog-fuwari/commit/"+Data.sha;
                link.href = gurl;
                link.title = "("+Data.commit.committer.date + ")" + " " + Data.commit.message;
            }
        } catch (error) {
            console.error('获取 Commit 信息失败:', error);  
            const statsElement = document.getElementById('github-commit2');
            if (statsElement) {
                statsElement.textContent = '提交信息不可用';
            }
        }
    }

    
    // 页面加载完成后获取 Commit 数据
    addEventListener('DOMContentLoaded', loadCommitStats2);
    // 页面加载完成后获取 Commit 数据
    function initCommitStats() {
        // 检查是否在 info 页面
        if (window.location.pathname === '/info/') {
            loadCommitStats2();
        }
    }

    // 初始加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCommitStats);
    } else {
        initCommitStats();
    }

    // Swup 页面跳转后重新执行
    if (window.swup) {
        window.swup.hooks.on('page:view', initCommitStats);
    } else {
        document.addEventListener('swup:enable', () => {
            window.swup.hooks.on('page:view', initCommitStats);
        });
    }   
</script>
</MainGridLayout>