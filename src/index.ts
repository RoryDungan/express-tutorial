import * as express from 'express'
import { Request, RequestHandler, Response, NextFunction } from 'express'
const app = express()
const port = 3000

import { MongoClient, ObjectID } from 'mongodb'
import * as path from 'path'
import { createArtistsService } from './artists-service';
const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'music-map'

const errorHandler = (callback: RequestHandler) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await callback(req, res, next)
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
    const artistsService = createArtistsService(db.collection('stats'))

    app.get('/api/v1/artists', errorHandler(async (req, res) => {
        const artists = await artistsService.getAllArtists()
        res.send(artists).status(200)
    }))

    app.get('/api/v1/artist/:id', errorHandler(async (req, res) => {
        const artistIdStr = req.params.id
        if (!artistIdStr || !ObjectID.isValid(artistIdStr)) {
            res.sendStatus(400)
            return
        }
        const artistId = ObjectID.createFromHexString(artistIdStr)

        const artist = await artistsService.getArtistDetails(artistId)

        if (!artist) {
            res.sendStatus(404)
        }

        res.send(artist).status(200)
    }))

    app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')))

    app.listen(port, () => console.log(`Setting phasers to stun... (port ${port})`))
})

