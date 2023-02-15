const express = require('express');
const cors = require('cors');
const app = express();


app.listen(3000, () => {
    console.log('Express server listening on port 3000');
})

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:4200'
}))

const dataservice = require('./services/dataService');
const { Hospital } = require('./services/db');


const appMiddleWare = (req, res, next) => {
    // console.log('application specific middleware');
    next();
}
app.use(appMiddleWare)

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        //verify the token -verify()
        // console.log('Router specific middleware');
        const data = jwt.verify(token, 'superkey2020')
        next();
    }
    catch {
        //422 -unprocessible entity(unable to process)
        res.status(404).json({
            statusCode: 404,
            status: false,
            message: 'please login'
        })
    }
}

app.post('/adminLogin', (req, res) => {
    console.log(req.body);
    dataservice.adminLogin(req.body.username, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

app.post('/registerHospital', (req, res) => {
    console.log(req.body);
    dataservice.pushHospital(req.body.hospitalName, req.body.mailid, req.body.pswd)
        .then(Hospital => {
            res.status(Hospital.statusCode).json(Hospital)
        })
    // res.status(result.statuscode).json(result)
    // if (Hospital) {
    //     res.send('Successfully registered');
    // } else {
    //     res.send('user registration failed');
    // }

})

app.post("/Hospitallogin", (req, res) => {

  
    dataservice.adminlo()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
  });

// app.get('/all-admins', (req, res) => {
//     dataservice.getAdmins()
//         .then((result) => {
//             res.status(result.statusCode).json(result)
//         })
// })

app.get('/all-hospitals',(req,res)=>{
    dataservice.getAllHospitals()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
