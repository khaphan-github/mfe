import { loadRemoteModule } from '@angular-architects/module-federation';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
const MFE_APP_URL = "http://localhost:4201/remoteEntry.js";


export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcomeComponent,
  },
  {
    path: 'remote',
    loadComponent: async () => {
      try {
        const m = await loadRemoteModule({
          remoteEntry: MFE_APP_URL,
          type: 'module',
          exposedModule: "./projectsAppsNqldMainWebAngular",
        });
        console.log(m);
        return m.AppChildComponent;
      } catch (err) {
        return console.log(err);
      }
    }
  }
];
