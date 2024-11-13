const express = require('express');
const app = express();
const fs = require('fs');


// app.use(express.json());


// app.get('/',(req,res) => {
//     res.status(200).send('Hello from the server')
// })



const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)



app.get('/api/v1/tours',(req,res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});



// app.get('/api/v1/tours',(req,res) => {
//     console.log(req.body);
//     res.send('Done');
    
// });


app.get('/api/v1/tours',(req,res) => {

});






const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});