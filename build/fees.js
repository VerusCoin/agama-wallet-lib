"use strict";

var _fees;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* list of static fees confirmed to be working to push transactions
 * consider these fees as average to sign most of the transactions
 * certain transactions may require higher fees
 * btc has dynamic fees
 * fee values are in satoshis
 */
var KMD_STD_FEE = 10000; // kmd main/chips/asset chains

var fees = (_fees = {
  // btc compatible coins, fees in satoshis
  // kmd/chips/asset chains
  kmd: KMD_STD_FEE,
  chips: KMD_STD_FEE,
  zilla: KMD_STD_FEE,
  prlpay: KMD_STD_FEE,
  kv: KMD_STD_FEE,
  bntn: KMD_STD_FEE,
  eql: KMD_STD_FEE,
  oot: KMD_STD_FEE,
  coqui: KMD_STD_FEE,
  chain: KMD_STD_FEE,
  glxt: KMD_STD_FEE,
  revs: KMD_STD_FEE,
  supernet: KMD_STD_FEE,
  dex: KMD_STD_FEE,
  bots: KMD_STD_FEE,
  crypto: KMD_STD_FEE,
  dnr: KMD_STD_FEE,
  hodl: KMD_STD_FEE,
  iln: KMD_STD_FEE,
  pangea: KMD_STD_FEE,
  pgt: KMD_STD_FEE,
  bet: KMD_STD_FEE,
  mshark: KMD_STD_FEE,
  wlc: KMD_STD_FEE,
  mgw: KMD_STD_FEE,
  btch: KMD_STD_FEE,
  beer: KMD_STD_FEE,
  pizza: KMD_STD_FEE,
  ninja: KMD_STD_FEE,
  jumblr: KMD_STD_FEE,
  ccl: KMD_STD_FEE,
  vrsc: KMD_STD_FEE,
  dion: KMD_STD_FEE,
  kmdice: KMD_STD_FEE,
  ptx: KMD_STD_FEE,
  ksb: KMD_STD_FEE,
  our: KMD_STD_FEE,
  koin: KMD_STD_FEE,
  rick: KMD_STD_FEE,
  morty: KMD_STD_FEE,
  vote2019: KMD_STD_FEE,
  hush: KMD_STD_FEE,
  zexo: KMD_STD_FEE,
  labs: KMD_STD_FEE,
  dp: KMD_STD_FEE,
  wlc21: KMD_STD_FEE,
  // ext. coins
  doge: 100000000,
  via: 100000,
  vtc: 100000,
  nmc: 100000,
  mona: 100000,
  ltc: 100000,
  fair: 1000000,
  dgb: 100000,
  dash: 10000,
  crw: 10000,
  btg: 10000,
  blk: 10000,
  sib: 10000,
  bch: 10000,
  arg: 50000,
  zec: 10000
}, _defineProperty(_fees, "hush", 10000), _defineProperty(_fees, "bzc", 10000), _defineProperty(_fees, "sng", 10000), _defineProperty(_fees, "xmy", 5000), _defineProperty(_fees, "zcl", 1000), _defineProperty(_fees, "hodlc", 5000), _defineProperty(_fees, "suqa", 5000), _defineProperty(_fees, "btx", 50000), _defineProperty(_fees, "btcz", 10000), _defineProperty(_fees, "grs", 50000), _defineProperty(_fees, "qtum", 400000), _defineProperty(_fees, "btcp", 10000), _defineProperty(_fees, "emc2", 100000), _defineProperty(_fees, "bcbc", 10000), _defineProperty(_fees, "game", 100000), _defineProperty(_fees, "fjc", 100000), _defineProperty(_fees, "ftc", 1000000), _defineProperty(_fees, "xmcc", 10000), _defineProperty(_fees, "xzc", 10000), _defineProperty(_fees, "gbx", 10000), _defineProperty(_fees, "mac", 100000), _defineProperty(_fees, "mnx", 10000), _defineProperty(_fees, "arco", 10000), _defineProperty(_fees, "lana", 100), _defineProperty(_fees, "neva", 100), _defineProperty(_fees, "netko", 100), _defineProperty(_fees, "taj", 100), _defineProperty(_fees, "xvg", 10000), _defineProperty(_fees, "uno", 10000), _defineProperty(_fees, "kreds", 10000), _defineProperty(_fees, "ufo", 100000), _defineProperty(_fees, "lcc", 1000000), _defineProperty(_fees, "grlc", 200000), _defineProperty(_fees, "axe", 10000), _defineProperty(_fees, "aywa", 10000), _defineProperty(_fees, "bitb", 100000000), _defineProperty(_fees, "polis", 10000), _defineProperty(_fees, "crc", 1000000), _defineProperty(_fees, "tzc", 1000000), _defineProperty(_fees, "inn", 10000), _defineProperty(_fees, "goa", 100000), _defineProperty(_fees, "xsc", 100000), _defineProperty(_fees, "eny", 10000), _defineProperty(_fees, "rap", 1000), _defineProperty(_fees, "cesc", 1000), _defineProperty(_fees, "xbc", 100000), _defineProperty(_fees, "mue", 10000), _defineProperty(_fees, "koto", 10000), _defineProperty(_fees, "pak", 1000), _defineProperty(_fees, "cpc", 1000), _defineProperty(_fees, "pac", 10000), _defineProperty(_fees, "stak", 10000), _defineProperty(_fees, "uis", 2000000), _defineProperty(_fees, "bbk", 1000), _defineProperty(_fees, "arepa", 1000), _defineProperty(_fees, "qmc", 10000), _defineProperty(_fees, "rdd", 0), _defineProperty(_fees, "eth", 21000), _defineProperty(_fees, "eth_ropsten", 21000), _fees);
module.exports = fees;