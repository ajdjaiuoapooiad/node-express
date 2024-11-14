const fs = require('fs');


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
)


exports.checkID = (req,res,next,val) => {
    console.log(`Tour id ; ${val}`);
    

    if (req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'error'
        });
    }
    next();
};

exports.checkBody = (req,res,next) => {
    if (!req.body.name || !req.body.price){
        return res.status(404).json({
            status: 'fail',
            message: 'missing name'
        });
    }
    next();
};



exports.getAllTours = (req,res) => {
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



exports.getTour = (req,res) => {
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





exports.createTour = (req,res) => {
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




exports.updateTour = (req,res) => {
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



exports.deleteTour = (req,res) => {
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
