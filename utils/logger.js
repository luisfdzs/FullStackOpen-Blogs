const info = (...params) => console.log(...params)
const error = (...params) => console.error(...params)
const requestLogger = (request, response, next) => {
    const {method, url, body} = request
    const log = method === 'GET' || method === 'DELETE'
        ? `New request detected: ${method} request to ${url}`
        : `New request detected: ${method} request to ${url}, body of the request: ${JSON.stringify(body)}`
    info(log)
    next()
}
module.exports = {info, error, requestLogger}