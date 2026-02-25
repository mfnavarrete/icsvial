const express = require('express');

const service = require('./db-admin.service');
const { asyncHandler } = require('../../utils/async-handler');

const router = express.Router();

router.delete(
  '/clear',
  asyncHandler(async (req, res) => {
    const summary = await service.clearDatabase();
    res.status(200).json({
      operation: 'clear_database',
      summary
    });
  })
);

router.delete(
  '/clear/:tableName',
  asyncHandler(async (req, res) => {
    const result = await service.clearTable(req.params.tableName);
    res.status(200).json({
      operation: 'clear_table',
      ...result
    });
  })
);

module.exports = router;
