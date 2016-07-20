import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as engines from 'consolidate';
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import * as helpers from './helpers';

const app = express();
const User = require('./db').User;

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

app.use('/profilepics', express.static('images'));
app.use(bodyParser.urlencoded({ extended:true }));

app.get('/favicon.ico', function (req, res) {
  res.end();
});

app.get('/', (req, res) => {
  User.find({}, (err, users) => {
      res.render('index', {users: users});
  });
});

app.get('*.json', (req, res) => {
    const bits = _.split(req.params[0], '.json');
    const username = bits[0].substring(1);

    User.findOne().lean().exec({username: username}, (err, user) => {
        helpers.saveUser(username, user);
        res.download('./dist/users/' + req.path);
    });
});

app.get('/data/:username', (req, res) =>{
    const username = req.params.username;
    User.findOne().lean().exec({username: username}, (err, user) => {
        res.end(JSON.stringify(user));
    });
});

app.get('/users/by/:gender', (req, res) => {
    const gender = req.params.gender;
    User.find().lean().exec({gender:gender}, (err, users) => {
        res.end(JSON.stringify(users));
    });
});

app.get('/error/:username', (req, res) => {
    res.status(404).send('No user named ' + req.params.username + " found!");
});

const usernameRouter = require('./username');
app.use('/:username', usernameRouter);

const server = app.listen(3000,  () => {
    console.log('server running at http://localhost:' + server.address().port);
});