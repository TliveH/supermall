const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 开启 CSS source maps?
  css:{
    sourceMap: false,
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("@/assets"))
      .set("components", resolve("@/components"))
      .set("network", resolve("@/network"))
      .set("views", resolve("@/views"))
  }
}

