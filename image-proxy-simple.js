// 简单的图片代理服务器 - 解决外部图片CORS问题
// 使用方法: node image-proxy-simple.js
// 然后访问: http://localhost:3001/proxy?url=图片URL

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // 注意：Node.js 18+ 可能需要使用内置的 fetch
const app = express();
const PORT = 3001;

// 启用CORS，允许所有来源
app.use(cors({
  origin: '*',
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));

// 图片代理端点
app.get('/proxy', async (req, res) => {
  try {
    const imageUrl = req.query.url;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'Missing url parameter' });
    }
    
    console.log('代理请求:', imageUrl);
    
    // 获取外部图片
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!response.ok) {
      console.error(`获取图片失败: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ 
        error: `Failed to fetch image: ${response.statusText}` 
      });
    }
    
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    // 设置响应头
    res.set({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600', // 缓存1小时
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    
    // 流式传输图片数据
    response.body.pipe(res);
    
    console.log(`成功代理图片: ${contentType}`);
    
  } catch (error) {
    console.error('代理错误:', error);
    res.status(500).json({ error: 'Internal server error: ' + error.message });
  }
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: '图片代理服务运行正常'
  });
});

// 根路径说明
app.get('/', (req, res) => {
  res.json({
    service: 'Image Proxy Server',
    usage: `${req.protocol}://${req.get('host')}/proxy?url=<图片URL>`,
    example: `${req.protocol}://${req.get('host')}/proxy?url=https://example.com/image.jpg`,
    health: `${req.protocol}://${req.get('host')}/health`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 图片代理服务器启动成功！`);
  console.log(`📍 服务地址: http://localhost:${PORT}`);
  console.log(`📖 使用方法: http://localhost:${PORT}/proxy?url=<图片URL>`);
  console.log(`💡 示例: http://localhost:${PORT}/proxy?url=https://github.com/user-attachments/assets/example.jpg`);
  console.log(`🔍 健康检查: http://localhost:${PORT}/health`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 服务器正在关闭...');
  process.exit(0);
});

/*
安装依赖:
npm init -y
npm install express cors node-fetch

package.json 示例:
{
  "name": "image-proxy-server",
  "version": "1.0.0",
  "description": "Simple image proxy server to bypass CORS",
  "main": "image-proxy-simple.js",
  "scripts": {
    "start": "node image-proxy-simple.js",
    "dev": "nodemon image-proxy-simple.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "node-fetch": "^2.6.7"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
*/

