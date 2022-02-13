function errorHandler(error,res) {
    try {
        switch (error.name) {
            case 'ValidationError':
                res.status(400).json({
                    error: error.message
                });
                break;
            default:
                res.status(500).json({
                    error: error.message
                });
    } 
    }catch(error) {
        console.log(error);
    }
}

module.exports = errorHandler;