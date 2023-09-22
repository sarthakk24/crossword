import { Router } from 'express'
import { handleCreate } from './controller/create.service'
import { handleSubmit } from './controller/submit.service'

const crosswordRoutes = Router()

crosswordRoutes.get('/create', handleCreate)
crosswordRoutes.post('/submit', handleSubmit)

export default crosswordRoutes
