import { Directive, ElementRef, Input } from '@angular/core';

declare var $: any;
/**
 * @author Cường
 * 24/11/2023
 * Update: 22:59 PM - 08/01/2024
 */
@Directive({
  standalone: true,
  selector: '[zaaPopover]'
})
export class ZaaPopoverDirective {

  @Input({ alias: 'title', required: true }) title: string = 'undefined';
  @Input({ alias: 'content', required: true }) content: string = 'undefined';
  @Input('position') position: "top" | "bottom" | "left" | "right" = 'top';
  @Input('dataOffset') dataOffset: string = "0,0"; // Ex: "0,0" | "0,2" | "-1,5", ...
  @Input('trigger') trigger: string = "focus"; // "hover" | "click" | "focus"

  private isActiveJs: boolean = false;

  constructor(
    private readonly el: ElementRef
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const nativeElement = this.el.nativeElement;

    if (!nativeElement) return;

    // nếu element này có class này thì Xóa và Add lại. Nếu đã có thì sẽ bị conflict;
    // nativeElement.classList.remove("has-popover");
    // nativeElement.classList.add("has-popover");

    nativeElement.setAttribute("data-html", true);
    nativeElement.setAttribute("data-toggle", "popover");

    nativeElement.setAttribute("title", this.title);
    nativeElement.setAttribute("data-placement", this.position);
    nativeElement.setAttribute("data-offset", this.dataOffset);
    nativeElement.setAttribute("data-trigger", this.trigger);
    nativeElement.setAttribute("data-content", this.content);
    nativeElement.setAttribute("data-template",
      `
      <div class="popover" role="tooltip">
        <div class="arrow"></div>
        <h3 class="popover-header bg-transparent"></h3>
        <div class="popover-body fs-xs">
        </div>
      </div>
      `
    );

    // Kích hoạt js
    $(nativeElement).popover();
    // Format: '{ "show": 1000, "hide": 1000 }'
    // nativeElement.setAttribute("data-delay", {...}),
  }
}
