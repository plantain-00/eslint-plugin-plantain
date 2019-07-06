# eslint-plugin-plantain

A set of unofficial typescript-eslint rules.

[![Dependency Status](https://david-dm.org/plantain-00/eslint-plugin-plantain.svg)](https://david-dm.org/plantain-00/eslint-plugin-plantain)
[![devDependency Status](https://david-dm.org/plantain-00/eslint-plugin-plantain/dev-status.svg)](https://david-dm.org/plantain-00/eslint-plugin-plantain#info=devDependencies)
[![Build Status: Linux](https://travis-ci.org/plantain-00/eslint-plugin-plantain.svg?branch=master)](https://travis-ci.org/plantain-00/eslint-plugin-plantain)
[![Build Status: Windows](https://ci.appveyor.com/api/projects/status/github/plantain-00/eslint-plugin-plantain?branch=master&svg=true)](https://ci.appveyor.com/project/plantain-00/eslint-plugin-plantain/branch/master)
[![npm version](https://badge.fury.io/js/eslint-plugin-plantain.svg)](https://badge.fury.io/js/eslint-plugin-plantain)
[![Downloads](https://img.shields.io/npm/dm/eslint-plugin-plantain.svg)](https://www.npmjs.com/package/eslint-plugin-plantain)
[![gzip size](https://img.badgesize.io/https://unpkg.com/eslint-plugin-plantain?compression=gzip)](https://unpkg.com/eslint-plugin-plantain)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fplantain-00%2Feslint-plugin-plantain%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/eslint-plugin-plantain)

## install

`yarn add eslint-plugin-plantain`

## usage

```js
{
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": [
    "plantain"
  ],
  "rules": {
    "plantain/promise-not-await": "error"
  }
}
```
