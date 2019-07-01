import { createArtistsService } from '../src/artists-service'
import { ObjectID } from 'bson';

describe('ArtistsService', () => {
    describe('getCallArtists', () => {
        it('retrieves all artists from database', async () => {
            expect.assertions(1)

            // Arrange
            const testData = [
                {
                    _id: 'acdf123',
                    name: 'BROCKHAMPTON',
                },
                {
                    _id: '11dcff9',
                    name: 'Madlib',
                }
            ]
            const expectedArtists = {
                'acdf123': 'BROCKHAMPTON',
                '11dcff9': 'Madlib',
            }

            const mockCursor = {
                toArray: jest.fn(() => testData)
            }
            const mockCollection = {
                find: jest.fn(() => mockCursor)
            } as any

            const { getAllArtists } = createArtistsService(mockCollection)

            // Act
            const artists = await getAllArtists()

            // Assert
            expect(artists).toEqual(expectedArtists)
        })

        it('projects to only artistName and _id columns', async () => {
            expect.assertions(2)

            // Arrange
            const mockCursor = {
                toArray: jest.fn(() => [])
            }
            const mockCollection = {
                find: jest.fn(() => mockCursor)
            } as any
            const { getAllArtists } = createArtistsService(mockCollection)

            // Act
            const artists = await getAllArtists()

            // Assert
            expect(mockCollection.find).toBeCalledWith({}, {
                projection: { artistName: 1, _id: 1 }
            })
            expect(mockCollection.find).toBeCalledTimes(1)
        })
    })

    describe('getArtistDetails', () => {
        it('looks up artist with the specified ID', async () => {
            expect.assertions(2)

            // Arrange
            const testArtistId = new ObjectID('5c806b157e910b2c52000003')
            const mockCollection = {
                findOne: jest.fn()
            } as any
            const { getArtistDetails } = createArtistsService(mockCollection)

            // Act
            await getArtistDetails(testArtistId)

            // Assert
            expect(mockCollection.findOne).toBeCalledWith({ _id: testArtistId })
            expect(mockCollection.findOne).toBeCalledTimes(1)
        })

        it('returns data for the specified artist', async () => {
            expect.assertions(1)

            // Arrange
            const testArtistId = new ObjectID('5c806b157e910b2c52000003')
            const testArtist = {
                _id: testArtistId,
                artistName: 'Mahmood',
                streams: { 'AUS': 0.991, 'ITA': 0.234 },
                description: 'Alessandro Mahmoud (born 12 September 1992 in Milan), known by the stage name Mahmood...',
                imageUrl: 'https://lastfm-img2.akamaized.net/i/u/300x300/d9d2dcf27914f58e77ab9dff6b0427cf.png'
            }
            const mockCollection = {
                findOne: jest.fn(() => testArtist)
            } as any
            const { getArtistDetails } = createArtistsService(mockCollection)

            // Act
            const artist = await getArtistDetails(testArtistId)

            // Assert
            expect(artist).toEqual(testArtist)
        })
    })
})
