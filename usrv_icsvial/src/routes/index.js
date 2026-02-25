const express = require('express');

const servicioRoutes = require('../modules/servicio/servicio.routes');
const clienteRoutes = require('../modules/cliente/cliente.routes');
const blogRoutes = require('../modules/blog/blog.routes');
const dbAdminRoutes = require('../modules/db-admin/db-admin.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use('/servicios', servicioRoutes);
router.use('/clientes', clienteRoutes);
router.use('/blogs', blogRoutes);
router.use('/db', dbAdminRoutes);

module.exports = router;
