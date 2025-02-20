const express = require('express');
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const PORT = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const {cloudinaryConnect} = require('./config/cloudinary');
const routes = require('./routes');

cloudinaryConnect();

app.use(express.json());
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(
    cors({
        origin : "*", //need to change this to the client url
        credentials:true,
    })
)
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use("/api/v1",routes);

app.get("/",(_,res) => {
    return res.status(200).json({
        success:true,
        message:"Server is Running...",
    })
}); 

app.listen(PORT,() => {
    console.log(`App is Running at PORT ${PORT}`);
});