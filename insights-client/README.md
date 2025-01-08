# Typescript Example
SafeDep API

## Usage

Add `buf` schema registry

```shell
npm config set @buf:registry https://buf.build/gen/npm/v1/
```

Install dependencies

```shell
npm install
```

Set credentials

```shell
export SAFEDEP_API_KEY=your-api-key
export SAFEDEP_TENANT_ID=your-tenant-id
```

> Register at `https://platform.safedep.io` to get your API key and tenant ID

Run the example

```shell
npx ts-node --esm index.ts
```

## Reference

- https://buf.build/safedep/api/sdks
- https://deps.dev/
- https://scorecard.dev/
