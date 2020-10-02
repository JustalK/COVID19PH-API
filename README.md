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

API for COVID 19 Cases in the Philippines from DOH last update. Get all the informations about the cases in the Philippines in a JSON format. A running live version of the system is available here : [Live Version](http://13.250.29.32:5000/cases)

## Features

- **DOH data download:** Download automatically the latest datas from DOH

- **Powerfull API:** Complete and fast API for the covid in Philippines

- **Flexible API:** With many parameter, it's easy to build your application around it

## API


| method | url | description | example |
| :--- | :---- | :---------- | :------ |
| GET | /cases | Return the list of all cases | [Live Version](http://13.250.29.32:5000/cases) |
| GET | /cases/cities/available | Return the list of all cities affected | [Live Version](http://13.250.29.32:5000/cases/cities/available) |
| GET | /cases/regions/available | Return the list of all region affected | [Live Version](http://13.250.29.32:5000/cases/regions/available) |
| GET | /cases/status/available | Return the list of all status possible | [Live Version](http://13.250.29.32:5000/cases/status/available) |


<details>
  <summary><b>Get all the cases of covid parameters</b> (click to show)</summary>

| params | type | description | example |
| :--- | :---- | :---------- | :------ |
| limit | number | the limit of the result | [Live Version](http://13.250.29.32:5000/cases?limit=1) |
| sort_key | number | the key use for sorting the result (can only work if sort_order is also defined) | [Live Version](http://13.250.29.32:5000/cases?sort_key=age&sort_order=1) |
| sort_order | number | the order of the result : 1 for ascending or -1 for descending (can only work if sort_key is also defined) | [Live Version](http://13.250.29.32:5000/cases?sort_key=age&sort_order=1) |
| age | number | the exact age of the cases | [Live Version](http://13.250.29.32:5000/cases?age=20) |
| age_upper | number | All the cases with an age lower than this value | [Live Version](http://13.250.29.32:5000/cases?age_upper=30) |
| age_lower | number | All the cases with an age higher than this calue | [Live Version](http://13.250.29.32:5000/cases?age_lower=15) |
| sex | string | All the cases with a certain sex : 'M' or 'F' | [Live Version](http://13.250.29.32:5000/cases?sex=F) |
| pregnant | boolean | All the cases pregnant : true or false | [Live Version](http://13.250.29.32:5000/cases?pregnant=true) |
| quarantined | boolean | All the cases quarantined : true or false | [Live Version](http://13.250.29.32:5000/cases?quarantined=true) |
| status | string | All the cases with the same status : [List of status available](http://13.250.29.32:5000/cases/status/available) | [Live Version](http://13.250.29.32:5000/status=died) |
| city | string | All the cases in the same city : [List of city available](http://13.250.29.32:5000/cases/cities/available) | [Live Version](http://13.250.29.32:5000/cases?city=basista) |
| region | string | All the cases in the same region : [List of region available](http://13.250.29.32:5000/cases/regions/available) | [Live Version](http://13.250.29.32:5000/cases?region=caraga) |
| date_start_case | date (format: MM/DD/YYYY) | All the cases started at an exact date | [Live Version](http://13.250.29.32:5000/cases?date_start_case=05/06/2020) |
| date_start_case_before | date (format: MM/DD/YYYY) | All the cases started before an exact date | [Live Version](http://13.250.29.32:5000/cases?date_start_case_after=05/06/2020) |
| date_start_case_after | date (format: MM/DD/YYYY) | All the cases started after an exact date | [Live Version](http://13.250.29.32:5000/cases?date_start_case_before=05/06/2020) |
| date_result_release | date (format: MM/DD/YYYY) | All the cases with the result released at an exact date | [Live Version](http://13.250.29.32:5000/cases?date_result_release=08/26/2020) |
| date_result_release_before | date (format: MM/DD/YYYY) | All the cases with the result released before an exact date | [Live Version](http://13.250.29.32:5000/cases?date_result_release_before=08/26/2020) |
| date_result_release_after | date (format: MM/DD/YYYY) | All the cases with the result released after an exact date | [Live Version](http://13.250.29.32:5000/cases?date_result_release_after=08/26/2020) |
| date_result_positive | date (format: MM/DD/YYYY) | All the cases with a positive result at an exact date | [Live Version](http://13.250.29.32:5000/cases?date_result_positive=08/26/2020) |
| date_result_positive_before | date (format: MM/DD/YYYY) | All the cases with a positive result before an exact date | [Live Version](http://13.250.29.32:5000/cases?date_result_positive_before=08/26/2020) |
| date_result_positive_after | date (format: MM/DD/YYYY) | All the cases with a positive result after an exact date | [Live Version](http://13.250.29.32:5000/cases?date_result_positive_after=08/26/2020) |
| date_recover | date (format: MM/DD/YYYY) | All the cases who recover at an exact date | [Live Version](http://13.250.29.32:5000/cases?date_recover=08/26/2020) |
| date_recover_before | date (format: MM/DD/YYYY) | All the cases who recover before an exact date | [Live Version](http://13.250.29.32:5000/cases?date_recover_before=08/26/2020) |
| date_recover_after | date (format: MM/DD/YYYY) | All the cases who recover after an exact date | [Live Version](http://13.250.29.32:5000/cases?date_recover_after=08/26/2020) |
| date_died | date (format: MM/DD/YYYY) | All the cases who died at an exact date | [Live Version](http://13.250.29.32:5000/cases?date_died=08/26/2020) |
| date_died_before | date (format: MM/DD/YYYY) | All the cases who died before an exact date | [Live Version](http://13.250.29.32:5000/cases?date_died_before=08/26/2020) |
| date_died_after | date (format: MM/DD/YYYY) | All the cases who recover after an exact date | [Live Version](http://13.250.29.32:5000/cases?date_died_after=08/26/2020) |

</details>
<details>
  <summary><b>Additionnals informations</b> (click to show)</summary>

* The live version has a limit of 1000 cases showing by default. The limit can be change to higher value by setting the value parameter.
* The sort_key and sort_order has to be use together for working.
* The parameters can be mixed together for mixing your particular query.
* The datas are updated every week.
* Some datas fields can be empty because the datas from DOH are let with empty field.

</details>

## How does it work ?

<details>
  <summary><b>Few explanation on the cron job</b> (click to show)</summary>

1. Download the notice PDF from DOH : http://bit.ly/DataDropPH
2. Parse the file for finding the link of the google drive where the datas are uploaded
3. Download the csv file with the data
4. Fill up the database used by the API

</details>
<details>
  <summary><b>Few explanation on the API</b> (click to show)</summary>

1. The api first check what is the parameter send and if it's a valid parameter (libs)
2. The api then build the filter that gonna be use by mongodb (services)
3. The api then return the result (dbs)

</details>

## How to install the development version ?

<details>
  <summary><b>Steps with informations</b> (click to show)</summary>

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

</details>
