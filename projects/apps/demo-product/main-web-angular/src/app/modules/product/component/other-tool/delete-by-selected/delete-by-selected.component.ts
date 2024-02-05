import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, finalize, from, concatMap, tap, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { NgbActiveModal } from '@erp/angular/components';
import * as _ from 'lodash';
import { Product } from '../../../repository/product.model';

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'app-delete-by-selected',
  templateUrl: './delete-by-selected.component.html',
  styleUrls: [
    './delete-by-selected.component.css',
    '../../shared/styles/overlay-loading-processbar.scss'
  ]
})
export class DeleteBySelectedComponent implements OnInit, OnDestroy {
  destroy$$ = new Subject<void>();

  constructor(
    private readonly productService: ProductService,
    public readonly activeModal: NgbActiveModal,
  ) { }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  // Component variable
  public selectedItems: Array<Product> = [];
  public successItems: any[] = [];
  public errorItems: any[] = [];
  public progressValue: number = 0;
  public numberOfSuccessItem: number = 0;

  // UI variable
  public showProcessBar: boolean = false;
  public showViewReportTemplate: boolean = false;
  public showViewSelectedItems: boolean = true;
  public waitingToExecute: boolean = false;

  public readonly DEFAULT_VISIBLE_ELEMENT_COUNT = 2;
  public errorItemsVisibleCount = this.DEFAULT_VISIBLE_ELEMENT_COUNT;
  public selectedItemVisibleCount = this.DEFAULT_VISIBLE_ELEMENT_COUNT;


  ngOnInit() {
    this.productService.selectedItemState.getState()
      .pipe(takeUntil(this.destroy$$))
      .subscribe({
        next: (value) => {
          this.selectedItems = value?.items ?? [];
          console.log(value);
        },
      })
  }

  onClose() {
    this.productService.ReloadDataAndBackToViewManageProductLists();
    this.activeModal.dismiss();
  }

  showMoreError() {
    this.errorItemsVisibleCount += this.DEFAULT_VISIBLE_ELEMENT_COUNT;
  }

  showMoreSelected() {
    this.selectedItemVisibleCount += this.DEFAULT_VISIBLE_ELEMENT_COUNT;
  }


  async onConfirmDelete() {
    const DELAY_TIME_TO_DISPLAY_PROCESS_BAR = 500;//MS <-- Delay time to display process bar

    this.waitingToExecute = true;
    this.showProcessBar = true;

    const CHUNK_SIZE = 3; // mean: Each array have CHUNK_SIZE items
    const arrayManyItems = _.chunk(this.selectedItems, CHUNK_SIZE);

    from(arrayManyItems).pipe(
      concatMap(items =>
        this.productService.DeleteProductById(items.map((value) => value.id))
      ),
      tap((response: any) => {
        this.progressValue += response.totalItems;
      }),
      delay(DELAY_TIME_TO_DISPLAY_PROCESS_BAR),
      finalize(() => {
        // Update process bar - then show report view
        this.showViewSelectedItems = false;
        this.showViewReportTemplate = true;
        this.waitingToExecute = false;
      }),
    ).subscribe({
      next: (response: any) => {
        let numberOfError = 0;
        // Case error
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
          numberOfError = errorIds.length;
        }

        this.numberOfSuccessItem += response.totalItems - numberOfError;

        if (this.numberOfSuccessItem > 0) {
          this.productService.SetProductIsChanged(true);
        }
      },
    });
  }
}
