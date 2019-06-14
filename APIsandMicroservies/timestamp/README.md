# APIs and Microservies Projects - Timestamp Microservice

Build a full stack JavaScript app that is functionally similar to this: https://curse-arrow.glitch.me/.

-   **User Story #1:** The API endpoint is `GET [project_url]/api/timestamp/:date_string?`
-   **User Story #2:** A date string is valid if can be successfully parsed by `new Date(date_string)`
    <br>**Note** that the unix timestamp needs to be an **integer** (not a string) specifying **milliseconds**.
    <br>In our test we will use date strings compliant with ISO-8601 (e.g. `"2016-11-20"`) because this will ensure an UTC timestamp.
-   **User Story #3:** If the date string is **empty** it should be equivalent to trigger `new Date()`, i.e. the service uses the current timestamp.
-   **User Story #4:** If the date string is **valid** the api returns a JSON having the structure
    <br>`{"unix": <date.getTime()>, "utc" : <date.toUTCString()> }`
    <br>e.g. `{"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}`
-   **User Story #5:** If the date string is **invalid** the api returns a JSON having the structure <br>`{"unix": null, "utc" : "Invalid Date" }`. It is what you get from the date manipulation functions used above.
-   **Example Usage:**
    <br>`GET [project url]/api/timestamp/2015-12-25`
    <br>`GET project url]/api/timestamp/1450137600`
-   **Example Output:**
    <br> `{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}`
