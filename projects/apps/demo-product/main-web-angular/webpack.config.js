const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'projects-apps-demo-product-main-web-angular',
  exposes: {
    './Component': './projects/apps/demo-product/main-web-angular/src/app/modules/product/product.module.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    }),
  },
});
