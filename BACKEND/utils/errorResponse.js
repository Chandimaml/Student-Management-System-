//this is blueprint for error handling
class ErrorResponse extends Error{
    constructor(message , statusCode){//auth.js in controllers line 29.
        super(message);
        this.statusCode = statusCode;//constuctor pass status code and save it here.
    }
}
module.exports =ErrorResponse;