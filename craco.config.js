const path = require('path')
const CracoLessPlugin = require('craco-less')

const resolve = (dir) => path.resolve(__dirname, dir) // 拼接进当前目录

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
