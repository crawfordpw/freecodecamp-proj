# APIs and Microservies Projects - URL Shortener Microservice

Build a full stack JavaScript app that is functionally similar to this: https://thread-paper.glitch.me/.

-   **User Story #1:** I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response.
    -   **Example:** `{"original_url":"www.google.com","short_url":1}`
-   **User Story #2:** If I pass an invalid URL that doesn't follow the `www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`
-   **User Story #3:** When I visit the shortened URL, it will redirect me to my original link.

**Short URL Creation**

-   **Example Usage:** `POST [project_url]/api/shorturl/new/www.google.com`
-   **Example Output:** `{"original_url":"www.google.com","short_url":1}`

**Short URL Usage**

-   **Example Usage:** `[this_project_url]/api/shorturl/3`
-   **Example Output:** `https://www.freecodecamp.org/forum/`

**Notes**:

-   However unlikely, the microservice doesn't currently handle if a new generated short_url already exists in the database. the database would return the first one
-   Node.js's dns module method `dns.lookup()` thinks a website starting with http:// or https:// is invalid for some reason. So, omit that portion when creating a new url
