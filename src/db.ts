const mongo = require('mongoose');
const _ = require('lodash');
const uri = 'mongodb://localhost:27017/test';
mongo.connect(uri);
const db = mongo.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db connected');
});

const userSchema = mongo.Schema({
    username: String,
    gender: String,
    name: {
        title: String,
        first: String,
        last: String
    },
    location: {
        street: String,
        city: String,
        state: String,
        zip: Number
    },
    picture:{
        large: String,
        medium: String,
        thumbnail: String
    }
});

userSchema.virtual('name.full').get(function () {
    return _.startCase(this.name.first + ' ' + this.name.last);
});

userSchema.virtual('name.full').set(function(value){
    const bits = value.split(' ');
    this.name.first = bits[0];
    this.name.last = bits[1];
})

exports.User = mongo.model('User', userSchema);