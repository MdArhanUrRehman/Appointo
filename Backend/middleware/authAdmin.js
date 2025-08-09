import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        if(!atoken){
            return res.json({ success : false, message : "Not authorized Login Admin" });
        }

        const token_decode = jwt.verify(atoken, process.env.PRIVATE_KEY);
        let s = (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);
        console.log(s)
        if((process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) !== token_decode.data ){
            return res.json({ success : false, message : "Not authorized Login Admin" });
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ success : false, message : error.message});
    }
}

export default authAdmin;