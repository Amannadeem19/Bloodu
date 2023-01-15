const mysql = require('mysql2');
const {StatusCodes} = require('http-status-codes');
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'aman',
    database: 'bloodapp'

})

const bankInfo = (req,res)=>{
    // console.log(req.params.id);
    const bankName= req.params.id;
    console.log(bankName);
    db.query('select openingTimings, closingTimings from bloodbank where bankName = ? ', [bankName], (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            return res.send(results)
        }
    })
}
const bankloc = (req,res)=>{
    // console.log(req.params.id);
    const bankName= req.params.id;
    console.log(bankName);
    db.query('select * from bloodbanklocation where bankName = ? ', [bankName], (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            return res.send(results)
        }
    })
}
const bankcontact = (req,res)=>{
    // console.log(req.params.id);
    console.log('bank contact');
    const bankName= req.params.id;
    console.log(bankName);
    db.query('select contactno from bloodbankcontactdetails where bankName = ? ', [bankName], (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            return res.send(results)
        }
    })
}
module.exports = {bankInfo, bankloc, bankcontact}