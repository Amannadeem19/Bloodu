const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {createTokens, validateToken} = require('../jwtTokens/jwt')
const {StatusCodes} = require('http-status-codes')
// const e = require('express')
// const {BadRequestError, UnauthenticatedError} = require('../errors');


const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'aman',
    database: 'bloodapp'

})


// logic behind 
// 1st time user have to add the details of main blood bank 
// then web give the option to add more blood bank locations 
const Register = async (req, res)=>{


    const {BankName, password, openingTimings, closingTimings, contactNo_1, contactNo_2, plotno, block, street, area, city, manager_fname, manager_lname} = req.body;  
   
    let hashpassword;
    // table 1 blood bank query 
     db.query('Select BankName from bloodbank where BankName = ?', [BankName], async (err, results)=>{
        if(err){
            
            res.send().json({error: err})
        }
        if (results.length > 0){
            res.json({error:"bank name already exist"})
            // will do error handling 

            // return res.render('register', {
            //     message : 'that blood bank is already in use, choose another'
            // })
            // res.send('The blood bank name is already in use')

        }
        if(results.length ===0){
            console.log('true1');
            hashpassword =  await bcrypt.hash(password, 8) // 8 is number of round the encryption is done 
         console.log(hashpassword);
         db.query('Insert into bloodbank (BankName, password, openingTimings, closingTimings) values(?, ?, ?, ?) ', [ BankName, hashpassword, openingTimings, closingTimings ], (error, results)=>{

            if(error){
                res.status(400).json({error: error})
            }else{
                // res.status(StatusCodes.OK);
                console.log(results);
                console.log("data inserted in bloodbank");

                // location data insertion 
                db.query('select Plot , Block, Street from bloodbanklocation where Plot = ? AND Block = ? AND Street = ?', [plotno, block, street],  (err, results)=>{
                    if(err){
                        res.send().json({error: err})
                    }
                    if(results.length > 0){
                        // will do error handling
                        //delete the bloodbank 
                        db.query('delete from bloodbank where BankName = ?', [BankName], (err, results)=>{
                            if(err){
                                res.json({error: err})
                            }
                            else{
                                console.log('deleted the bloodbank row');
                            }
                        }) 
                    }
                    if(results.length === 0){
                        console.log("true2");
                    
                    // location insertion
                    db.query('Insert into bloodbanklocation (Plot, Block, Street, Area, City, Manager_fname, Manager_lname, BankName) values (?, ?, ?, ?, ?, ?, ?, ?) ', [plotno, block, street, area, city, manager_fname, manager_lname, BankName], async (err, results)=>{
                
                    if(err){
                        res.json({error: err})
                    }else{
                        // res.status(StatusCodes.OK)
                        console.log("data inserted in location");
                        //contacts data insertion 

                        db.query('select contactno, bankName  from  bloodbankcontactdetails where contactno = ? AND bankName = ? ', [contactNo_1, BankName],  (err, results)=>{
                            if(err){
                                res.send().json({error: err})
                            }
                            if(results.length > 0){
                                // will do error handling 
                                // delete the blood bank row 
                                db.query('delete from bloodbank where BankName = ?', [BankName], (err, results)=>{
                                    if(err){
                                        res.json({error: err})
                                    }
                                    else{
                                        console.log('deleted the bloodbank row');
                                    }
                                })
                                // delete the blood bank location 
                                db.query('delete from bloodbanklocation where Plot = ? AND Block = ? AND Street = ? ', [plotno, block, street], (err, results)=>{
                                    if(err){
                                        res.json({error: err})
                                    }else{
                                        console.log('deleted location row');
                                    }
                                })
                            }
                            if(results.length === 0){
                                // add contact no_1 
                                db.query('Insert into bloodbankcontactdetails (contactno, bankName) values (?, ?) ', [contactNo_1, BankName], async (err, results)=>{
                        
                                    if(err){
                                        res.json({error: err})
                                    }else{
                            
                                        // res.status(StatusCodes.OK)
                                        console.log("data inserted in contactdetails");
                                    }
                                })
                    
                                //add contact no_2
                                 db.query('select contactno, bankName from bloodbankcontactdetails where contactno = ? AND bankName = ? ', [contactNo_2, BankName],  (err, results)=>{
                                    if(err){
                                        res.json({error: err})
                                    }
                                    if(results.length > 0){
                                        // will do error handling 
                                        // delete the blood bank row 
                                db.query('delete from bloodbank where BankName = ?', [BankName], (err, results)=>{
                                    if(err){
                                        res.json({error: err})
                                    }
                                    else{
                                        console.log('deleted the bloodbank row');
                                    }
                                })
                                // delete the blood bank location 
                                db.query('delete from bloodbanklocation where Plot = ? AND Block = ? AND Street = ? ', [plotno, block, street], (err, results)=>{
                                    if(err){
                                        res.json({error: err})
                                    }else{
                                        console.log('deleted location row');
                                    }
                                })
                                db.query('delete from bloodbankcontactdetails where contactno = ? AND bankName = ? ', [contactNo_1, BankName], (err, results)=>{

                                    if(err){
                                        res.json({error: err})
                                    }else{
                                        console.log('contact 1 deleted');
                                    }
                                })
                                }
                                if(results.length === 0){
                                     console.log("true3");
                                     
                                    db.query('Insert into bloodbankcontactdetails (contactno, bankName) values (?, ?) ', [contactNo_2, BankName], async (err, results)=>{
                                    
                                        if(err){
                                            res.json({error: err})
                                        }else{
                                            res.json('added in all tables of a bloodbank')
                                            console.log("inserted in contact2");
                                
                                        }
                                    })
                                
                                    }                        
                    
                                })
                    
                            }
                    
                        })
                    
                    }
                    })
                
                    }
            
                })
            
                
                
            }
        })
        }
    })
    // res.status(StatusCodes.OK).json('Successfully registered')

}
const Login = async (req, res)=>{
    const {BankName, password} = req.body;
    if(!BankName || !password){
        // will do error handling 
    }
    
    const loginquery = "select * from bloodbank where BankName = ?";
   
    db.query(loginquery, [BankName], (err, results)=>{
        
        if(results.length === 0){
            res
            .json({error: 'Blood Bank does not exist'})


        }else{
            let length = results.length-1;
            const dbPassword = results[length].password;
            bcrypt.compare(password, dbPassword).then((match)=>{
                if(!match){
                    res
                    .json({error: 'Wrong username or password combination'})
                }else{
                   
                    const accessToken = createTokens(results, length)
                    // res.cookie("accessToken", accessToken, {
                    //     maxAge: 60*60*24*30*1000,
                    // })
                    res.status(StatusCodes.OK).json(accessToken)

                }


            })
        // console.log(results[length].password);
            
        }

    }) 

}



module.exports = {
    Register, Login,
}