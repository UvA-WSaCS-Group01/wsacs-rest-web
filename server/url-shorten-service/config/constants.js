module.exports = {
    PORT: process.env.PORT ? process.env.PORT : "8082",
    WINDOW_LOCATION_ORIGIN: process.env.HOSTNAME ? `http://${process.env.HOSTNAME}` : "http://localhost",
}
