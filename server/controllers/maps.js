const express = require('express');

const db = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  /* queries to /maps api go through here first */
  next();
});

router.get('/', (req, res) => {
  res.send('Maps home route');
});

router.get('/allpoints', (req, res) => {
  db.any('SELECT lon, lat, reporttype, groupharassed, locationname, verified, featureid, sourceurl FROM hcmdata')
    .then((mapdata) => {
      res.status(200)
        .json({
          status: 'success',
          mapdata,
        });
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
});

module.exports = router;
