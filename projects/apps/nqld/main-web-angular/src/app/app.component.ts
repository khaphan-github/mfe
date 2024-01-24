import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AngularUISearchBarComponent } from '@erp/projects/libs/frontend/angular/ui/components/zaa-search-bar';
@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    AngularUISearchBarComponent,
  ],
  selector: 'erp-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppChildComponent {
  title = 'projects-apps-nqld--main-web-angular';
  onSearchChanged(event: any) {
    console.log(event);
  }
}
