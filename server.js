const express = require('express')
const path = require('path')
const open = require('open')
const port = 3333
const app = express()

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public\\index.html'))
})

app.listen(port, function (error) {
    if(error){
        console.log(error)
    } else {
        open(`http://localhost:${port}/`)
    }
});

