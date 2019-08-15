const express = require('express')
const {
    getGamesAmerica
} = require('nintendo-switch-eshop');
const app = express()

const PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log('listening to port ' + PORT)
})

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.get('/eshop-sales', (req, res) => {
    var id = 0
    let array = []
    let url = "https://www.nintendo.com"

    getGamesAmerica().then((result) => {
        result.forEach((element) => {
            if (element.salePrice != null && element.platform == "Nintendo Switch") {
                let company = element.publishers == null ? element.developers : element.publishers
                var game = {
                    id: id,
                    url: url + element.url,
                    title: element.title,
                    description: element.description,
                    boxArt: url + element.boxArt,
                    releaseDate: element.releaseDateMask,
                    categories: element.categories,
                    esrb: element.esrb,
                    company: company,
                    availability: element.availability,
                    price: element.msrp,
                    salePrice: element.salePrice
                }
                array.push(game)
                id = id + 1
            }
        });

        let dataEnvelope = {}
        dataEnvelope.data = array

        res.send(dataEnvelope)
    }).catch(console.error)
})