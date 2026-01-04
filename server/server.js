// to import environment variables
import dotenv from 'dotenv'
dotenv.config()

// to import routes
import { todoRoute } from './routes/todoRoutes.js'

// to connect to the database
import { connect } from 'mongoose'

// to create an express app
import exp from 'express'
const app = exp()

// to parse the request body
app.use(exp.json())

// to get the environment variables
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT

// to check the values
console.log("DB_URL : ",DB_URL)
console.log("PORT : ",PORT)

// to connect to the database
connect(DB_URL)
.then(() => {
    console.log("Database connection success")

    // to start the server
    app.listen(PORT,() => {
        console.log(`HTTP server listening on port ${PORT}`)
    })
})
.catch((err) => {
    console.log("Err in DB connection :", err);
})

// to use the routes
app.use('/api', todoRoute)

// to handle invalid paths
app.use((request, response, next) => {
      response.json({ message: `Invalid path ${request.path}` });
})

// to handle errors
app.use((err, request, response, next) => {
    response.json({message : "Error Occurred", reason : err.message});
}
)
