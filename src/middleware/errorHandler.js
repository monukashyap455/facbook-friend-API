

module.exports = (err, req, res, next) => {
    let data = {
        status: err.status,
        message: err.msg,
    }
    res.status(data.status).json(data);
}