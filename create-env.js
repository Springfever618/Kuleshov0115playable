const fs = require('fs');
const path = require('path');

const apiKey = 'GEMINI_API_KEY=AIzaSyDNDk5hp6d6vhnO9uKHtm_BCJqYW_xDGzk';

// 写入 .env 文件 (UTF-8编码)
fs.writeFileSync('.env', apiKey, 'utf8');

// 写入 .env.local 文件 (UTF-8编码)
fs.writeFileSync('.env.local', apiKey, 'utf8');

console.log('.env and .env.local files created successfully with UTF-8 encoding');
