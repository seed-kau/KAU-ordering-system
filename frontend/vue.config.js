module.exports = {
  devServer: {
    proxy: {
      '/order/menu': {
        target: 'http://localhost:3000/order/menu',
        changeOrigin: true,
        pathRewrite: {
          '^/order/menu' : ''
        }
      }
    },
  },
  outputDir: '../backend/public'
}