import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { uniqueId } from 'lodash';

@Component({
  standalone: true,
  selector: 'angular-ui-search-bar-component',
  template: `
    <div class="input-group">
      <input
        (change)="onSearchChanged($event)"
        placeholder="{{ placeholder }}"
        value="{{ data }}"
        aria-label="Tìm kiếm"
        aria-describedby="search_bar_unique_id"
        type="text"
        class="form-control input-search"
      />
      <div class="input-group-append">
        <button
          (click)="onClickSearch()"
          class="btn btn-primary waves-effect waves-themed"
          type="button"
        >
          <i class="fal fa-search"></i>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .form-group {
        position: relative;
        .icon-search {
          position: absolute;
          display: flex;
          align-items: center;
          height: 100%;
          left: 1em;
        }
        .input-search {
          padding-left: 3em;
        }
      }
    `,
  ],
})
export class AngularUISearchBarComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() data: string = '';
  @Output() searchChanged = new EventEmitter<string>();

  uniqueId: string = '';
  value: string = '';

  ngOnInit(): void {
    this.uniqueId = 'search_bar_' + uniqueId();
    this.value = this.data;
  }

  onSearchChanged(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = (event.target as HTMLInputElement).value;
    this.searchChanged.emit(inputValue);
  }

  onClickSearch() {
    this.searchChanged.emit(this.value);
  }
}
