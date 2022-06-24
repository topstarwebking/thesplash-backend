# Freshcart Monorepo Backend Service

[![GKE Build/Deploy](https://github.com/freshcart/monorepo-backend/actions/workflows/gcloud-deploy.yml/badge.svg)](https://github.com/freshcart/monorepo-backend/actions/workflows/gcloud-deploy.yml)

#### Some Important Commands for local development

```
- gcloud builds submit --tag us-central1-docker.pkg.dev/monorepo-backend/monorepo-backend-repo/imagev1.0.0-gke .
- brew services start mongodb-community
- brew services stop mongodb-community
- npm start
```

#### Some Useful Links for local development

- https://www.epochconverter.com/
- https://jwt.io/
- http://localhost:5850/

#### Docs

- [Postman Collection](https://documenter.getpostman.com/view/641508/UzBmLSXi#intro)
- [basket.md](docs/basket.md)