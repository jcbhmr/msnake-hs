import * as express from 'express'

export const router = express.Router()
export const name = 'snake'

const root = __dirname + '/../../../'

router.get('/', (req, res) => res.sendFile('source/client/index.html', { root }))
router.get('/js', (req, res) => res.sendFile('build/client/bundle.min.js', { root }))
router.get('/icon', (req, res) => res.sendFile('source/client/icon.png', { root }))
