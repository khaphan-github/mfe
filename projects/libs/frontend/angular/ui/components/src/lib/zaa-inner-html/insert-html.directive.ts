import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[InsertHtml]',
})
export class InsertHtmlDirective {
  @Input('InsertHtml') set html(content: string) {
    this.renderer.setProperty(this.element.nativeElement, 'innerHTML', content);
  }
  constructor(
    private element: ElementRef,
    private renderer: Renderer2) {}
}
