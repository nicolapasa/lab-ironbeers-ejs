const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  let data
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    data=beersFromApi
    //console.log('Beers from the database: ', beersFromApi)
    res.render('beers', {data});
  })
  .catch(error => console.log(error));
 
});
app.get('/random-beer', (req, res) => {

  punkAPI
  .getRandom()
  .then(beerfromApi => {
    let beer=beerfromApi
   console.log('Beers from the database: ', beerfromApi)
    res.render('random_beer', {beer: beer[0]});
  })
  .catch(error => console.log(error));
 
});
app.get('/:id', (req, res) => {
  console.dir(req.params.id)
  punkAPI
  .getBeer(req.params.id)
  .then(beerfromApi => {
    let beer=beerfromApi
   console.log('Beers from the database: ', beerfromApi)
    res.render('random_beer', {beer: beer[0]});
  })
  .catch(error => console.log(error));
 
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
