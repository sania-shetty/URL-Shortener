const jwt = require("jsonwebtoken");
const secret = "Sania2345@#"

function setUser(user){
    return jwt.sign({
        _id : user._id,
        email: user._id,
        role: user.role,
}, secret);
}

function getUser(token){
    if (!token) return null;
    try{
    return jwt.verify(token, secret);
    }catch(error){
        return null;
    }
}
//const sessionIdtoUserMap= new Map();

// function setUser(id, user){
//     sessionIdtoUserMap.set(id, user);
// }
// function getUser(id){
//     return sessionIdtoUserMap.get(id);
// }
module.exports = {
    setUser,
    getUser,
};