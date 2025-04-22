# 🛗 Are The Elevators Broken?

This repository holds both the Terraform infrastructure code as well as the simple Javascript application that runs inside the AWS Lambda function.

This backend application is used to support the website [https://aretheelevatorsbroken.com](https://aretheelevatorsbroken.com) for a basic community-report system for infrastructure here in Portland, OR.

## Getting Started

This repository leverages [VSCode's devcontainer](https://code.visualstudio.com/docs/remote/containers) feature to ensure all necessary dependencies are available inside the container for development.

### Application

The application code for this repository is contained in the [`./app`](./app) directory.

To get started:

```bash
cd app/ && npm install
```

All application deployments are managed via GitHub Actions and the [`./.github/workflows/deploy_application.yml`](./.github/workflows/deploy_application.yml) workflow.

### Infrastructure

The infrastructure code for this repository is contained in the [`./terraform`](./terraform) directory. The required Terraform version is `1.10.2`. The AWS artifacts managed in this repository are illustrated below.

To get started:

```bash
cd terraform/ && terraform init
```

All infrastructure deployments are managed via GitHub Actions and the [`./.github/workflows/deploy_infrastructure.yml`](./.github/workflows/deploy_infrastructure.yml) workflow.

![](./assets/architecture.svg)
