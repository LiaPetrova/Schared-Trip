const { hasUser } = require('../middlewares/guards');
const { createTrip, getAll, getById, joinTrip } = require('../services/tripService');
const { parseError } = require('../util/parser');

const tripController = require('express').Router();

tripController.get('/catalog', async (req, res) => {
    const trips = await getAll();

    res.render('catalog', {
        title: 'Shared Trips Catalog',
        trips
    });
});

tripController.get('/:id/details', async (req, res) => {
    const trip = await getById(req.params.id);

    if(trip.buddies.length > 0) {
        trip.buddies = trip.buddies.join(', ')
    }

    if(trip.owner._id.toString() == req.user._id.toString()) {
        trip.isOwner = true;
    }

    if(trip.seats > 0) {
        trip.isNotFull = true;
    }

    if(trip.buddies.includes(req.user.email)) {
        trip.hasJoined = true;
    }

    res.render('details', {
        title: 'View Trip Page',
        trip,
        user: req.user
    });
});

tripController.get('/:id/join', async (req, res) => {
    const trip = await getById(req.params.id);

    try {
        if(trip.buddies.includes(req.user.email)) {
            trip.hasJoined = true;
            throw new Error ('You have already joined this trip and cannot join it twice');
        }

        
        if(trip.owner._id.toString() == req.user._id.toString()) {
            trip.isOwner = true;
            throw new Error ('You cannot join your own trip')
        }
    
        await joinTrip(req.params.id, req.user.email);
        console.log(req.user.email);
        res.redirect(`/trip/${req.params.id}/details`);

    } catch (error) {
        console.log(error);
        if(trip.buddies.length > 0) {
            trip.buddies = trip.buddies.join(', ')
        }
    
        if(trip.seats > 0) {
            trip.isNotFull = true;
        }

        res.render('details', {
            title: 'View Trip Page',
            trip,
            user: req.user,
            errors: parseError(error)
        });
    }
    
});

tripController.get('/create', hasUser(), (req, res)=> {
    res.render('create', {
        title: 'Create Trip'
    });
});

tripController.post('/create', hasUser(), async (req, res) => {

    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        imageUrl: req.body.imageUrl,
        carBrand: req.body.carBrand,
        seats: req.body.seats,
        price: Number(req.body.price),
        description: req.body.description
    };

    trip.owner = req.user._id;
    
    try {
        if (Object.values(trip).some(v => v == '')) {
            
            throw new Error ('All fields are required');
        }
        await createTrip(trip, req.user._id);
        res.redirect('/');

    } catch (error) {
        res.render('create', {
            title: 'Create Trip',
            body: req.body,
            errors: parseError(error)
        });
    }
});

module.exports = tripController;