import { Component } from '@angular/core';
import { FilterModalService } from './filter-modal/filter-modal.service';
import { CommonModule } from '@angular/common';
import { FiltersModalComponent } from './filter-modal/filter-modal.component';
import { ItemsStickyComponent } from './items-sticky/items-sticky.component';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FiltersModalComponent,
    ItemsStickyComponent,
  ],
  selector: 'app-product-list-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class ProductListFilterComponent {
  searchString: string = '';
  constructor(private readonly filterModalService: FilterModalService) { };

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.searchString = this.filterModalService.getFilterModalSharedState().getCurrentValue()?.searchString ?? '';
  }
  onClickSearch() {
    this.filterModalService.applySearch(this.searchString);
  }
}
