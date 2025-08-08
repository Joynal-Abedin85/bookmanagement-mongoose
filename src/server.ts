import express from "express"
import cors from "cors"
import config from "./config"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res) =>  {
    res.send("hello world ")
})

app.listen(config.port , () => {
    console.log(`server running on port ${5000}`)
})