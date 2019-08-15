const express = require('express')
const router = express.Router()
const {
    getGamesAmerica
} = require('nintendo-switch-eshop');

router.get('/eshop-sales', (req, res) => {
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

module.exports = router