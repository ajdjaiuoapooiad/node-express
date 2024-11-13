const fs = require('fs');
const express = require('express');
const { getAllTours, createTour, getTour, updateTour, deleteTour } = require('../after-section-06/controllers/tourController');
const app = express();


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

app.get('/api/v1/tours/:id',(req,res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);


    if (!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'error'
        });
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
});



app.post('/api/v1/tours',(req,res) => {
    // console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId},req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'success',
                data: {
                    newTour
                }
            });           
        }
    );
});


app.patch('/api/v1/tours/:id',(req,res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated>'
        }
    })
})


// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTours);
// app.delete('/api/v1/tours/:id',deleteTours);


app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app
.routes('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});