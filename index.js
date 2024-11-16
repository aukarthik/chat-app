const express =require ("express")
const cors =require ("cors")
const {PORT}=require("./env")
const RootRouter=require("./routes/index")
const app=express()


app.use(cors())
app.use(express.json())

app.use("/",RootRouter)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})