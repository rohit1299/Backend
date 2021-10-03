const {emailValidate,passwordValidate} = require('../utils/validate')

const registerChecks =(req,res,next)=>{
    const {email,password,confirmPassword} = req.body
    if (typeof email === 'string'&&
        typeof password ==='string'&&    
        typeof confirmPassword ==='string'&&
        email.length >0&& password.length>8&&
        confirmPassword == password&&
        emailValidate(email)&&passwordValidate(password)
    )
    {
        next();
    }else{
        res.status(401).send("Initail checks fail");

    }


}