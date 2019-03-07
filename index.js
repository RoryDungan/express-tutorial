const express = require('express')
const app = express()
const port = 3000

app.get('/api/v1/artists', (req, res) => {
    res.status(500).send('Not implemented!')
})

app.get('/api/v1/artist/:id', (req, res) => {
    res.status(500).send('Not implemented!')
})

app.use(express.static('frontend/dist'))

app.listen(port, () => console.log(`Setting phasers to stun... (port ${port})`))