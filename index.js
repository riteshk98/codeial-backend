const port = 8000;
const express = require('express');
const app = express();
const db = require('./config/mongoose');
db();
const bodyParser = require('body-parser')
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
app.use(session({
    name:'codeial',
    secret:'blahsomething'
    ,saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },store: new MongoStore({
        // store:MongoStore.create(),
        mongoUrl:'mongodb+srv://root:root@cluster0.aako87d.mongodb.net/',
        ttl: 14 * 24 * 60 * 60
    })
}));
//mongo store is used to store session cookie in db

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);

const expressLayouts = require('express-ejs-layouts');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views','./views');
app.listen(port, function(err){
    if(err){
        console.log(`Error - ${err}`);
    }
    console.log(`Server is running on port - ${port}`);
});