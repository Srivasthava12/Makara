const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const status = {
        status:"Ready"
    }
    res.send(status)
});

module.exports = router;