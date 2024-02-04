import { NgModule } from '@angular/core';
import { InsertHtmlDirective } from './insert-html.directive';

@NgModule({
  declarations: [InsertHtmlDirective],
  exports: [InsertHtmlDirective],
})
export class InsertHtmlModule {}
