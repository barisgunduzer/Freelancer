module.exports = (adminRole) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        if(adminRole === userRole){
            next();
        }
        else {
            return res.status(401).json({
                status: "fail",
                description: `Unauthorized: ${userRole} role must be ${adminRole}`
            });
        }
    }
}