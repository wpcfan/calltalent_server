import * as express from 'express';
import * as fs from 'fs';
import * as helpers from './helpers';

const User = require('./db').User;

const router = express.Router({
    mergeParams: true
});

router.all('/', (req, res, next) => {
    console.log(req.method, ' for ', req.params.username);
    next();
});

router.get('/', (req, res) => {
    const username = req.params.username;

    User.findOne({username:username}, (err, user) => {
        res.render('user', {
            user: user,
            address: user.location
        });
    });
});

router.put('/', (req, res) => {
    const username = req.params.username;
    User.findOne({ username:username },  (err, user) => {
        user.location = req.body.location;
        user.name.full = req.body.name;
        user.save(() => {
            res.end();
        });
    });
});

router.delete('/', (req, res) => {
    const username = req.params.username;
    User.remove({username:username}, err => {
        if(!err)
            res.sendStatus(200);
        else
            console.log("unable to delete the document with username: " + username);
    });
});

module.exports = router;