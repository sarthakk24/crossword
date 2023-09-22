import { Router } from 'express'
import healthCheckRoute from './healthcheck'
import crosswordRoutes from './crossword/routes'

export default (): Router => {
    const app = Router()
    //TODO: add routes here...
    app.use('/health', healthCheckRoute)
    app.use('/crossword', crosswordRoutes)
    return app
}
