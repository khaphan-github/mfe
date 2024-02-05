import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as _ from 'lodash';

declare const $: any, initApp: any, bootbox: any;

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-bootbox',
  templateUrl: './bootbox.component.html',
  styleUrls: ['./bootbox.component.css']
})
export class BootBoxComponent {
  @Input() nameButton: string = "";
  @Input() title: string = "<i class='fal fa-times-circle text-danger mr-2'></i> Do you wish to delete this table?";
  @Input() message: string = "<span><strong>Warning:</strong> This action cannot be undone!</span>";
  @Input() classButton: string = "btn btn-outline-primary";
  @Input() centerVertical = true;
  @Input() swapButtonOrder = true;
  @Input() dataSelected: any;
  @Input() disabled: boolean = false;

  /**
   * @description Khai báo thuộc tính selector để truy cập phần tử dom
   */
  @ViewChild('selector') selector: ElementRef | undefined;

  /**
   * @description emitter khi mà giá trị thay đổi
   */
  @Output() valueChanged = new EventEmitter();

  /**
   * @description Phần tử dom của select2 single
   */
  private element: any = undefined;

  ngAfterViewInit(): void {
    // Lấy dom select2 single
    this.element = !_.isNil(this.selector) ? $(this.selector.nativeElement) : null;
  }

  onClick() {
    initApp.playSound('assets/media/sound', 'bigbox')
    bootbox.confirm(
      {
        title: this.title,
        message: this.message,
        centerVertical: this.centerVertical,
        swapButtonOrder: this.swapButtonOrder,
        buttons:
        {
          confirm:
          {
            label: 'Yes',
            className: 'btn-danger shadow-0'
          },
          cancel:
          {
            label: 'No',
            className: 'btn-default'
          }
        },
        className: "modal-alert",
        closeButton: false,
        callback: (result: any) => {
          if (result == true) {
            this.valueChanged.emit(this.dataSelected);
          }
        }
      });
  }
}
