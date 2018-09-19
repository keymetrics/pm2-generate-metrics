
var sin = 0

module.exports = {
  sinus() {
    if (!this.sin)
      this.sin = 0

    return Math.floor(Math.cos(this.sin++) * 100) / 10
  }
}
