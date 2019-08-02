const express = require('express')
const {
    getGamesAmerica
} = require('nintendo-switch-eshop');
const app = express()

app.listen(3000, function () {
    console.log('listening to port 3000')
})

app.get('/eshop-sales', (req, res) => {
    getGamesAmerica().then((result) => {
        let array = []
        let url = 'https://www.nintendo.com'

        result.forEach((element) => {
            if (element.salePrice != null && element.platform == "Nintendo Switch") {
                var game = {
                    title: element.title,
                    boxArt: url + element.boxArt,
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