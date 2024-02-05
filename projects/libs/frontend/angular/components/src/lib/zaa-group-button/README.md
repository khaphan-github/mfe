# Hi! How to use group-button component:

## 1. Import ZaaGroupButtonComponent to your component:

```typescript
import { IGroupButton, ZaaGroupButtonComponent } from "@shared/components/zaa-group-button/zaa-group-button.component";

@Component({
  standalone: true,
  imports: [
    ZaaGroupButtonComponent, // Import this component
  ],
  ...
})
export class YourComponent {

}
```

## 2. Declate variable to config this component:

### Attribute: `options` is an array of IGroupButton contain:

- id: string; // unique id you declared.
- displayText: string; // Text to display or key of language
- icon?: string; // class of this icon ex: 'fal fa-icon ...'
- metadata?: any; // You can input additional data if necessarry

### Input options:
- `options`: Array of oftion type IGroupButton
- `buttonClass`: You can input css class to change style button classs
- `enableLanguage`: If true display you need change display text to path of your language (i18n)
- `allowMany`: Allow choose many options
- `currentSelected`: Input defaultValue 
- `label`: You can put your display text
- `choose`: Event when use choose options

Now update some things in your component

```html
<!-- Other html -->
<app-zaa-group-button [options]="options"
                      [currentSelected]="this.currentSelectedOptions"
                      [buttonClass]="'btn btn-default waves-effect waves-themed'"
                      [allowMany]="false"
                      [enableLanguage]="false"
                      [label]="'Label'"
                      (choose)="this.onSatusChange($event)">
</app-zaa-group-button>
<!-- Other html -->

```
```typescript
@Component({
  standalone: true,
  imports: [
    ZaaGroupButtonComponent, // Import this component
  ],
  ...
})
export class YourComponent {
  // Optional if u need default value
  DEFAULT_STATUS = {
    id: '0',
    displayText: 'Tất cả',
    icon: 'fal fa-box-full',
  };

  options: Array<IGroupButton> = [
    DEFAULT_STATUS,
    {
      id: "1",
      displayText: "Active",
      icon: "fal fa-active",
    },
  ]

// Variable to save current Input
  currentSelectedOptions: Array<IGroupButton> = [];

// On Change
  onSatusChange($event: Array<IGroupButton>) {
    this.currentSelectedOptions = $event;
  }
}
```
