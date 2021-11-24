module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/styles/abstracts/_mixins.scss";
          @import "~@/styles/abstracts/_variables.scss";
          @import "~@/styles/abstracts/_helpers.scss";
        `,
      },
    },
  },
  devServer: {
    disableHostCheck: true,
  },
};
