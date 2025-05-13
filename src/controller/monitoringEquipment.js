const curUnixDate = require('../service/share/curUnixDate');
const {
  selectMonitoringEquipment,
  creatMonitoringEquipment,
  updateMonitoringEquipmentRulesById,
} = require('../model/monitoringEquipment');

/**
 * 查询所有监控设备信息
 * @param {*} req
 * @param {*} res
 */
async function getMonitoringEquipment(req, res) {
  const moniEquipList = await selectMonitoringEquipment();
  res.json(moniEquipList);
}

/**
 * 新增监控设备信息
 * @param {*} req
 * @param {*} res
 */
async function addMonitoringEquipment(req, res) {
  const id = curUnixDate();
  const type = req.body.type;
  const name = req.body.name;
  const time = curUnixDate();
  const ip = req.body.ip;
  const rules = req.body.rules ?? {};
  const location = req.body.location;
  const sn = req.body.sn ?? '';
  await creatMonitoringEquipment({
    id,
    type,
    name,
    time,
    ip,
    rules: JSON.stringify(rules),
    location,
    sn,
  });
  res.json({
    code: 200,
    message: '添加成功',
  });
}

/**
 * 更该设备规则
 * @param {*} req
 * @param {*} res
 */
async function updateMonitoringEquipmentRules(req, res) {
  const id = req.body.id;
  const rules = JSON.stringify(req.body.rules);
  await updateMonitoringEquipmentRulesById(id, rules);
  res.json({
    code: 200,
    message: '修改成功',
    data: { id, rules },
  });
}

exports.getMonitoringEquipment = getMonitoringEquipment;
exports.addMonitoringEquipment = addMonitoringEquipment;
exports.updateMonitoringEquipmentRules = updateMonitoringEquipmentRules;
