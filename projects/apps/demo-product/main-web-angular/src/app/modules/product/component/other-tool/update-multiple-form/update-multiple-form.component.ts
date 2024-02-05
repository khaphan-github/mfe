import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, concatMap, delay, from, takeUntil, } from 'rxjs';
import { DisplaySelectedItemComponent } from './display-selected-item/display-selected-item.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { UpdateResultComponent } from './update-result/update-result.component';
import { UpdateMultipeFormUtils } from './update-multiple-form.utils';
import { NgbActiveModal, ProcessBarOverlayComponent } from '@erp/angular/components';
import { ProductService } from '../../../services/product.service';
import * as _ from 'lodash';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    UpdateFormComponent,
    UpdateResultComponent,
    DisplaySelectedItemComponent,
    ProcessBarOverlayComponent,
  ],
  selector: 'app-update-multiple-form',
  templateUrl: './update-multiple-form.component.html',
  styleUrls: ['./update-multiple-form.component.css']
})
export class UpdateMultipleFormComponent implements OnInit, OnDestroy {
  service = inject(ProductService);
  activeModal = inject(NgbActiveModal);

  destroy$$ = new Subject<void>();

  public successItems: any[] = [];
  public selectedItems: Array<any> = [];
  public errorItems: any[] = [];

  formUpdateResult: Array<any> = [];

  waitingToExecute: boolean = false;
  progressValue: number = 0;
  currentStep = 0;

  disableNextButton: boolean = true;

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  ngOnInit() {
    this.service.selectedItemState.getState()
      .pipe(takeUntil(this.destroy$$))
      .subscribe({
        next: (value) => {
          this.selectedItems = value?.items ?? [];
          this.formUpdateResult = [...this.selectedItems];
        },
      })
  }

  onGoBack() {
    if (this.currentStep === 2) {
      this.service.ReloadDataAndBackToViewManageProductLists();
      this.activeModal.dismiss();
      return;
    };

    this.currentStep -= 1;
    if (this.currentStep == -1) {
      this.service.ReloadDataAndBackToViewManageProductLists();
      this.activeModal.dismiss();
    }
  }

  onSubmit() {
    this.waitingToExecute = true;
    const arrayManyItems = _.chunk(
      UpdateMultipeFormUtils.mapFormToItems(this.selectedItems, this.formUpdateResult),
      3);
    from(arrayManyItems).pipe(
      concatMap(items => this.service.updateProducts(items).pipe(delay(0))),
    ).subscribe({
      next: (response: any) => {
        // Push item when errrr depend on API error format
        if (response.error) {
          const errorIds = response?.errorItems ?? [];
          const errorItems = this.selectedItems
            .filter(value => errorIds.includes(value.id))
            .map(value => ({
              id: value.id,
              name_default: value.name_default,
              errorMessage: response.message,
            }));

          this.errorItems.push(...errorItems);
        }

        this.successItems.push(...response.items);

        if (this.successItems.length + this.errorItems.length == this.selectedItems.length) {
          if (this.successItems.length > 0) {
            this.service.SetProductIsChanged(true);
          }

          // Thời gian để chuyển động load lên 100%
          setTimeout(() => {
            this.currentStep = 2;
            this.waitingToExecute = false;
          }, 800);
        }
      },
    });
  }
}
