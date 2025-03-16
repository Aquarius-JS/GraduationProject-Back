module.exports = function curUnixDate() {
  return Math.floor(Date.now() / 1000);
};
