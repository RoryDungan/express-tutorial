# Simple Node.js example project. 
### Host a website that shows statistics for popularity of different musicians on Spotify around the world, using a simple REST API built with [Express](https://expressjs.com/).

## Getting started
All you need to start is Node.js, NPM, and possibly MongoDB. 

The `master` branch contains the finished product (answers), and the `intro` 
branch contains a starting point with no code.

### Database
Either connect to 
an existing database or set your own up and use [`mongorestore`](https://docs.mongodb.com/manual/reference/program/mongorestore/) 
to load the data from the `db-dump` folder into your database. 

The data was generated using [music-fandom-map](https://docs.mongodb.com/manual/reference/program/mongorestore/)

### Webpage

The webpage to serve has already been created and resides in the `frontend/dist` 
folder. The code has been compiled and minified but the original source is 
[available on GitHub](https://github.com/RoryDungan/music-map-react).

## The API we will create

In addition to serving the webpage, we'll need to make a REST API to serve the 
data. This will have two routes - one for getting a list of all artists and one 
for getting a specified artist's details:

### GET `/api/v1/artists`
- Should return an object containing artist names and their IDs
    ```
    {
        "5c806b157e910b2c52000000": "(G)I-DLE",
        "5c806b157e910b2c52000001": "2 Chainz",
        "5c806b157e910b2c52000002": "21 Savage",
        "5c806b157e910b2c52000003": "5 Seconds of Summer",
        "5c806b157e910b2c52000004": "6ix9ine",
        "5c806b157e910b2c52000005": "A Boogie Wit da Hoodie",
        "5c806b157e910b2c52000006": "A$AP Rocky",
        // ...
        "5c806b157e910b2c52000154": "Zac Efron",
        "5c806b157e910b2c52000155": "Zara Larsson",
        "5c806b157e910b2c52000156": "Zedd",
        "5c806b157e910b2c52000157": "Zion & Lennox",
        "5c806b157e910b2c52000158": "benny blanco",
        "5c806b157e910b2c52000159": "iKON",
        "5c806b157e910b2c5200015a": "Ñejo & Dalmata"
    }
    ```

### GET `/api/v1/artist/:id`
 - Should return data from the database about that particular artist
    ```
    {
        "_id": "5c806b157e910b2c520000aa",
        "artistName": "Kendrick Lamar",
        "streams": {
            "USA": 0.003024534322321415,
            "AUS": 0.005605379119515419,
            "CAN": 0.0030451961793005466,
            "GRC": 0.0032578848768025637,
            "NZL": 0.002817972097545862
        },
        "description": "Kendrick Lamar (born Kendrick Lamar Duckworth June 17, 1987) is a rapper from Compton, California.",
        "imageUrl": "https://lastfm-img2.akamaized.net/i/u/300x300/d6ca4f75a1adbfb069793b393b63a722.png"
    }
    ```