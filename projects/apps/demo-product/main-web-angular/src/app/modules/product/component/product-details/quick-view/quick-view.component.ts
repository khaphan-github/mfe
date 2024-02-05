import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@erp/angular/components';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.css']
})
export class QuickViewComponent implements OnInit {

  @Input() productInput: any;
  constructor(
    public readonly activeModal: NgbActiveModal
  ) { }

  ngOnInit() {}

  clickFullScreen = () => {
    this.activeModal.update({
      fullscreen: 'xxl'
    })
  }

  closeModal() {
    this.activeModal.dismiss('Cross click')
  }
}
