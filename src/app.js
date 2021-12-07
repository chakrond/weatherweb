const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weathstck = require('./utils/weathstck')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicdir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set partials
hbs.registerPartials(partialsPath)

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicdir))

app.get('', (req, res) => {

    res.render('index', { // Web Directory **index doesnot required
        title: 'Weather App',
        name: 'Chakron Dechkrut'
    })

})

app.get('/about', (req, res) => {

    res.render('about', { // File in viewsPath
        title: 'About Me',
        name: 'Chakron Dechkrut'
    })

})

app.get('/help', (req, res) => {

    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Chakron Dechkrut'
    })

})


app.get('/weather', (req, res) => {

    console.log(req.query)

    if (!req.query.address) {
        return res.send({
            error: 'Address not provided'
        })
    }


    geocode(req.query.address, (error, gdata = {} )  => {

        if (error) {

            return res.send({error})
        }

        weathstck([gdata.Lat, gdata.Long], (error, wdata) => {

            if (error) {

                return res.send({error})
            }

            const fdata = Object.assign({}, gdata, wdata) // Concat two JSON object
            res.send(fdata) 

        })
    })
})



app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'Search key not provided'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })

})


app.get('/help/*', (req, res) => {

    res.render('help404', {
        title: 'Help not found!',
    })

})


app.get('*', (req, res) => {

    res.render('404page', {
        title: '404 Page',
    })

})

app.listen(port, () => {
    console.log('Server is up on port ' + port)

})

// app.get('/weather', (req, res) => {
//     res.send({

//         forecaset: "It is raining",
//         location: 'Bangkok'

//     })
// })