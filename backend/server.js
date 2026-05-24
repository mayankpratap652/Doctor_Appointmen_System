import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import path from "path";

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

const _dirname = path.resolve();
const corsOptions = {
  origin: "https://doctor-appointmen-system-0i4i.onrender.com",
  Credential:true
}
// middlewares
app.use(express.json())
app.use(cors(corsOptions))

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend" , "dist", "index.html"));
  
})

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))