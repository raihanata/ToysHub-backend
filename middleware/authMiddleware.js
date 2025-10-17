import jwt from  "jsonwebtoken"
function verifyToken(req, res, next) {
   const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; 
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error, 'errr')
        return res.status(401).json({ error: "Invalid token" });
    }
 };
 
export default verifyToken;
