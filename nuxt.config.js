let config =  {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: `${process.env.TITLE}`,
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "noindex" },
      { name: "googlebot", content: "noindex" },
      // { hid: 'description', name: 'description', content: 'We Protect Your Future' },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: `${process.env.TITLE}`,
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Join us to create a workforce that's motivated, satisfied, and financially secure.",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: `/favicon.ico`,
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  publicRuntimeConfig: {
    // env to be used on client side. Can be accessed thru $config
    ASSET_ROOT: process.env.ASSET_ROOT,
    STATIC_ROOT: process.env.STATIC_ROOT,
    APPLICATION_ENV: process.env.APPLICATION_ENV,
    API_DOMAIN: process.env.ADMIN_API_DOMAIN,
    VERSION: Date.now(),
    TITLE: process.env.TITLE,
  },
  privateRuntimeConfig: {
    // this will not be exposed on client side
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/bootstrap5.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
    "vue-select/dist/vue-select.css",
    "vue2-datepicker/index.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "~/assets/css/page.css",
    "~/assets/css/style.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/apis" },
    { src: "~plugins/csv", mode: "client" },
    { src: "~plugins/upload", mode: "client" },
    { src: "~plugins/compress", mode: "client" },
    { src: "~plugins/storemap", mode: "client" },
    { src: "~plugins/utils" },
    { src: "~/plugins/dogForm" },
    { src: "~/plugins/vue2Editor", mode: "client" },
    { src: "~/plugins/datepicker", mode: "client" },
    { src: "~/plugins/vselect", mode: "client" },
    { src: "~/plugins/qrCode", mode: "client" },
    { src: "~/plugins/wysiwyg", mode: "client" },
    { src: "~/plugins/lottie", mode: "client" },
    { src: "~/plugins/boxIcons", mode: "client" },
    { src: "~/plugins/clickOutside", mode: "client" },
    { src: "~/plugins/draggable", mode: "client" },
    { src: "~/plugins/bootstrap5", mode: "client" },
    { src: "~/plugins/chartJs", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  serverMiddleware: ["~/api/index.js"],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-i18n",
    "vue2-editor/nuxt",
    "@nuxtjs/fontawesome",
  ],
  i18n: {
    locales: [
      { code: "id", file: "id.json", name: "Bahasa Indonesia" },
      { code: "en", file: "en.json", name: "English (US/UK)" },
      // { code: "cn", file: "cn.json", name: "简体中文" },
      // { code: "my", file: "my.json", name: "Bahasa Melayu" },
    ],
    langDir: "~/assets/lang",
    defaultLocale: "en",
    strategy: "no_prefix",
    lazy: true,
  },
  fontawesome: {
    component: "Fa",
    suffix: false,
    icons: {
      brands: true,
      regular: true,
      solid: true,
    },
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "/",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    filenames: {
      app: ({ isDev, isModern }) =>
        isDev
          ? `[name]${isModern ? ".modern" : ""}.js`
          : `[name]${isModern ? ".modern" : ""}.js?ver=[contenthash:7]`,
      chunk: ({ isDev, isModern }) =>
        isDev
          ? `[name]${isModern ? ".modern" : ""}.js`
          : `[name]${isModern ? ".modern" : ""}.js?ver=[contenthash:7]`,
      css: ({ isDev }) =>
        isDev ? "[name].css" : "[path][name].css?ver=[contenthash:7]",
      img: ({ isDev }) =>
        isDev
          ? "[path][name].[ext]"
          : "img/[path][name].[ext]?ver=[contenthash:7]",
      font: ({ isDev }) =>
        isDev
          ? "[path][name].[ext]"
          : "fonts/[path][name].[ext]?ver=[contenthash:7]",
      video: ({ isDev }) =>
        isDev
          ? "[path][name].[ext]"
          : "videos/[path][name].[ext]?ver=[contenthash:7]",
    },
    publicPath: process.env.ASSET_ROOT,
    html: {
      minify: {
        removeRedundantAttributes: false,
      },
    },
    extend(config, ctx) {
      config.node = {
        fs: "empty",
      };
    },
  },
  server: {
    port: process.env.PORT, // default: 3000
    host: "0.0.0.0",
  },
  /* render: {
    static: { // remove CORS error when loading static files from different domain
      setHeaders(res) {
        res.setHeader('X-Frame-Options', 'ALLOWALL')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      }
    }
  }, */
  loading: {
    color: "var(--primary)",
    height: "4px",
  },
}

if (process.env.APPLICATION_ENV == "staging") {
  config.head.meta.push({ name: "robots", content: "noindex" });
  config.modules.push("@nuxtjs/robots");
  config.robots = {
    UserAgent: "*",
    Disallow: "/",
  };
} else if (process.env.APPLICATION_ENV == "production") {
  config.modules.push("@nuxtjs/robots");
  config.robots = {
    UserAgent: "*",
    Allow: "/",
    Sitemap: `${process.env.SITEMAP_URL}`,
  };
} else {
  config.head.meta.push({ name: "robots", content: "noindex" });
  config.modules.push("@nuxtjs/robots");
  config.robots = {
    UserAgent: "*",
    Disallow: "/",
  };
}


export default config;
