# LIB - NGX-EXTEND-PDF-VIEWER ("version": "18.1.8")


## Cài cắm một số thứ vào cấu hình project:

### Static resource:

- Đưa **ngx-pdf-viewer/assets** ra ngoài thư mục **assets** chính, để ở ngoài thư mục **assets** chính (src/assets) cũng được thôi nhưng mà nên gói gọn mấy cái liên qua với nhau thành một cục - dể kiểm soát.
- Cài trong file `angular.json` dòng khai báo để khi project build nó ánh xạ đường đến được mấy file trong **ngx-pdf-viewer/assets**

```json
{
  "projects": {
    "hutech-erp-system": {
      ...
      "architect": {
        "build": {
          "options": {
            ...
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/assets/css",
              "src/assets/js",

              +  {
              +  "glob": "**/*",
              +  "input": "src/app/share/components/lib-ngx/ngx-pdf-viewer/assets",
              +  "output": "/assets/"
              +  }
            ],
          }
        }
      }
    }
  }
}

```

### Security ("@types/trusted-types@^2.0.7):

""Trusted Types là một tính năng an ninh trong web development, có thể giúp ngăn chặn các loại tấn công chủ đạo JavaScript (XSS attacks).Trusted Types giúp đảm bảo rằng dữ liệu được chèn vào HTML Document sẽ không thực hiện các đoạn mã JavaScript độc hại."" (ChatGPT).

- Trong thư viện này nó dùng lúc tạo thẻ script để inject file javascript vô thẻ header:

```html
<head>
  ...
  <script async="" type="text/javascript" src="assets/pdf-3.10.548.js"></script>
  <script async="" type="text/javascript" src="assets/viewer-3.10.548.js"></script>
  ...
</head>
```

- npm: https://www.npmjs.com/package/@types/trusted-types.

## Change pdf viewer version:

- Vào thư mục **assets** sau đó thay thay thế file `pdf.worker-3.10.548.js` (ngx-pdf-viewer/assets) thành phiên bản mới hơn. https://cdnjs.com/libraries/pdf.js hiện (11/2023) cái mới nhất là `4.0.189` mà thay vô sợ lỗi chỉnh lâu nên chưa thay :)).

- Vào file `ngx-pdf-viewer/src/lib/options/pdf-default-options.ts` để thay đổi sersion đúng cái vừa tải

```typescript
export const pdfjsVersion = "3.10.548"; // <-- Thay cái này
export const pdfjsBleedingEdgeVersion = "3.11.440";
export function getVersionSuffix(folder: string): string {
  if (folder?.includes("bleeding-edge")) {
    return pdfjsBleedingEdgeVersion;
  }
  return pdfjsVersion;
}
```


## Change UI:
- Vào thư mục **toollbar** để chỉnh giao diện cho các nút "ngx-pdf-viewer/src/lib/toolbar". thư viện nó làm từng nút bấm là từng component luôn nên là mình thay thế giao diện rất dễ, chỉ cần vô change style class là được.

- Bạn có thể vào thư mục **theme**  để chỉnh style cho viewer trong đây sẽ chứa tất cả cái file css bạn cần.

# LINK:
- Source project: https://github.com/stephanrauh/ngx-extended-pdf-viewer
- NPM: https://www.npmjs.com/package/ngx-extended-pdf-viewer
- Link demo: https://pdfviewer.net/extended-pdf-viewer/customization
- PDF.js: https://github.com/mozilla/pdf.js
