import { Routes } from '@angular/router';
import { MemLayoutComponent } from '../layouts/mem-layout/mem-layout.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from './environments/environment';

const loadRemote = async (envRemote: string, moduleName: string) => {
  try {
    const m = await loadRemoteModule({
      type: 'module',
      exposedModule: "./Component",
      remoteEntry: envRemote + '/remoteEntry.js',
    });
    console.log(m);
    return m[moduleName];
  } catch (err) {
    console.error(`Error when load remote ${envRemote}, ${err}`);
    return null;
  }
}
export const memLayoutRoutes: Routes = [
  {
    path: '',
    component: MemLayoutComponent,
    children: [
      {
        path: 'nqld',
        loadComponent: () => loadRemote(environment.microFeRemoteEntry.noiQuyLaoDong, ''),
      },
      {
        // Khi chuyển route trên app shell đến route này thì mfe product sẽ được load.
        path: 'product',
        loadChildren: () => loadRemote(environment.microFeRemoteEntry.demoProduct, 'ProductModule'),
      }
      // Add other remote entry;
    ]
  },
];
