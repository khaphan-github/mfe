import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinyMCEComponent } from './tinyMCE/tinyMCE.component';
import { FormsModule } from '@angular/forms';
import {EditorModule as TinyMCEModule} from "./tinyMCE-lib/editor/editor.module"
@NgModule({
  imports: [CommonModule, FormsModule, TinyMCEModule],
  declarations: [TinyMCEComponent],
  exports: [TinyMCEComponent],
})
export class EditorModule {}
