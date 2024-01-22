const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "projectsAppsNqldMainWebAngular",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },

        // For remotes (please adjust)
        name: "projectsAppsNqldMainWebAngular",
        filename: "remoteEntry.js",
        exposes: {
            './appNqld': './projects/apps/nqld/main-web-angular/src/app/app.component.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "projectsAppsKtklMainApi": "http://localhost:4200/remoteEntry.js",
        //     "projectsAppsKtklMainWebAngular": "http://localhost:4200/remoteEntry.js",
        //     "projectsAppsNqldMainApi": "http://localhost:4200/remoteEntry.js",
        //     "projectsMicroFeHutechAppShell": "http://localhost:4200/remoteEntry.js",
        //     "projectsMicroFeRoyalAppShell": "http://localhost:4200/remoteEntry.js",
        //     "projectsMicroFeUefAppShell": "http://localhost:4200/remoteEntry.js",

        // },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })

    }),
    sharedMappings.getPlugin()
  ],
};
