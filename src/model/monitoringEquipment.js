const mysql = require('mysql2/promise');

/**
 * 创建数据库连接函数
 * @returns
 */
async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'graduationproject',
  });
  return connection;
}

/**
 * 查询所有设备信息
 * @returns
 */
async function selectMonitoringEquipment() {
  const connection = await createConnection();
  const [results] = await connection.query('SELECT * FROM `monitoring_equipment`');
  connection.end();
  return results;
}

/**
 * 新增监控设备信息
 * @param {*} moniEquip
 * @returns
 */
async function creatMonitoringEquipment(moniEquip) {
  const connection = await createConnection();
  const sql =
    'INSERT INTO `monitoring_equipment` (id, type, name, time, ip, rules, location, sn) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    moniEquip.id,
    moniEquip.type,
    moniEquip.name,
    moniEquip.time,
    moniEquip.ip,
    moniEquip.rules,
    moniEquip.location,
    moniEquip.sn,
  ];
  await connection.query(sql, values);
  connection.end();
}

/**
 * 根据设备id更新设备规则
 * @param {*} id
 * @param {*} rules
 */
async function updateMonitoringEquipmentRulesById(id, rules) {
  const connection = await createConnection();
  const sql = 'UPDATE `monitoring_equipment` SET rules = ? WHERE id = ?';
  const values = [rules, id];
  await connection.query(sql, values);
  connection.end();
}

exports.selectMonitoringEquipment = selectMonitoringEquipment;
exports.creatMonitoringEquipment = creatMonitoringEquipment;
exports.updateMonitoringEquipmentRulesById = updateMonitoringEquipmentRulesById;
