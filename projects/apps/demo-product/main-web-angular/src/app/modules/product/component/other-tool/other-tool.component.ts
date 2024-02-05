import { OverlayModule } from '@angular/cdk/overlay';
import { Component, OnInit, inject } from '@angular/core';
import { DeleteBySelectedComponent } from './delete-by-selected/delete-by-selected.component';
import { MatMenuModule } from '@angular/material/menu';
import { UpdateMultipleFormComponent } from './update-multiple-form/update-multiple-form.component';
import { NgbModal, ToastrService } from '@erp/angular/components';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: true,
  imports: [
    OverlayModule,
    MatMenuModule,
    DeleteBySelectedComponent,
    UpdateMultipleFormComponent,
  ],
  providers: [],
  selector: 'app-product-other-tool',
  templateUrl: './other-tool.component.html',
  styleUrls: ['./other-tool.component.css']
})
export class OtherToolComponent implements OnInit {
  isOpen = false;
  toast = inject(ToastrService);
  constructor(
    private readonly modalService: NgbModal,
    private readonly service: ProductService,
  ) { }

  public readonly ACTIONS = {
    DELETE: 'delete',
    UPDATE_MANY_FORM: 'updateMany',
    EXPORT_EXCEL: 'exportExcel',
  }

  ngOnInit() { }

  onAction(action: string) {
    const haveDataToHandle = this.service.selectedItemState.getCurrentValue();
    if (!haveDataToHandle?.items || haveDataToHandle.items.length === 0) {
      this.toast.show('warning', 'Dữ liệu cần thao tác đang trống');
      return;
    }

    switch (action) {
      case this.ACTIONS.DELETE:
        this.deleteBySelected();
        break;
      case this.ACTIONS.UPDATE_MANY_FORM:
        this.updateMany();
        break;
    }
  }


  deleteBySelected() {
    this.modalService.open(DeleteBySelectedComponent, {
      size: "lg",
      backdrop: 'static',
      keyboard: true
    });
  }


  updateMany() {
    this.modalService.open(UpdateMultipleFormComponent, {
      size: "lg",
      backdrop: 'static',
      keyboard: true
    });
  }

  exportExcel() {

  }
}


