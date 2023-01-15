const mysql = require('mysql2')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createTokens2, validateToken2 } = require('../jwtTokens/jwtPerson');
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'aman',
    database: 'bloodapp'

})

const RegisterP = (req,res)=>{
    console.log('enter in registerP');
    // in the register form first put the persons location by using next button navigate for more info
    let hashpassword, loc_id;
    let loc_ids =  new Array();
    const {cnic, password, fname, lname, blood_group, weight, frequencyDonation, IsDiabetes, IsHypetitus, contactno,  postalCode, Area, Block, City} = req.body
    // if empty value passed
    if(!cnic){
        // error handling 
        console.log('error');
    }
    //1
    db.query('select loc_id from personlocation where postalCode = ? AND Area = ? AND Block = ? AND City = ?', [postalCode, Area, Block, City], (err, results)=>{
     if(err){
            res.json({error: err})
        }if(results.length > 0 || results.length === 0){
            
            if(results.length > 0){
                loc_ids[results.length -1];
                for(let i=0;i<results.length; i++){
                    loc_ids[i] = results[i].loc_id;
                }
            }


            //2
            db.query('insert into personlocation(postalCode, Area, Block, City) values (?,?,?,?)', [postalCode, Area, Block, City], (err, results)=>{
                if (err) {
            return res.json({error:err})
        }else{
            
            console.log('data inserted in a personlocation');
           //3
            db.query('select loc_id from personlocation where postalCode = ? AND Area = ? AND Block = ? AND City = ?', [postalCode, Area,Block, City], (err, results)=>{
                if(err){
                    res.json({error:err})
                }
                if(results.length > 0){
                    loc_ids[results.length-1] = '0'
                    for(let i=0; i<results.length; i++){
                        if(loc_ids[i] != results[i].loc_id){
                            loc_id  =results[i].loc_id
                        }
                    }
                  //loc id print
                }
                if(results.length === 0){
                    loc_id = results[0].loc_id
                }
                if(results.length === 0 || results.length >0){
                    //4
                db.query('select cnic from person where cnic = ?', [cnic], async (err, results)=>{
                    if(err){

                        return res.json({error:err})
                    }if(results.length > 0){
                        // do error handling 
                        //7
                        db.query('delete from personlocation where loc_id = ?', [loc_id], (err,results)=>{
                            if(err){
                                return res.json({error:err})
                            }else{
                                console.log('data deleted in personlocation');
                                res.json({error: 'cnic is already taken'})
                            }
                        })
                    }if(results.length === 0){
                        hashpassword = await bcrypt.hash(password, 8);
                       //5
                       db.query('insert into person (cnic, password, fname , lname , blood_group, weight, frequencyDonation, IsDiabetes, IsHypetitus, loc_id) values (?,?,?,?,?,?,?,?,?,?)', [cnic, hashpassword, fname, lname, blood_group, weight, frequencyDonation, IsDiabetes, IsHypetitus, loc_id], (err, result) => {
                       
                        if (err) {
                           return res.json({error:err})
                        } else {
                            console.log('data is inserted in a person');

                            //6
                            db.query('select Cnic, contactno from personcontactdetails where Cnic = ? AND contactno = ?', [cnic, contactno], (err, result) => {

                                if(err){
                                    return res.json({error:err})
                                }if(results.length > 0){
                                    // do error handling
                                    db.query('delete from person where cnic = ? ', [cnic], (err, results)=>{
                                        if(err){
                                            return res.json({error:err})
                                        }else{
                                            console.log('data is deleted from person');
                                        }
                                    }) 
                                }if(results.length === 0){
                                    db.query('insert into personcontactdetails (Cnic, contactno) value (?,?) ', [cnic, contactno], (err, results) => {
                                        if(err){
                                    return res.json({error:err}) 
                                        }else{
                                            console.log('data inserted in personcontact');
                                             return   res.json('person registered')
                                        }

                                    })
                                }
                            })
                            
                        }
                    })
                    
                    }
                }) //4
    


                }
            }) //3
        } //else ends 
     }) //2
    } //if ends 

    }) //1-main personloca query ends

}

const LoginP = (req, res)=>{
    const {cnic, password} = req.body
    if(!cnic || !password){
        // error handling
    }
    else{
        const loginquery = 'select cnic, password from person where cnic = ? ';
        db.query(loginquery, [cnic], (err, results)=>{
            if(results.length===0){
                res.json({error: 'There is no person with this cnic exist'})
            }else{
                let length = results.length-1
                const dbPassword = results[length].password
                bcrypt.compare(password,dbPassword).then((match)=>{
                    if(!match){
                     res.json({error: 'wrong cnic and password combination entered, Please reneter it'})
                    }else{
                        let accessToken = createTokens2(results, length)
                        // res.cookie('access-token2', accessToken, {
                        //     maxAge : 60*60*24*30*1000
                        // })
                        res.json(accessToken)
                    }
                })

            }
        })
    }
}

module.exports = {
    RegisterP,
    LoginP,
}