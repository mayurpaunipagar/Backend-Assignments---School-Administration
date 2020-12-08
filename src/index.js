const express = require('express')
const app = express()
app.use(express.json());
const studentArray = require('./InitialData.js');
let idCount=studentArray.length;
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
// app.delete('/api/student/:id',(req,res)=>{
//     if(typeof req.params.id!=='number' && req.params.id<=studentArray.length && req.params.id>0){
//         studentArray.splice(req.params.id-1,1);
//         console.log(studentArray);
//         res.sendStatus(200);
//     }else{
//         console.log(studentArray);
//         res.sendStatus(404);
//     }
// });
app.post('/api/student', (req, res) => {
    res.set( 'content-type', 'application/x-www-form-urlencoded' );
    if (req.body.name && req.body.currentClass && req.body.division) {
        idCount++;
        const id = idCount;
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
    } else {
        res.sendStatus(400);
        
    }
});
// app.put('/api/student/:id',(req,res)=>{
//     res.set( 'content-type', 'application/x-www-form-urlencoded' );
//     if(typeof Number(req.params.id)==='number' && req.params.id<=studentArray.length && req.params.id>0){
//         const name=req.body.name;
//         studentArray[req.params.id].name=name;
//         res.sendStatus(200);
//     }else{
//         res.sendStatus(400);
//     }
// });
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   