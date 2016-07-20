import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

export function getUserFilePath (username) {
  return path.join(__dirname, 'users', username) + '.json';
};

export function getUser (username) {
  var user = JSON.parse(fs.readFileSync(getUserFilePath(username), {encoding: 'utf8'}));
  user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
  _.keys(user.location).forEach(function (key) {
      user.location[key] = _.startCase(user.location[key]);
  });
  return user;
};

export function saveUser (username, data) {
  var fp = getUserFilePath(username);
  fs.unlinkSync(fp); // delete the file
  fs.writeFileSync(fp, JSON.stringify(data, null, 2), {encoding: 'utf8'});
};

export function verifyUser (req, res, next) {
    const fp = getUserFilePath(req.params.username);
    fs.exists(fp, yes => {
        if(yes) next();
        else res.redirect('/error/' + req.params.username);
    });
};