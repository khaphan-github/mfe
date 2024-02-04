import { NgModule } from '@angular/core';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from './editor.component';
const tinyMCEPath = 'assets/js/tinyMCE/tinymce.js';
@NgModule({
  imports: [ EditorComponent ],
  exports: [ EditorComponent ],
  providers: [{
    provide: TINYMCE_SCRIPT_SRC, useValue: tinyMCEPath
  }]
})
export class EditorModule {}
