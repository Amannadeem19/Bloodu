const {sign, verify} = require('jsonwebtoken');

const createTokens2 = (person,length)=>{
   const accessToken2 = sign({cnic : person[length].cnic}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
   })
   return accessToken2;
}

   


// user for the methods to go ahead 
const validateToken2 = (req, res, next)=>{
    const accessToken = req.header("accessToken2");
    if(!accessToken){
        console.log('user not authenticated2');
        return res.json({error: 'User Not authenticated'})
    }
    else{
        try{
            const validToken = verify(accessToken, process.env.JWT_SECRET)
            req.user = validToken
            if(validToken){
                // req.authenticated = true;
                return next()
            }

        }catch(err){
                return res.json({error: err})
        }
    }
}

module.exports = {
    createTokens2, validateToken2 
}