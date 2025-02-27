# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 14.x or later
- Install [MySQL](https://dev.mysql.com/downloads/) version 14.x or later

# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```

```
- Execute SQL files
```

npm start
```
  Navigate to `http://localhost:3000`

  run /api/refresh API to trigger data from the csv file
  

## APIs List

|Endpoint	           | Method	           | Description | Sample Response |
| ----------------------------- | ------------------------------------| -----------------------------------------------| ------------------------------------------- |
| /api/revenue |	GET	?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD |	Gets total revenue for a given date range. |	{ "success": true, "totalRevenue": 50000.75 }|
| /api/revenue/product |	GET	?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD |	Gets revenue breakdown by product for a given date range. |	{ "success": true, "revenueByProduct": [ { "product": "iPhone 15 Pro", "revenue": 20000.50 } ] } |
| /api/revenue/category |	GET	?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD |	Gets revenue breakdown by category for a given date range. |	{ "success": true, "revenueByCategory": [ { "category": "Electronics", "revenue": 30000.75 } ] } |
| /api/revenue/region |	GET	?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD |	Gets revenue breakdown by region for a given date range. |	{ "success": true, "revenueByRegion": [ { "region": "North America", "revenue": 40000.50 } ] } |
| /api/refresh |	POST |	None |	Manually triggers data refresh from the latest CSV file. |	{ "success": true, "message": "Manual data refresh completed successfully" } |
