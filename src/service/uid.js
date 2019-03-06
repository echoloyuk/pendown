let i = 0;

module.exports = {
  createUid: () => {
    return `${new Date().getTime()}_${i++}`
  }
}