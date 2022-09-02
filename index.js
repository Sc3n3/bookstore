import './config.js'
import router from './router.js'

router.listen(process.env.APP_PORT, () => {
	console.log('Listening on port: '+ process.env.APP_PORT)
})