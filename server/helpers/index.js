// =====================================================================
// HELPERS                                                             =
// =====================================================================
function toUTC(ts = null) {
  let nowUTC = ts ? new Date(ts).toISOString() : new Date().toISOString()
  return new Date(nowUTC)
}

module.exports = { toUTC }
