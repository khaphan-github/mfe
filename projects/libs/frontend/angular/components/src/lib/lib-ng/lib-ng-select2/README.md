# CÁCH SỮ DỤNG THƯ VIỆN LIB-NG-SELECT2

## Import - Default usage:

```typescript
// Import to your module NgSelect2Module
NgModule({
  declarations: [],
  imports: [NgSelect2Module],
});
export class YourModule {}
```

```typescript
// Import to your module NgSelect2Module
@Component({ ... })
export class YourComponent implements OnInit {
  constructor(
    private readonly service: MockService,
  ) { }

  public localSelect2Data!: Select2Option[];
  public localSelectedItem: string = '';

  ngOnInit() {
    const localData = await lastValueFrom(this.service.getLocalData());
    this.localSelect2Data = this.formatLocalData(localData)
  }

  formatLocalData = (data: any[]): Select2Option[] => {
    return _.map(data, (value) => {
      const item: Select2Option = {
        label: value.full_name,
        id: value.id.toString(),
        value: value.name,
      }
      return item
    })
  }

  onSelectWithLocalData(event: any) {
    const { value, options } = event;
    this.localSelectedItem = value;
  };
}
```

```typescript
// Import to your module NgSelect2Module
NgModule({
  declarations: [],
  imports: [NgSelect2Module],
});
export class YourModule {}
```

## Sử dụng với dữ liệu đã được nạp sẳn:

```typescript

```

## Sử dụng với dữ liệu nạp từ api:

```typescript

```

## Các option là template:

```typescript

```

## Muiti language:

```typescript

```

## Xem thêm các tính năng khác:

- NPM: https://www.npmjs.com/package/ng-select2-component
- DEMO: https://harvest-dev.github.io/ng-select2/dist/ng-select2/
- GENERATE CODE: https://harvest-dev.github.io/ng-select2/dist/ng-select2/generator

# CÁCH BẢO TRÌ CODE:
