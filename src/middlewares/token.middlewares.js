const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.tokenValidation = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(401).json({message: 'Unauthorized'});
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if(!user) return res.status(401).json({message: 'Unauthorized'});

        req.user = user;
        next();
    }catch(e){
        return res.status(401).json({message: 'Unauthorized'});
    }
};