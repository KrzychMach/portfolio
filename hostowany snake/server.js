const express = require('express');
const res = require('express/lib/response');
const app = express();

//Rendering HTML
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('views/static'));

app.get('/', (req, res) => {
    res.render('index.html');
    console.log('Wyrenderowany snejk');
});


app.listen(8080);
