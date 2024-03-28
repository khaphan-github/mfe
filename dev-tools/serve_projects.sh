#!/bin/bash

# Serve first project
npx nx serve projects-mfes--hutech-app-shell --configuration=development &

npx nx serve projects-apps-demo-product-main-web-angular --configuration=development
