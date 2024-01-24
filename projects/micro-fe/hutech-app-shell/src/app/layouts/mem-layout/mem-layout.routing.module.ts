import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemLayoutComponent } from './mem-layout.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
const MFE_APP_URL = "http://localhost:4201/remoteEntry.js";

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
              remoteEntry: MFE_APP_URL,
              type: 'module',
              exposedModule: "./projectsAppsNqldMainWebAngular",
            });
            console.log(m);
            return m.AppChildComponent;
          } catch (err) {
            // Display error component
            return console.log(err);
          }
        }
      }
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
