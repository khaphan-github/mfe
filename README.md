# Steps:

Tạo mới ứng dụng bằng cách nhập lệnh bên dưới với ứng dụng angular: `demo-product` Là thư mục chứa cả web và api nằm trong `apps`;

```bash
npx nx g @nx/angular:application main-web-angular --directory=./projects/apps/demo-product --style=scss --bundler=webpack --standalone=true --ssr=false --projectNameAndRootFormat=derived
```

Sau khi tạo ứng dụng thành công - run script này để định nghĩa project của bạn là một microFE.
**Lưu ý**: Port phải không trùng đối với các project khác nhau.

```bash
npm install @angular-architects/module-federation && npx nx g @angular-architects/module-federation:ng-add --project=projects-apps-demo-product-main-web-angular --type=remote --port=4201  --directory=./projects/apps/demo-product/main-web-angular
```

Sau đó strong file `project.json` chỉnh `executor` field thành `@nx/angular:dev-server`:

```json
{
  "targets": {
  ...
    "serve": {
      // "executor": "@nx/angular:webpack-dev-server",
      "executor": "@nx/angular:dev-server", // Thay thành cái này
    }
  }
}
```

Thêm cấu hình host của remoteEntry tương ưng vào env config:

```typescript
export const environment = {
  microFeRemoteEntry: {
    demoProduct: 'http://localhost:4201',
    noiQuyLaoDong: 'http://localhost:4201',
    khenThuongKyLuat: 'http://localhost:4202',
    // OTher remote entry
  },
};
```

Đối với host MFE thì chỉ cần thay `--type=host`:

```bash
npm install @angular-architects/module-federation && npx nx g @angular-architects/module-federation:ng-add --project=projects-micro-fe--hutech-app-shell --type=host  --port=4200
```

Thêm share asset file

```json
"assets": [
  "projects/apps/demo-product/main-web-angular/src/favicon.ico",
  "projects/apps/demo-product/main-web-angular/src/assets",
  {
    "glob": "**/*",
    "input": "projects/libs/frontend/angular/assets/",
    "output": "./assets"
  }
],  
```

# Erp

Remove apps bằng cách:

```bash
// project.json
{
  "name": "projects-apps-demo-product-main-web-angular",
  /** ... /
}
npx nx g @nx/angular:remove projects-apps-demo-product-main-web-angular-e2e
npx nx g @nx/angular:remove projects-apps-demo-product-main-web-angular
```

Tạo thư viện trong NX:

```bash
npx nx g @nx/angular:library components --tags=ui --directory=./projects/libs/frontend/angular --projectNameAndRootFormat=derived
```
