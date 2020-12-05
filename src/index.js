const express = require('express')
const app = express()
app.use(express.json());
const studentArray = require('./InitialData.js');

const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here



app.get('/api/student', (req, res) => {
    res.send(studentArray);
});
app.get('/api/student/:id', (req, res) => {
    if (req.params.id > studentArray.length || req.params.id < 0) {
        res.sendStatus(404);
    } else {
        res.send(studentArray[req.params.id - 1]);
    }
})
app.delete('/api/student/:id',(req,res)=>{
    if(req.params.id<=studentArray.length && req.params.id>0){
        delete studentArray[req.params.id];
        res.sendStatus(200);
    }else{
        res.sendStatus(404);
    }
});
app.post('/api/student', (req, res) => {
    res.set({ 'content-type': 'application/x-www-form-urlencoded' });
    if (typeof req.body.name !== 'string'
        || typeof req.body.currentClass !== 'number'
        || typeof req.body.division !== 'string') {
            res.send(400);
    } else {
        const id = studentArray.length + 1;
        const name = req.body.name;
        const currentClass = req.body.currentClass;
        const division = req.body.division;
        studentArray.push({
            "id": id,
            "name": name,
            "currentClass": currentClass,
            "division": division
        });
        res.send({"id":id});
    }
});
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   