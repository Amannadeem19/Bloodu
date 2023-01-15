const {sign, verify} = require('jsonwebtoken');

const createTokens = (bloodbank, length)=>{
   const accessToken = sign ({BankName : bloodbank[length].BankName}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
});

    return accessToken;

};

const validateToken = (req, res, next)=>{
    const accessToken = req.header("accessToken");
    console.log(accessToken);
    if(!accessToken){
        console.log("user not authenticated");
        return res.json({error: 'User Not authenticated'})
    }
    else{
        try{
            const validToken = verify(accessToken, process.env.JWT_SECRET)
            req.user = validToken;
            if(validToken){
                console.log("aunthenticated user");
                // req.authenticated = true;
                return next()
            }

        }catch(err){
                return res.json({error: err})
        }
    }
}

module.exports = {
    createTokens, validateToken 
}