const mysql = require('mysql2');
const {StatusCodes} = require('http-status-codes');
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'aman',
    database: 'bloodapp'

})

const CountDonations = (req, res)=>{

    db.query('select bloodneedrequirement.req_id, bloodneedrequirement.Qtyneed, bloodneedrequirement.bloodGroup, count(recorddonation.cnic) as Given from recorddonation, bloodneedrequirement  where recorddonation.req_id = bloodneedrequirement.req_id Group by (bloodneedrequirement.req_id)', (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            return res.send(results)
        }
    } )
}
const updateFulfilled = (req, res)=>{
    const c = 'completed'

    db.query('update fullfilleddonation f join bloodneedrequirement b on f.req_id = b.req_id join recorddonation r on b.req_id = r.req_id set status = ? where b.Qtyneed In ( select  count(recorddonation.cnic)   from recorddonation, bloodneedrequirement where recorddonation.req_id = bloodneedrequirement.req_id  group  by (bloodneedrequirement.req_id) ) ', [c],(err, results)=>{

        if(err){
            return res.json({error:err})
        }else{
            res.json('updated')
        }
    } )
}

const getStatus = (req, res)=>{
    const req_id = req.params.id;
    console.log(req_id);
    db.query('select status from fullfilleddonation where req_id = ?',[req_id], (err, results)=>{
        if(err){
            return res.json({error:err})
        }else{
            console.log('status me aya');
            return res.send(results)
        }
    })
}


module.exports ={CountDonations, updateFulfilled, getStatus}