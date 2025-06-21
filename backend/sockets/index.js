import { socketHandlers } from './handler/handlers.js'

const initSocket = (io) => {
    // io.use(socketAuth);
    io.on('connection', socketHandlers);
}

export default initSocket