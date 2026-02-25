const express = require('express');

const service = require('./servicio.service');
const { asyncHandler } = require('../../utils/async-handler');
const { parsePositiveId } = require('../../utils/validation');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const items = await service.listServicios();
    res.status(200).json(items);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parsePositiveId(req.params.id);
    const item = await service.getServicioById(id);
    res.status(200).json(item);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const item = await service.createServicio(req.body);
    res.status(201).json(item);
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parsePositiveId(req.params.id);
    const item = await service.updateServicio(id, req.body);
    res.status(200).json(item);
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = parsePositiveId(req.params.id);
    await service.removeServicio(id);
    res.status(204).send();
  })
);

module.exports = router;
