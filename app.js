const express = require('express')
const {
    getGamesAmerica
} = require('nintendo-switch-eshop');
const app = express()

app.listen(3000, function () {
    console.log('listening to port 3000')
})

app.get('/eshop-sales', (req, res) => {
    let array = []
    let url = "https://www.nintendo.com"

    getGamesAmerica().then((result) => {
        result.forEach((element) => {
            if (element.salePrice != null && element.platform == "Nintendo Switch") {
                let company = element.publishers == null ? element.developers : element.publishers
                var game = {
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
            }
        });

        array.sort((left, right) => {
            if (left.title < right.title) {
                return -1
            } else {
                return 0
            }
        })

        let dataEnvelope = {}
        dataEnvelope.data = array

        res.send(dataEnvelope)

    }).catch(console.error)
})