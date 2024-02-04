### Cách dùng


###### Có các properties( @Input ) như sau:
- **title**: Nội dung muốn hiển thị.
    > Nếu không truyền vào gì hết thì "undefined".
- **position**:  "top" | "bottom" | "left" | "right".
    > Mặc định nếu không truyền vào là: "top".
- **trigger**:  "hover" | "click" | "focus".
    > **Mặc định** nếu không truyền vào là: "hover".
    > Có thể dùng nhiều event trigger:
    > **Example**: "focus hover". 
- **background**: class màu nền của tooltips. Tham khảo các class trên [Link](https://www.gotbootstrap.com/themes/smartadmin/4.5.1/utilities_color_pallet.html) này.
    > Lưu ý: Chỉ được dùng các prefix có "bg-". Mặc định nếu không truyền vào là "bg-fusion-500".
    > **Example**: "bg-primary-500".
- **dataOffset**: 
    > Lưu ý: giá trị này là dùng dấu 'phẩy'. Không phải dấu chấm động ('.').
    > Mặc định nếu không truyền vào là offset = "0,0". (***nghĩa là:*** x = 0, y = 0).
    > **Example**: "0,0" | "0,2" | "-1,5", ... 


**Code**:
```htm
<button zaaTooltip [title]="'Đây là nội dung tooltips'" [position]="'top'" [background]="'bg-primary-500'" [dataOffset]="'0'" type="button" class="btn btn-primary waves-effect waves-themed">Tooltip</button>
```
