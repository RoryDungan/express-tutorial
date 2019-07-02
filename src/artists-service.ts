import { Collection, ObjectID } from "mongodb";

/**
 * Data describing an entry in the database with details of one artist.
 */
export type ArtistInfo = {
    _id: string,
    artistName: string,
    streams: {
        [countryId: string]: number
    },
    description: string,
    imageUrl: string
}

/**
 * Dictionary of artist names and IDs.
 */
export type ArtistsDictionary = { [id: string]: string }

export interface IArtistsService {
    /**
     * Function for getting the details of a specified artist.
     */
    getArtistDetails: (artistId: ObjectID) => Promise<any>

    /**
     * Function for getting the list of all artists and their IDs.
     */
    getAllArtists: () => Promise<ArtistsDictionary>
}

export const createArtistsService = (dbCollection: Collection): IArtistsService => {
    const getArtistDetails = (artistId: ObjectID) => {
        return dbCollection.findOne({ _id: artistId })
    }
    const getAllArtists = async () => {
        const artistsArray = await dbCollection.find({}, {
            projection: {
                artistName: 1,
                _id: 1
            }
        })
            .toArray()

        const artistsDictionary: ArtistsDictionary = {}
        artistsArray.forEach(a => artistsDictionary[a._id] = a.artistName)

        return artistsDictionary
    }

    return {
        getArtistDetails,
        getAllArtists
    }
}
