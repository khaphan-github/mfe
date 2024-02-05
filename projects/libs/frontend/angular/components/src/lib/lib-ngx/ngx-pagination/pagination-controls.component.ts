import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core'
import { uniqueId } from 'lodash';
import { PaginationParams } from './pagination-instance';

function coerceToBoolean(input: string | boolean): boolean {
  return !!input && input !== 'false';
}

/**
 * The default pagination controls component. Actually just a default implementation of a custom template.
 */
@Component({
  selector: 'pagination-controls',
  templateUrl: './pagination-controls.html',
  styleUrls: ['./pagination-controls.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PaginationControlsComponent {
  @Input('config') pageInstance: PaginationParams = {
    currentPage: 0,
    itemsPerPage: 0,
    totalItems: 0,
  }
  @Input('id') id: string = uniqueId();
  @Input() maxSize: number = 7;
  @Input()
  get directionLinks(): boolean {
    return this._directionLinks;
  }
  set directionLinks(value: boolean) {
    this._directionLinks = coerceToBoolean(value);
  }
  @Input()
  get autoHide(): boolean {
    return this._autoHide;
  }
  set autoHide(value: boolean) {
    this._autoHide = coerceToBoolean(value);
  }
  @Input()
  get responsive(): boolean {
    return this._responsive;
  }
  set responsive(value: boolean) {
    this._responsive = coerceToBoolean(value);
  }
  @Input() previousLabel: string = 'Previous';
  @Input() nextLabel: string = 'Next';
  @Input() screenReaderPaginationLabel: string = 'Pagination';
  @Input() screenReaderPageLabel: string = '';
  @Input() screenReaderCurrentLabel: string = ``;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageBoundsCorrection: EventEmitter<number> = new EventEmitter<number>();

  private _directionLinks: boolean = true;
  private _autoHide: boolean = false;
  private _responsive: boolean = false;

  trackByIndex(index: number) {
    return index;
  }

  onPageChanged = (event: any) => {
    this.pageChange.emit(event);
    this.pageInstance.currentPage = event;
  }
}
 