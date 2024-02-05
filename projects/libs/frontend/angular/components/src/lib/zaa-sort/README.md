# How to use this component:

## 1. Import ZaaSortComponent to your component:

```typescript
/ ... /;
import { SortOptions, ZaaSortComponent } from "@shared/components/zaa-sort/zaa-sort.component";
/ ... /;

@Component({
  standalone: true,
  imports: [
    // ... ///
    ZaaSortComponent, // <-- Import this component
  ],
  // ... ///
})
export class YourComponent {}
```

## 2. Declate variable to config this component:

Attribute: `options` is an array of SortOptions contain:
- id: string; // unique id you declared.
- displayText: string; // Text to display or key of language
- icon?: string; // class of this icon ex: 'fal fa-icon ...'
- metadata?: any; // You can input additional data if necessarry

Now update some things in your component

```typescript
@Component({
  // ... //
})
export class YourComponent implements OnInit {
  // 1 Config search options follow this syntax
  sortOptions: Array<SortOptions> = [
    {
      id: "alphaDown",
      displayText: "Tên từ A đến Z",
      icon: "fal fa-sort-alpha-down",
    },
    {
      id: "alphaUp",
      displayText: "Tên từ Z đến A",
      icon: "fal fa-sort-alpha-up",
    },
    // Example for enable lanuage
    {
      id: "alphaUp",
      displayText: "path.to.your.translate.key",
      icon: "fal fa-sort-alpha-up",
      metadata: {
        key: "name",
        value: "desc"
      }
    },
  ];

  // 2. Declare variable to store current sort options
  currentSortId: string = "";

  ngOnInit() {
    // const sortBy = Get sortby data from state function
    this.currentSortId = sortBy?.id ?? "";
  }

  // 3. Declare on user change selection function
  onSortChange($event: SortOptions) {
    console.log($event);
  }
}
```

Now update your html template:

```html
<div>
  <mat-paginator //... /// > </mat-paginator>

  <!-- Sort component -->
  <app-zaa-sort [options]="sortOptions" 
                [currentOptionsId]="currentSortId" 
                (choose)="this.onSortChange($event)" 
                [allowMany]="false"> </app-zaa-sort>
  <!-- Sort component -->
</div>
```
