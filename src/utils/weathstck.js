const request = require('postman-request')

const weathstck = ([lat, long], callback) => {

    const coord = [lat, long]

    const url = 'http://api.weatherstack.com/current?access_key=1f34e2d66afaae5030b6a3c1f4ad64cf&query=' + coord

    request({ url: url, json: true }, (error, response) => {

        if (error) {

            callback('Unable to connect to weather service', undefined)

        } else if (response.body.error) {

            callback('Unable to find location', undefined)

        } else {

            // Get data
            const { temperature, feelslike, weather_descriptions, humidity } = response.body.current
            // const temp = response.body.current.temperature
            // const feel = response.body.current.feelslike
            // const wdes = response.body.current.weather_descriptions
            const info = {
                temperature: temperature,
                feelslike: feelslike,
                descriptions: weather_descriptions,
                forcast: "It's currently " + temperature + 
                    " C. Feels like " + feelslike + " C. It's " + weather_descriptions + ". Humidity is " + humidity + "%."
            }

            // callback(undefined, "It's currently " + info.temperature + 
            //     " C. Feels like " + info.feelslike + " C. It's " + info.descriptions +".")
            callback(undefined, info)

        }

    })
}

module.exports = weathstck