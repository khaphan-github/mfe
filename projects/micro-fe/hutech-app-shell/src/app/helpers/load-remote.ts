import { loadRemoteModule } from "@angular-architects/module-federation";

export const loadRemote = async (envRemote: string, moduleName: string) => {
  try {
    const m = await loadRemoteModule({
      type: 'module',
      exposedModule: "./routes",
      remoteEntry: envRemote + '/remoteEntry.js',
    });
    console.log(m);
    return m.MFE_ROUTES;
  } catch (err) {
    console.error(`Error when load remote ${envRemote}, ${err}`);
    return null;
  }
}
