module.exports = (functio) => (req,res,next) => {
    Promise.resolve(functio(req,res,next)).catch(next)
} 

