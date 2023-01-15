const mysql = require('mysql2');
const {StatusCodes} = require('http-status-codes');
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'aman',
    database: 'bloodapp'

})

const Donate = (req, res)=>{
    db.query('select BankName, openingTimings, closingTimings from bloodbank',(err, result)=>{
                if(err){
                    return res.json({error: err})
                }else{
                    console.log('donate wala');
                    return res.json(result)
                }
    })
    
}
const postDonate =  (req, res) => {
    console.log('post donate me aya');
    const cnic = req.user.cnic;
    const date = new Date()
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();
    const Time = hrs + ':' + mins+ ':' +seconds; 
    console.log(Time);
    console.log(date);
    console.log(cnic);
    console.log('post');
    const{bankName, req_id, bloodGroup} = req.body;
    console.log(bankName  + " " + req_id + " " + bloodGroup);

    db.query('select * from bloodneedrequirement where req_id = ?', [req_id],(err, result) => {

        if(err){
            return res.json({error: err})
        }if(result.length ===0){
            return res.json({req_error: 'no requirementexist'})
        
        }if(result.length > 0){
            console.log('idh aya');
            db.query('insert into recorddonation (cnic, bankName, req_id, bloodGroup, Date, Time) values (?,?,?,?,?,?)', [cnic, bankName, req_id, bloodGroup, date, Time], (err, result) => {

                if(err){
                    return res.json({error: err})
                }else{
                    return res.json('successfully added')
                }
            })
        }
    })
}

const getAllDonations = (req, res) => {

    db.query('Select * from recorddonation', (err, results) => {
        if(err){
            return res.json({error:err})
        }else{
            return res.send(results)
        }
    })
}

module.exports ={ Donate, postDonate,getAllDonations}
