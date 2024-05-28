# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/CleberSchiavon/energy-invoice-extractor/compare/v1.6.0...v1.1.0) (2024-05-28)


### :white_check_mark: Tests

* **api)(utils:** testing applogger ([6e51a22](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/6e51a22b0bbb7d5815bf5cf6f279f89598a74519))
* **app:** configuring jest ([0197741](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/0197741aec682dbad00616e388b4e6d9dc483202))


### :zap: Performance Improvements

* **apps)(api:** creating validateEnv config ([83b2673](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/83b26732325034af47000bb80e19fa150437cffe))


### :recycle: Code Refactoring

* **api)(ts-config:** configuring typescript alias imports ([486c167](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/486c16731d9d9299258bca3f2a0cfcda54c87b50))
* **api:** creating HttpStatusMessages Enum ([07aa35d](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/07aa35d33316356713e463cb3ee45ed2633086d5))
* **app:** adding some dependencies configs ([ad373c9](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/ad373c9f2843c455576139a47b01ee342c9d6f21))


### :bug: Bug Fixes

* **api)(invoice:** fixing isCemigInvoice logic ([c4a596c](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/c4a596c80c270bd1c891872b711feed882a93584))
* **validate-branch:** creating validate branch json ([f7b149e](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/f7b149e4a8e2ad1e00f5096612deaa17aa205770))


### :art: Styling

* **app:** running lint ([0c06c4f](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/0c06c4f4273b6520307330829368de47c6be0322))
* **web)(ui:** running lint ([dd676c1](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/dd676c1cbaa17523513571f87813416eae8a4a9e))


### :sparkles: Features

* **api)(app:** adding express status monitor ([fc5cb2f](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/fc5cb2ffac242b504adb04f5bb380af9b6358800))
* **api)(client:** creating client module ([ece9d12](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/ece9d12bd858a1fd3c682b942a94a412265759dc))
* **api)(invoice:** checking if current invoice is a cemig invoice ([0be5809](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/0be58098844af899c50a140c03e31b9daec7b3b9))
* **api)(invoice:** creating allInvoices get route ([5642215](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/56422150808e82b04e9e84ac0cb36da20554bae0))
* **api)(invoice:** creating invoice get routes ([1353d2a](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/1353d2a239399f43778e675231fee4259bb2e936))
* **api)(invoice:** creating invoice method ([4c3342d](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/4c3342dc9bfd12b086c4fb378bf5ae56331c084d))
* **api)(test:** configuring test enviroment ([8dfe947](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/8dfe947d2a24f68e156ac6e5c411b276f2367a38))
* **app)(ui:** creating stat card and applying to homepage ([6275cfd](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/6275cfdd2d60879bd815d113a413c70c38be9d9b))
* **app:** finishing app ([d682b05](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/d682b056a4d832731ecdf4ba711033cc81463a51))
* **app:** finishing initial configuration ([c597cce](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/c597cced829b305fb1ca5acbdeb5f26fa405bf0e))
* **app:** starting creating api integration ([e3344e0](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/e3344e0cc75ca913178839a58cc9c5a7da35e598))
* **database-tools)(api:** creating database tools package and putting in api ([73dd7ef](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/73dd7ef4f419b018461ed38c5c7f9b16416ca20c))
* **docs:** removing docs package ([a8512bd](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/a8512bd67fa5e4049bd3f5eb1d47e87c8c184f40))
* **invoice:** creating invoice repository logic ([a67d171](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/a67d17112512f86fca9fc7ba70c9a72519ccc840))
* **tailwind-config:** installing daisyui ([5aa05bb](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/5aa05bbaca5846dc44bbadedbae81479b6bb8703))
* **web)(app:** adding tailwind and creating start repo ([5825a86](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/5825a86fa29e7f524e47a4155f0edc17d5495b85))
* **web)(ui:** adding sidebar component ([27df4ab](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/27df4abae600c113af9147d02fdcc7eb553b06a1))
* **web)(ui:** creating navbar component ([6144b74](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/6144b7409ed4506072129544ff862fcdd7995ac5))


### :memo: Docs

* **README.md:** creating README ([4d62059](https://github.com/CleberSchiavon/energy-invoice-extractor/commit/4d6205911f4a58b12684f740e2917281f772725d))

## 1.6.0 (2024-05-22)

### Features

- **api:** adding app logger component 972cbbc
- **api:** creating initial api package c53c6ff
- **create-turbo:** apply official-starter transform 705e915
- **create-turbo:** apply pnpm-eslint transform 4bd52de
- **create-turbo:** create basic f04f78e
- **create-turbo:** install dependencies 71efd2c
- **packages:** creating packages api ccc6983

### Bug Fixes

- **typescript-config:** configuring express ts config c8176f3
