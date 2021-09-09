// const autoprefixer = require('autoprefixer');
// const pxtorem = require('postcss-pxtorem');
let distDir = "dist";
module.exports = {
  //默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
  //如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。
  //例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  //Default: '/'
  publicPath:
    process.env.NODE_ENV === "production"
      ? "./" // /h5/
      : "/",
  //当运行 vue-cli-service build 时生成的生产环境构建文件的目录。Default: 'dist'
  outputDir: distDir,

  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。Default: ''
  assetsDir: "static",

  //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。 Default: 'index.html'
  indexPath: "index.html",

  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  //然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
  //Default: true
  filenameHashing: true,

  //在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字
  //Default: undefined
  // pages: {
  //   index: {
  //     // page 的入口
  //     entry: 'src/index/main.js',
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 在 dist/index.html 的输出
  //     filename: 'index.html',
  //     // 当使用 title 选项时，
  //     // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  //     title: 'Index Page',
  //     // 在这个页面中包含的块，默认情况下会包含
  //     // 提取出来的通用 chunk 和 vendor chunk。
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   },
  //   // 当使用只有入口的字符串格式时，
  //   // 模板会被推导为 `public/subpage.html`
  //   // 并且如果找不到的话，就回退到 `public/index.html`。
  //   // 输出文件名会被推导为 `subpage.html`。
  //   subpage: 'src/subpage/main.js'
  // },

  //是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  //Default: true
  //如果生产环境关闭eslint lintOnSave: process.env.NODE_ENV !== 'production'
  lintOnSave: false,

  // // 是否使用包含运行时编译器的Vue核心的构建
  // runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  // Default: []
  // transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  // Default: true
  productionSourceMap: false,

  //在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
  //如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
  //Default: false
  // integrity:false,

  // // cors 相关 https://jakearchibald.com/2017/es-modules-in-browsers/#always-cors
  // // corsUseCredentials: false,

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
  // https://cli.vuejs.org/guide/webpack.html#simple-configuration https://cli.vuejs.org/zh/config/#integrity
  // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    } 
  },

  // // webpack 链接 API，用于生成和修改 webapck 配置
  // // https://github.com/mozilla-neutrino/webpack-chain
  //https://cli.vuejs.org/zh/config/#chainwebpack
  // chainWebpack: (config) => {
    // 因为是多页面，所以取消 chunks，每个页面只对应一个单独的 JS / CSS
    // config.optimization
    //   .splitChunks({
    //     cacheGroups: {}
    //   });

    // 移除 prefetch 插件
    // config.plugins.delete("prefetch");

    // 'src/lib' 目录下为外部库文件，不参与 eslint 检测
    // config.module
    //   .rule('eslint')
    //   .exclude
    //   .add('/Users/maybexia/Downloads/FE/community_built-in/src/lib')
    //   .end()
  // },

  // // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     require('postcss-pxtorem')({
      //       rootValue: 20,
      //       minPixelValue: 2,
      //       propList: ['*', '!border'],
      //       selectorBlackList: ['van-circle__layer', 'user-px', 'use-px']
      //     })
      //   ]
      // },
      // less: {
      //   modifyVars: {
      //     // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
      //     hack: `true; @import "${path.join(
      //       __dirname,
      //       './src/css/element-reset.less'
      //     )}";`
      //   }
      // }
    },
  },

  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  // parallel: require('os').cpus().length > 1,

  // // https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},

  // // 第三方插件配置
  // pluginOptions: {}
};
