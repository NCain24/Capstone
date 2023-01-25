require( 'dotenv' ).config()
const express = require( 'express' );
const cors = require( 'cors' );
const mongoose = require( 'mongoose' )
const bodyParser = require('body-parser')
const app = express();
const membersRoute = require('./routes/members')
const { SERVER_PORT } = process.env
const uri = process.env.ATLAS_URI
const connection = mongoose.connection

// const { register, login } = require( './controllers/authCtrl' )
// app.post( '/register', register )
// app.post('/login', login)

app.use(bodyParser.json())

app.use( express.json() );
app.use( cors() );
app.use('/members', membersRoute)

mongoose.set('strictQuery', false)
mongoose.connect( uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} )

connection.once( 'open', () => console.log( 'MongoDB database connection established successfully' ) )

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
    
