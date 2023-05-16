const path = require('path')
const bodyParser = require('body-parser');

const express = require('express');
const app = express();

const exphbs = require('express-handlebars');

const shopRouter = require('./routes/router')


// Configuring template engine
app.engine('.hbs', exphbs.engine({ 
    extname: '.hbs', 
    layoutsDir:"views/layouts/",
    defaultLayout: "main-layout", 
}));
app.set('view engine', 'hbs');
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(shopRouter)

app.use((req, res, next)=>{
    res.status(404).send('<h1>Not Found</h1>')
})

app.listen(8000);