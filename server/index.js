const express = require('express')

const app = express()
// getting the route of bankauth
const bankAuthRouter = require('./routes/authBank')
//getting the route of authPerson
const personAuthRouter = require('./routes/authPerson')

//getting the route of CreateRequest
const createRequestRouter = require('./routes/Request')

// personrouter

const personRouter = require('./routes/Person')
// Donate Router 
const donateRouter = require('./routes/Donate')
//bloodbank finding router
const bloodbankrou = require('./routes/BloodBank')
// Report router

const reportRouter = require('./routes/ReportDonation')

const router = express.Router()

router.use('/bankauth', bankAuthRouter)
router.use('/personauth', personAuthRouter)

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')
const mysql = require('mysql2')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'aman',
    database: 'bloodapp'

})
db.connect(function(err){
    if(err) throw err
    console.log('connected...');
})
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}))

// define the route 

app.use('/api/authBank', bankAuthRouter)
app.use('/api/authPerson', personAuthRouter)
app.use('/api/Request' ,createRequestRouter);
app.use('/api/Person', personRouter)
app.use('/api/Donation', donateRouter)
app.use('/api/Blood', bloodbankrou)
app.use('/api/Blood', reportRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleWare)
// app.get("/", (req, res)=>{

//     // check whether data is inserting or not in a database
//     // const insertData = "insert into bloodbank (BankName, password, openingTimings, closingTimings) values ('JDC', '!@!#!', '8:00:00', '12:00:00')";
//     // db.query(insertData, (error, result)=>{
//     //     console.log(error);
//     //     console.log(result);
//     // res.send('response from the home root')

//     // })
//     res.send('response from the home root')

// })

const port = process.env.PORT || 3001

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`) 
})


