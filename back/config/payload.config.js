function modelReturn() {
    return {
        data:null,
        success:false,
        message:""
    }
}
exports.success = (data) => {
    let r = modelReturn()
    r.success = true
    r.data = data
    return r
}

exports.error = (message) => {
    let r = modelReturn()
    r.data = null
    r.success = false
    r.message = message
    return r
}