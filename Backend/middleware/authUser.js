import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
     const { token } = req.headers;

     if(!token){
       return res.json({ success : false, message : " Unauthorized Login Again"});
     }

    //  console.log(token)

     if (!req.body) {
      req.body = {};
    }

     const token_decode = jwt.verify(token, process.env.PRIVATE_KEY);
    //  console.log(token_decode)
     req.body.userId = token_decode.id;
     next();
  } catch (error) {
     console.log(error)
        res.json({ success: false, message: error.message })
  }
}

export default authUser;