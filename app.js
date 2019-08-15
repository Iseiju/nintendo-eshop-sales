const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
    console.log('listening to port ' + PORT)
})

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.use('/games', require('./routes/games'))