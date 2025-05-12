const { selectMonitoringEquipment } = require('../model/monitoringEquipment');

/**
 * 查询所有监控设备信息
 * @param {*} req
 * @param {*} res
 */
const getMonitoringEquipment = async (req, res) => {
  const moniEquipList = await selectMonitoringEquipment();
  res.json(moniEquipList);
};

exports.getMonitoringEquipment = getMonitoringEquipment;
