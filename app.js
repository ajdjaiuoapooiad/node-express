const fs = require('fs');
const express = require('express');
const morgan = require('morgan');


const app = express();



// 1) MIDDLEWARES

app.use(morgan('dev'))
app.use(express.json());

app.use((req,res,next) => {
    console.log('Hello from middleware');
    next();
    
});


app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
})


// app.get('/',(req,res) => {
//     res.status(200).send('Hello from the server')
// })



const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)


// 2 Module

const getAllTours = (req,res) => {
    console.log(req.requestTime);
    
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req,res) => {
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
};



const createTour = (req,res) => {
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
};


const updateTour = (req,res) => {
    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'error'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated>'
        }
    })
};

const deleteTour = (req,res) => {
    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'error'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<deleted>'
        }
    })
};


// User module

const getAllUsers = (req,res) => {
    console.log(req.requestTime);
    
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};


const getUser = (req,res) => {
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
};



const createUser = (req,res) => {
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
};


const updateUser = (req,res) => {
    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'error'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated>'
        }
    })
};

const deleteUser = (req,res) => {
    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'error'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<deleted>'
        }
    })
};


// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTours);
// app.delete('/api/v1/tours/:id',deleteTours);



// 3) ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();



tourRouter
.route('/')
.get(getAllTours)
.post(createTour);

tourRouter
.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

// User
userRouter
.route('/')
.get(getAllUsers)
.post(createUser);

userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);


app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/user',userRouter);


const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});