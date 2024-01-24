import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemLayoutComponent } from './mem-layout.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../../config/environments/environment';

const memLayoutRoutes: Routes = [
  {
    path: '',
    component: MemLayoutComponent,
    children: [
      {
        path: 'nqld',
        loadComponent: async () => {
          try {
            const m = await loadRemoteModule({
              type: 'module',
              exposedModule: "./projectsAppsNqldMainWebAngular",
              remoteEntry: environment.microFeRemoteEntry.noiQuyLaoDong + '/remoteEntry.js',
            });
            console.log(m);
            return m.AppChildComponent;
          } catch (err) {
            // Display error component
            return console.log(err);
          }
        }
      }
      // Add other remote entry;
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(memLayoutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MemLayoutRoutingModule { }
