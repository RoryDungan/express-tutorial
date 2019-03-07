'use strict'
const express = require('express')
const app = express()
const port = 3000

const { MongoClient, ObjectID } = require('mongodb')
const assert = require('assert')
const path = require('path')
const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'music-map'

const errorHandler = callback => async (req, res) => {
    try {
        await callback(req, res)
    }
    catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    const db = client.db(dbName)

    app.get('/api/v1/artists', errorHandler(async (req, res) => {
        const artists = await db.collection('stats')
            .find({}, {
                projection: {
                    artistName: 1,
                    streams: 1,
                    _id: 1
                }
            })
            .toArray()

        const filteredArtists = {}
        artists
            .forEach(a => filteredArtists[a._id] = a.artistName)

        res.send(filteredArtists).status(200)
    }))

    app.get('/api/v1/artist/:id', errorHandler(async (req, res) => {
        const artistId = req.params.id
        if (!artistId) {
            res.sendStatus(400)
        }

        const artist = await db.collection('stats')
            .findOne({ _id: new ObjectID(artistId) })

        if (!artist) {
            res.sendStatus(405)
        }

        res.send(artist).status(200)
    }))

    app.use(express.static(path.join(__dirname, 'frontend/dist')))

    app.listen(port, () => console.log(`Setting phasers to stun... (port ${port})`))
})

