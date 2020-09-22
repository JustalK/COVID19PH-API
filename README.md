# COVID19PH-API

![Last version npm](https://img.shields.io/npm/v/@justalk/covid19ph-api.svg?style=flat-square)
![Last version](https://img.shields.io/github/v/tag/justalk/covid19ph-api.svg?style=flat-square)
[![Node version](https://img.shields.io/node/v/@justalk/covid19ph-api.svg?style=flat-square)](https://www.npmjs.com/package/@justalk/covid19ph-api)
[![Travis](https://img.shields.io/travis/com/justalk/covid19ph-api.svg?style=flat-square)](https://travis-ci.com/github/JustalK/covid19ph-api)
[![Coverage Status](https://coveralls.io/repos/github/JustalK/COVID19PH-API/badge.svg?branch=master&style=flat-square)](https://coveralls.io/github/JustalK/covid19ph-api?branch=master)
[![Dependency status](http://img.shields.io/david/justalk/covid19ph-api.svg?style=flat-square)](https://david-dm.org/justalk/covid19ph-api.svg)
![Last version](https://img.shields.io/github/license/justalk/covid19ph-api.svg?style=flat-square)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)

![Star the project](https://img.shields.io/github/stars/justalk/covid19ph-api?style=social)

API for COVID 19 Cases in the Philippines

### Features

- **DOH data download:** Download the latest datas from DOH

- **Powerfull API:** Complete API for the covid in Philippines

### How is it working

1. Download the notice PDF from DOH
2. Parse the file for finding the link of the google drive
3. Download the csv files from the google drive
4. Fill up the database used by the API

### How to install

1. Cloning the repository

```bash
git cloning https://github.com/JustalK/COVID19PH-API.git
```

2. Install all the dependencies

```bash
npm install
```

3. Create an environnement file and fill up the information missing depending of your system

```json
NODE_ENV=production

API_NAME=COVID19-PH
HOST=localhost
PORT=5000

CASES_LIMIT_GETTER=1000

DB_NAME=
DB_URI_DATA=
DB_URI_LOG=
DB_USER_DATA=
DB_PASS_DATA=
DB_HOST_LOG=
DB_PORT_LOG=
DB_NAME_LOG=
DB_USER_LOG=
DB_PASS_LOG=
```

- **NODE_ENV:** The type of the environnement file
- **API_NAME:** The name of the API
- **HOST:** The host of the API
- **PORT:** The port of the API
- **CASES_LIMIT_GETTER:** The limit of cases that can be fetch without params
- **DB_NAME:** The name of the database
- **DB_URI_DATA:** The url of the database
- **DB_URI_LOG:** The url of the log of the database
- **DB_USER_DATA:** The user of the database
- **DB_PASS_DATA:** The pass of the database

4. Create a google credential secret file form the developer file :

```
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": ""
}
```

5. Activate on the google console the google drive API
