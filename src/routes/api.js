import Express from 'express';
import Api from '../services/api'
const router = Express.Router();


router.post('/:api/*', async (req, res) => {
	try {
		const response = await Api.handleWorkFlow(req);
		return res.json(response);
	} catch (error) {
		return res.boom.badRequest('Error in registering the user', error);
	}
});

module.exports = router;


