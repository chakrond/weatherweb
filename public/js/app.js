// const fetch = require('node-fetch')

console.log('Client side javascript file is loaded')


const weatherForm = document.querySelector('form')
const searchElem  = document.querySelector('input')
const msg1        = document.querySelector('#msg-1')
const msg2        = document.querySelector('#msg-2')
// const class1      = document.querySelector('.className') // target by class name




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // prevent page refresh

    // Set text show on page
    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    const location = searchElem.value
    console.log('Search input: ' + location)


    fetch('http://localhost:3000/weather?address=' + location).then
        ((response) => {
            response.json().then((data) => {

                if (data.error) {
                    console.log(data.error)
                    msg1.textContent = data.error

                } else {

                    console.log(data.Location)
                    console.log(data.forcast)

                    msg1.textContent = data.Location
                    msg2.textContent = data.forcast
                }
            })
        })


})