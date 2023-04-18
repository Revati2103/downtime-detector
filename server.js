const express = require('express');
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5500

const connectDB = require('./config/db')
connectDB()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())



app.get('/', (req,res) => {
    res.send('Hello from 5500!');
})

app.listen(port, () => console.log(`Server started on port ${port}`))