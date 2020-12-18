  
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express();
const port = 8080 || process.env.port

app.get('/', (req, res)=>{
    console.log(req.body);
    res.send("<h1>Welclome i'm empty.....</h1>")
})

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/users', require ('./userRouter'));

app.listen(port, ()=> console.log(`Server is running on port ${port}`));


// not forget!!!!!!!!
// npm i body-parser 
// npm i cors
// npm i morgan
// npm i bcrypt
// npm i router