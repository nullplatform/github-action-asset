<h2 align="center">
    <a href="https://nullplatform.com" target="blank_">
        <img height="100" alt="nullplatform" src="https://nullplatform.com/favicon/android-chrome-192x192.png" />
    </a>
    <br>
    <br>
    Nullplatform Asset GitHub Action
    <br>
</h2>

## Overview

The "Nullplatform Asset" GitHub Action enables asset management on nullplatform within your GitHub Actions workflows. You can create and manage various asset types, such as Docker images, Lambdas, and more, effortlessly.

## Table of Contents

- [Inputs](#inputs)
- [Outputs](#outputs)
- [Usage](#usage)
- [License](#license)

## Inputs

### `action`

- **Description**: The asset action controls what happens to the asset. Can be one of: `create`, `update`. Default `create`
- **Required**: No

### `build-id`

- **Description**: The build ID where this asset belongs to.
- **Required**: Yes

### `type`

- **Description**: Asset type, e.g., `docker-image`, `lambda`, etc.
- **Required**: Yes

### `name`

- **Description**: Asset name. By default, it's set to `main`.
- **Required**: No

### `metadata`

- **Description**: Asset metadata, in the format `<key>:<value>`.
- **Required**: No

### `url`

- **Description**: Predefined asset URL. Advanced usage, not recommended. Use `type` and `name` instead.
- **Required**: No

## Outputs

### `id`

- **Description**: The asset ID.

### `build-id`

- **Description**: The build ID associated with the asset.

### `name`

- **Description**: The asset name, identifying the asset.

### `type`

- **Description**: The asset type, e.g., `docker-image`, `lambda`, etc.

### `targets`

- **Description**: The asset targets, an array containing URLs by provider where the asset must be uploaded.

### `metadata`

- **Description**: The asset-associated metadata, presented as a key-value object.

## Usage

```yaml
name: Create Nullplatform Asset

on:
  push:
    branches:
      - main

jobs:
  create_asset:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Login to Nullplatform
        id: login
        uses: nullplatform/nullplatform-login-action@v1
        with:
          api-key: ${{ secrets.NULLPLATFORM_API_KEY }}

      - name: Create Nullplatform Build
        id: create-build
        uses: nullplatform/nullplatform-build-action@v1
        with:
          action: create
          application-id: your-app-id

      - name: Create Nullplatform Asset
        id: create-asset
        uses: nullplatform/nullplatform-asset-action@v1
        with:
          action: create
          build-id: ${{ steps.create-build.outputs.id }}
          type: docker-image
          name: my-docker-image

      - name: Display Asset ID
        run: echo "Asset ID: ${{ steps.create-asset.outputs.id }}"
```

In this example, the GitHub Action creates a new asset with the name "my-docker-image".

## License

This GitHub Action is licensed under the [MIT License](LICENSE).
