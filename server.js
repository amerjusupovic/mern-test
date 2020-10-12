const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const credentials = require('./credentials')
const Data = require('./data')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post("/write_data", (req, res) => {
    let data = new Data()
    const {message} = req.body

    if (!message) return res.json({success: false, error: "Invalid input."})

    data.message = message
    data.save(err => {
        if (err) return res.json({success: false, error: err})
        return res.json({success: true})
    })
})

app.get("/get_data", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({success: false, error: err})
        return res.json({success: true, data: data})
    })
})

app.listen(port, () => console.log(`Listening on port ${port}.`))

mongoose.connect(credentials.dbRoute, {useNewUrlParser: true})
let db = mongoose.connection

db.once("open", () => console.log("Connected to the database."))
db.on("error", console.error.bind(console, "MongoDB connection error:"))