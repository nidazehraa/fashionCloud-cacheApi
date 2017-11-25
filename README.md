# Fashion Cloud

Cache API provides multiple operations in order to add, remove, update and list down data that has been stored in our Cache database. These APIs call be performed by direct hit (`node`, `postman`,`curl command`).

## GET request to /api/cache

This API Path will list down all cache entries that exists in a database.

## GET request to /api/cache/{key}

This API will return the particular information against the provided key

## POST request to /api/cache/{key}

This API will add a key in the database against the information provided

## DELETE request to /api/cache/{key}

This API will delete the particular entry against the key provided

## DELETE request to /api/cache

This API call will remove all entries from database

## Run project

1) Install app dependencies.
```javascript
npm install
launch mongodb instance
```

2) Run the tests
```javascript
npm run test
```
3) Run AP
```javascript
node app.js
```
