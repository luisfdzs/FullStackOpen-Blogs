const {info} = require('./logger')

const notFound = (request, response) => {
    info('Returned 404 Page Not Found')
    response.status(404).json({
        error: 'Page Not Found',
        message: 'Sorry, the page you are looking for does not exist.'
    })
}

const handleError = (error, request, response, next) => {
    const {name, message} = error
    switch (name) {
        case 'ValidationError':
            info('Returned 400 Validation Error')
            return response.status(400).json({
                error: 'Validation Error',
                message: `There are validation errors with your request. ${message}`
            })
        case 'CastError':
            info('Returned 400 Item not found')
            return response.status(400).json({
                error: 'Not Found',
                message: `Item not found. ${message}`
            })
        default:
            info('Returned 500 Internal Server Error')
            response.status(500).json({
                error: 'Internal Server Error',
                message: `An unexpected error occurred. ${message}`
            })
    }
}

module.exports = {notFound, handleError}