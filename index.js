'use strict'
const express = require('express')
const app = express()
const port = 3000

const { MongoClient } = require('mongodb')
const assert = require('assert')
const path = require('path')
const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'music-map'

MongoClient.connect(mongoUrl, (err, client) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    const db = client.db(dbName)

    app.get('/api/v1/artists', (req, res) => {
        res.status(500).send('Not implemented!')
    })

    app.get('/api/v1/artist/:id', (req, res) => {
        res.status(500).send('Not implemented!')
    })

    app.use(express.static(path.join(__dirname, 'frontend/dist')))

    app.listen(port, () => console.log(`Setting phasers to stun... (port ${port})`))
})

