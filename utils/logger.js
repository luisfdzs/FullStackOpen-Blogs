const info = (...params) => console.log(...params)
const error = (...params) => console.error(...params)
const requestLogger = (request, response, next) => {
    const {method, url, body} = request
    info(`New request detected:
    - Method: ${method}
    - Url: ${url}
    - body: ${JSON.stringify(body)}`)
    next()
}
module.exports = {info, error, requestLogger}