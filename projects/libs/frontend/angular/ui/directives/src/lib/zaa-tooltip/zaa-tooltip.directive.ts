import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

declare var $: any;
/**
 * @author Cường
 * 24/11/2023
 * Update: 22:59 PM - 08/01/2024
 */
@Directive({
  selector: '[zaaTooltip]'
})
export class ZaaTooltipDirective implements OnInit, AfterViewInit {

  @Input({ alias: 'title', required: true }) title: string = 'undefined';
  @Input('position') position: "top" | "bottom" | "left" | "right" = 'top';
  @Input('background') classBackgroundColor: string = "bg-fusion-500"; // Ex: "bg-primary-500" | "bg-info-500", ...
  @Input('trigger') trigger: string = "hover"; // "hover" | "click" | "focus"
  @Input('dataOffset') dataOffset: string = "0,0"; // Ex: "0,0" | "0,2" | "0,5", ...

  constructor(private readonly el: ElementRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const nativeElement = this.el.nativeElement;

    if (!nativeElement) return;

    // nếu element này có class này thì Xóa và Add lại. Nếu đã có thì sẽ bị conflict;
    // nativeElement.classList.remove("has-tooltip");
    // nativeElement.classList.add("has-tooltip");

    nativeElement.setAttribute("data-toggle", "tooltip");
    nativeElement.setAttribute("data-html", true);

    nativeElement.setAttribute("title", this.title);
    nativeElement.setAttribute("data-placement", this.position);
    nativeElement.setAttribute("data-offset", this.dataOffset);
    nativeElement.setAttribute("data-trigger", this.trigger);
    nativeElement.setAttribute("data-template",
      `
      <div class="tooltip" role="tooltip">
        <div class="tooltip-inner ${this.classBackgroundColor}"></div>
        <div class="arrow"></div>
      </div>
      `
    );

    // Kích hoạt js
    $(nativeElement).tooltip();

    // Format: '{ "show": 1000, "hide": 1000 }'
    // nativeElement.setAttribute("data-delay", {...}),
  }

}
