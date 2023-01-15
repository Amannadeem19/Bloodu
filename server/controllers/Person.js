const mysql = require('mysql2');
const {StatusCodes} = require('http-status-codes');
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'aman',
    database: 'bloodapp'

})

const getPerson = (req, res)=>{
    const cnic = req.user.cnic;
    db.query('Select * from person where cnic = ? ', [cnic], (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            console.log('person me agay');
            res.send(results)
        }
    })
}

const getPerson1 = (req, res)=>{
    // const cnic = req.user.cnic;
    const cnic = req.params.id;
    db.query('Select * from person where cnic = ? ', [cnic], (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            console.log('person me agay');
            res.send(results)
        }
    })
}
const getPersonContact = (req, res)=>{
    const cnic = req.user.cnic
    db.query('Select * from personcontactdetails where cnic = ? ', [cnic], (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            console.log('conatct me agya');
            res.send(results)
        }
    })
}
const getPersonContact1 = (req, res)=>{
    // const cnic = req.user.cnic
    const cnic = req.params.id;
    db.query('Select * from personcontactdetails where cnic = ? ', [cnic], (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            console.log('conatct me agya');
            res.send(results)
        }
    })
}
const getPersonLoc = (req, res)=>{
    const cnic = req.user.cnic
    const loc_id  = req.params.id;
    console.log(loc_id);
    db.query('Select * from personlocation where loc_id = ?', [loc_id], (err, results)=>{
        if(err){
            console.log("error of personlocation");
            return res.json({error:err})
        }else{
            console.log('loc me agya');
            res.send(results)
        }
    })
}
module.exports = {getPerson, getPersonContact, getPersonLoc, getPerson1, getPersonContact1}