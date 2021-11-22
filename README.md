# Chatminal Web

[![Deployment](https://github.com/AmirSavand/chatminal-client-web/actions/workflows/deployment.yml/badge.svg?branch=production)](https://github.com/AmirSavand/chatminal-client-web/actions/workflows/deployment.yml)
[![Build](https://github.com/AmirSavand/chatminal-client-web/actions/workflows/build.yml/badge.svg)](https://github.com/AmirSavand/chatminal-client-web/actions/workflows/build.yml)
[![Code Quality](https://github.com/AmirSavand/chatminal-client-web/actions/workflows/code-quality.yml/badge.svg)](https://github.com/AmirSavand/chatminal-client-web/actions/workflows/code-quality.yml)
[![Unit Test](https://github.com/AmirSavand/chatminal-client-web/actions/workflows/unit-test.yml/badge.svg)](https://github.com/AmirSavand/chatminal-client-web/actions/workflows/unit-test.yml)

Main web app for the Chatminal.

## Technology

- NodeJS
- Angular
- Bootstrap
- NGX Bootstrap
- Font Awesome

## Development

Project is built with Angular.

### Installation

Install NPM packages (dependencies).

```bash
> npm install
```

### Serve

Project will be served on `http://localhost:4200`.

```bash
> npm run serve
> npm run serve-staging
> npm run serve-production
```

### Build

Project will be built in `dist/chatminal/`.

```bash
> npm run build
> npm run build-staging
> npm run build-production
```

### Code Quality

We are using ESLint for linting/code quality.

```bash
> npm run lint
```

### Unit Tests

We are using protractor, karma, and jasmine for unit tests.

```bash
> npm run test
```
