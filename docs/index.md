## Coronavirus Philippines 2019 API

The COVID19PH-API is organized around REST. The API has predictable resource-oriented URLs, returns JSON-encoded responses, and uses standard HTTP response codes. The API does not need authentification as for now. It's updated and free.

## Cases

#### Call

Return the information about the cases

```
GET /cases
```
Test it out: [Live version](http://13.250.29.32:5000/cases)

#### Parameters

This call has a lot of different parameters for customizing the response to your exact need.

If you want to get the result of 30 years old only people who recover, you will use the parameters `age` and `status` like this:

```
http://13.250.29.32:5000/cases?age=30&status=recovered
```
Test it out: [Live version](http://13.250.29.32:5000/cases?age=30&status=recovered)

Under, you will find the list of the parameters available:

| params | type | description | example |
| :--- | :---- | :---------- | :------ |
| limit | number | the limit of the result | [Live Version](http://13.250.29.32:5000/cases?limit=1) |
| skip | number | skip a number of result | [Live Version](http://13.250.29.32:5000/cases?skip=100) |
| sort_key | number | the key use for sorting the result (can only work if sort_order is also defined) | [Live Version](http://13.250.29.32:5000/cases?sort_key=age&sort_order=1) |
| sort_order | number | the order of the result : 1 for ascending or -1 for descending (can only work if sort_key is also defined) | [Live Version](http://13.250.29.32:5000/cases?sort_key=age&sort_order=1) |
| age | number | the exact age of the cases | [Live Version](http://13.250.29.32:5000/cases?age=20) |
| age_upper | number | Upper limit for age | [Live Version](http://13.250.29.32:5000/cases?age_upper=30) |
| age_lower | number | Lower limit for age | [Live Version](http://13.250.29.32:5000/cases?age_lower=15) |
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

#### Response

```
[{
	"case_code":"C335002",
	"age":30,
	"sex":"F",
	"date_start_case":"2020-07-12T00:00:00.000Z",
	"date_result_release":"2020-07-12T00:00:00.000Z",
	"date_result_positive":"2020-09-03T00:00:00.000Z",
	"date_recover":"2020-09-03T00:00:00.000Z",
	"date_died":"2020-09-03T00:00:00.000Z",
	"status":"DIED",
	"region":"NCR",
	"city":"MANILA",
	"quarantined":false,
	"pregnant":false
},
...
]
```

- **case_code:** The identification code of the case
- **age:** The age of the case
- **sex:** The sex of the case (M or F)
- **date_start_case:** The date when the case has been added
- **date_result_release:** The date when the result of the case has been release
- **date_result_positive:** The date when the case got a positive result
- **date_recover:** The date when the case has been considered recover
- **date_died:** The date when the case has died
- **status:** The actual status of the case
- **region:** The region of the case
- **city:** The city of the case
- **quarantined:** True if the case has been quarantined
- **pregnant:** True if the case is pregnant

## Total cases

#### Call

Return the number of cases in the Philippines

```
GET /cases/total
```
Test it out: [Live version](http://13.250.29.32:5000/cases/total)

#### Response

```
{
	total_cases: 319330
}
```

- **total_cases:** the number of cases in the Philippines

## Cities affected

#### Call

Return the list of city with at least one case

```
GET /cases/cities/available
```
Test it out: [Live version](http://13.250.29.32:5000/cases/cities/available)

#### Response

```
["CALUBIAN","MUTIA","CARAMORAN","PANAY","ANGADANAN","TANAUAN","JABONGA","RAGAY","BAKUN","CITY OF SAN JOSE DEL MONTE","TAYUG","REAL","CITY OF LIGAO","LAOAC","MONKAYO","MEDINA","LIPA CITY","DONSOL","SIBUNAG","JIMALALUD",...]
```

## Regions affected

#### Call

Return the list of regions with at least one case

```
GET /cases/regions/available
```
Test it out: [Live version](http://13.250.29.32:5000/cases/regions/available)

#### Response

```
["REGION IV-B: MIMAROPA","","BARMM","REGION X: NORTHERN MINDANAO",..]
```

## Status

#### Call

Return the list of status

```
GET /cases/status/available
```
Test it out: [Live version](http://13.250.29.32:5000/cases/status/available)

#### Response

```
["ASYMPTOMATIC","CRITICAL","RECOVERED","DIED","SEVERE","MILD"]
```

## Errors

If you do not use the parameters correctly, an error message with indicate precisely which parameters is wrong.

#### Response

```
{
	'abc': 'This parameter need to be one of the following choice: true, false'
}
```

### Support or Contact

Having trouble with the API ? Check out my [the github](https://github.com/JustalK) and ask me directly.
