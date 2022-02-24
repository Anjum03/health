const express = require('express');
const app = express();
const port = process.env.PORT || 2500;
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { mainModule } = require('process');
main().catch(err => console.log(err));
async function main(){
    await mongoose.connect('mongodb://localhost:27017/contactecom');
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params);
});

app.get('/tips',(req,res)=>{
    const params = {}
    res.status(200).render('tips.pug', params);
});

app.get('/advice',(req,res)=>{
    const params = {}
    res.status(200).render('advice.pug', params);
});

app.get('/receips', (req,res)=>{
    const params = {}
    res.status(200).render('receips.pug', params);
});

app.get('/about', (req,res)=>{
    const params = {}
    res.status(200).render('about.pug',params);
});

app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact',(req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been save in database.")
    }).catch(()=>{
        res.status(400).send("Item has not been save to the database")
    })
    
})


app.listen(port,() => {
        console.log(`Application was started sucessfully on port ${port}`);
});


