import { Routes } from '@angular/router';
import { MemLayoutComponent } from '../layouts/mem-layout/mem-layout.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from './environments/environment';

const loadRemote = async (envRemote: string) => {
  try {
    const m = await loadRemoteModule({
      type: 'module',
      exposedModule: "./Component",
      remoteEntry: envRemote + '/remoteEntry.js',
    });
    console.log(m);
    return m.AppComponent;
  } catch (err) {
    // Display error component
    return console.log(err);
  }
}
export const memLayoutRoutes: Routes = [
  {
    path: '',
    component: MemLayoutComponent,
    children: [
      {
        path: 'nqld',
        loadComponent: () =>
          loadRemote(
            environment.microFeRemoteEntry.noiQuyLaoDong
          ),
      },
      {
        path: 'product',
        loadComponent: () =>
          loadRemote(
            environment.microFeRemoteEntry.demoProduct
          ),
      }
      // Add other remote entry;
    ]
  },
];
