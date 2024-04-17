const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    let Token = req.headers['token']
    jwt.verify(Token,"SecretKey12345",function(e,decoded){
        if(e){
            res.status(401).json({status:"unauthorized"})
        }
        else{
            //get email  from decoded
            let email=decoded['data'];
            req.headers.email=email;
            
            next();
        }
    })
}
