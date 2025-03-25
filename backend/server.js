import  express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import productRoutes from "./routes/product.routes.js"


dotenv.config()

const app = express()

app.use(express.json()) //Accept json data in the req.body


app.use("/api/products",productRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    connectDB();
    console.log("The server started at http://localhost:"+ PORT);
    
})






// Here all routes have only slashes because the server,js has writes  this is a prefix  "/api/products" and the other slshes are these "/ , /:id"


// we use app.use to enter > product.routes.js then enter > product controller.js to do CRUd operations 
