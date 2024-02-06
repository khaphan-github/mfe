const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'projects-apps-demo-product-main-web-angular',
  exposes: {
    "./routes": "./projects/apps/demo-product/main-web-angular/src/app/configs/mfe.routes.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    }),
  },
});
