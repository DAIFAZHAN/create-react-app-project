const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir) // 拼接进当前目录

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
