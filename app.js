var express = require('express');
var _ = require('./underscore');//do it with npm

var app = express();
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);


var contactsList = [];

app.get('/', function(req, res){
  res.send('contact service : root');
});

app.get('/contacts', function(req, res){
  res.send(contactsList);
});

app.post('/contact', function(req, res){
  var contact = {};
  if (req.body.name) {
    contact.name = req.body.name;
  }
  if (req.body.phoneNo) {
    contact.phoneNo = req.body.phoneNo;
  }
  var existingContact = _.findWhere(contactsList, {name: contact.name});

  if(existingContact){
    res.send('contact present already');
  }
  else{
    contactsList.push(contact);
    res.send('contact added successfully');
  }
});

app.delete('/contact', function(req, res){
  if(req.body.name){

    var contactDeleted = req.body.name,
      existingContact = _.findWhere(contactsList, {name: contactDeleted});

    if(existingContact){
      contactsList = _.reject(contactsList, function(contact){ return contact.name === contactDeleted});
      res.send('contact deleted successfully');

    }
    else{
      res.send('contact not found :' + req.body.name);
    }
  }
  else{
    res.send('please send name of contact to be deleted');
  }
});

app.put('/contact', function(req, res){
  if(req.body.name){

    var contactUpdated = req.body.name,
      existingContact = _.findWhere(contactsList, {name: contactUpdated});

    if(existingContact){
      contactsList = _.reject(contactsList, function(contact){ return contact.name === contactUpdated});
      contactsList.push(req.body);
      res.send('contact updated successfully');

    }
    else{
      res.send('contact not found :' + req.body.name);
    }
  }
  else{
    res.send('please send name of contact to be deleted');
  }
});



app.listen(3027, function(){
  console.log('server is running on port : ' + 3027);
});
