## ENVIRONMENT:

### Mục đích:

1. Định nghĩa các biến, giá trị (domain, development mode, developer account,... ) ứng với từng môi trường khác nhau (dev, test, production,..)
2. Không cần thay đỗi các giá trị này khi thay đỗi mỗi trường từ môi trường development sang môi trường test, sang môi trường production.

### Lưu ý:

1. Tất cả biến môi trường dùng trong source code phần phải import từ:

```
src/app/config/environments/environment.ts
```

Nội dung file:

```
export const environment = {
  production: false,
  apiKey: '',
  domain: {
    apiAuth: 'https://api.hutech.edu.vn',
    apiCatalog: 'http://localhost:5000'
  },
  developer: {
    username: "",
    password: ""
  }
};

```

2. Các file **environment.dev**, **environment.prod**, **environment.test** đều có các key giống với file **environment** value có thể khác tùy môi trường
3. Vì khi start project tại môi trường bất kỳ thì file environment sẽ tự động thay thế để phù hợp với môi trường.
4. Cấu hình môi trường tại file "angular.json":

```
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "cache": {
      "enabled": false
    },
    "analytics": false
  },
  "newProjectRoot": "projects",
  "projects": {
    "hutech-erp-system": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "configurations": {   
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/app/config/environments/environment.ts",      // <===== Cấu hình thay thế môi trường tại đoạn này
                  "with": "src/app/config/environments/environment.prod.ts"     // <===== Cấu hình thay thế môi trường tại đoạn này
                }
              ],
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "fileReplacements": [
                {
                  "replace": "src/app/config/environments/environment.ts",   // <===== Cấu hình thay thế môi trường tại đoạn này
                  "with": "src/app/config/environments/environment.dev.ts"   // <===== Cấu hình thay thế môi trường tại đoạn này
                }
              ],
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
           "testing": {
              "fileReplacements": [
                {
                  "replace": "src/app/config/environments/environment.ts",
                  "with": "src/app/config/environments/environment.test.ts"
                }
              ],
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          // Muốn thêm bao nhiêu môi trường thì tùy yêu cầu nhé
          "defaultConfiguration": "development"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "hutech-erp-system:build:production"    <=== Lưu ý cấu hình browserTarget để start được project nhé
            },
            "development": {
              "browserTarget": "hutech-erp-system:build:development"   <=== Lưu ý cấu hình browserTarget để start được project nhé
            },
            "testing": {
              "browserTarget": "hutech-erp-system:build:testing"  <=== Lưu ý cấu hình browserTarget để start được project nhé
            }
          },
          "defaultConfiguration": "development"
        },
      }
    }
  }
}

```

5. Trong file package.json cần cấu hình script chạy project cho phù hợp:

```
 "scripts": {
    "ng": "ng",
    "start": "ng serve --configuration=development",    <== Cài config chổ này - start môi tường dev
    "start:prod": "ng serve --configuration=production",   <== Cài config chổ này - start môi trường prod
    "start:test": "ng serve --configuration=testing",  <== Cài config chổ này -- start môi trường test
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "server": "json-server --watch src/server/db.json --port 5000 --routes src/server/routes.json"
  },
```

Tài liệu tham khảo: https://www.digitalocean.com/community/tutorials/angular-environment-variables
