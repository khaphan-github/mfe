### Cách dùng


###### Có các properties( @Input ) như sau:
- **title**: Tiêu đề chú ý.
    > Nếu không truyền vào gì hết thì "undefined".
- **content**: Nội dung muốn hiển thị.
    > Nếu không truyền vào gì hết thì "undefined".
- **position**:  "top" | "bottom" | "left" | "right".
    > **Mặc định** nếu không truyền vào là: "top".
- **trigger**:  "hover" | "click" | "focus".
    > **Mặc định** nếu không truyền vào là: "focus".
    > Có thể dùng nhiều event trigger:
    > **Example**: "focus hover". 
- **dataOffset**: 
    > Lưu ý: giá trị này là dùng dấu 'phẩy'. Không phải dấu chấm động ('.').
    > Mặc định nếu không truyền vào là offset = "0,0". (***nghĩa là:*** x = 0, y = 0).
    > **Example**: "0,0" | "0,2" | "-1,5", ... 



###### Code

```htm

--------------Typescript------------------
title = `<div class="fw-500 text-red">Chú ý:</div>`

content = 
    `
    <div>- Chọn <span class="fw-500">buổi làm việc</span>/<span class="fw-500">nghỉ mong muốn</span>.</div>
    <div>- Số buổi tối thiểu là <strong>1</strong>.</div>
    <div>- Buổi được <span class="text-yellow">tô vàng</span> là buổi nghỉ mặc định.</div>
    `
--------------HTML------------------
<button zaaPopover [title]="title" [content]="content" [trigger]="'focus event'" 
type="button" class="btn btn-primary btn-md waves-effect waves-themed">Popover</button>
```
