const request = require('postman-request')
const { abort } = require('process')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ29kbG9vdGVyIiwiYSI6ImNrd255YjJ6ZzJxNGMybm1wYnVnM2Mzd2oifQ.SOytOnFHj8M7i2Q4_qJKsA&limit=1'

    request({ url: url, json: true }, (error, response) => {

        if (error) {

            callback('Unable to connect to weather service', undefined)


        } else if (response.body.features.length == 0) {

            callback('Unable to find location. Try another search', undefined)
            

        } else {

            const lat  = response.body.features[0].center[1]
            const long = response.body.features[0].center[0]
            const name = response.body.features[0].place_name
            const info = {
                Lat: lat,
                Long: long,
                Location: name
            }

            callback(undefined, info)


        }
    })

}

module.exports = geocode