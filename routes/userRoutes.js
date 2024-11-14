const express = require('express');


const router = express.Router();




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



router
.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);



module.exports = router;
