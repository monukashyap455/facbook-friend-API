
    module.exports.errorResponse = (msg) => {
        data = {
            status: 403,
            msg: msg
        }
        return data;
    },
 
    module.exports.pageNotFound = ()=>{
        data = {
            status: 404,
            msg: "Page Not Found"
        }
        return data
    }
    module.exports.customError = (msg ,status = 403)=>{
        data = {
            status: status || 403,
            msg: msg
        }
        return data
    }

    module.exports.successResponse = (res, msg) => {
        data = {
            status: 200,
            message: msg
        }
        return res.status(data.status).json(data)
    },
    
        module.exports.successDataResponse = (res, msg, token) => {
            data = {
                status: 200,
                message: msg,
                token: token
            }
             res.status(data.status).json(data)
        }
       
    

