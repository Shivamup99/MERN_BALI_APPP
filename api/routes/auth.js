import express from 'express'
import { login, register } from '../controllers/auth.js'

const route = express.Router()

route.post('/user/register',register)
route.post('/user/login',login)

export default route;