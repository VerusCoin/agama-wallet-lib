"use strict";

var _networks;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
  Bitcoinjs-lib network params file
*/
// TODO: runtime extend for kmd assets
//       use lib flag e.g. lib: 'bitcoinjs-lib'
// wifAlt can be used for different coin versions that underwent major code base changes
// this is an experimental option that can lead to key pair derivation errors
var bitcoin = require('bitgo-utxo-lib');

var networks = (_networks = {
  btc: bitcoin.networks.bitcoin,
  ltc: {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bip44: 2,
    bip32: {
      "public": 0x019da462,
      "private": 0x019d9cfe
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
    dustThreshold: 0 // https://github.com/litecoin-project/litecoin/blob/v0.8.7.2/src/main.cpp#L360-L365

  },
  ccl: {
    messagePrefix: '\x19Coin Collect Signed Message:\n',
    bip44: 141,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationTimestamp: 0
  },
  dnr: {
    messagePrefix: '\x19Denarius Signed Message:\n',
    bip44: 116,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x5a,
    wif: 0x9e,
    dustThreshold: 1000,
    isPoS: true
  },
  vote2020: {
    messagePrefix: '\x19Vote2020 Signed Message:\n',
    bip44: 141,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationTimestamp: 1544835600,
    kmdInterest: true
  },
  vote2021: {
    messagePrefix: '\x19Vote2021 Signed Message:\n',
    bip44: 141,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationTimestamp: 1544835600,
    kmdInterest: true
  },
  doge: {
    messagePrefix: '\x19Dogecoin Signed Message:\n',
    bip44: 3,
    bip32: {
      "public": 0x02facafd,
      "private": 0x02fac398
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x16,
    wif: 0x9e,
    dustThreshold: 0 // https://github.com/dogecoin/dogecoin/blob/v1.7.1/src/core.h#L155-L160

  },
  // https://github.com/monacoinproject/monacoin/blob/master-0.10/src/chainparams.cpp#L161
  mona: {
    messagePrefix: '\x19Monacoin Signed Message:\n',
    bip44: 22,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x32,
    scriptHash: 0x05,
    wif: 0xB2,
    dustThreshold: 546 // https://github.com/bitcoin/bitcoin/blob/v0.9.2/src/core.h#L151-L162

  },
  game: {
    messagePrefix: '\x19GameCredits Signed Message:\n',
    bip44: 101,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x5,
    wif: 0xA6,
    dustThreshold: 546
  },
  // https://github.com/dashpay/dash/blob/master/src/chainparams.cpp#L171
  dash: {
    messagePrefix: '\x19DarkCoin Signed Message:\n',
    bip44: 5,
    bip32: {
      "public": 0x02fe52f8,
      "private": 0x02fe52cc
    },
    pubKeyHash: 0x4c,
    scriptHash: 0x10,
    wif: 0xcc,
    dustThreshold: 5460 // https://github.com/dashpay/dash/blob/v0.12.0.x/src/primitives/transaction.h#L144-L155

  },
  // https://github.com/zcoinofficial/zcoin/blob/c93eccb39b07a6132cb3d787ac18be406b24c3fa/src/base58.h#L275
  xzc: {
    messagePrefix: '\x19ZCoin Signed Message:\n',
    bip44: 136,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x52,
    scriptHash: 0x07,
    wif: 0x52 + 128,
    dustThreshold: 1000,
    // https://github.com/zcoinofficial/zcoin/blob/f755f95a036eedfef7c96bcfb6769cb79278939f/src/main.h#L59,
    isZcash: true
  },
  // https://raw.githubusercontent.com/jl777/komodo/beta/src/chainparams.cpp
  kmd: {
    messagePrefix: '\x19Komodo Signed Message:\n',
    bip44: 141,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationTimestamp: 1544835600,
    kmdInterest: true
  },
  vrsc: {
    messagePrefix: '\x15Verus signed data:\n',
    bip44: 141,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationHeight: 227520
  },
  oot: {
    messagePrefix: '\x19Komodo Signed Message:\n',
    bip44: 141,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationHeight: 5000000
  },
  zilla: {
    messagePrefix: '\x19Komodo Signed Message:\n',
    bip44: 141,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationHeight: 5000000
  },
  spltest: {
    messagePrefix: '\x19Komodo Signed Message:\n',
    bip44: 141,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationTimestamp: 1543958192
  },
  via: {
    messagePrefix: '\x19Viacoin Signed Message:\n',
    bip44: 14,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x47,
    scriptHash: 0x21,
    wif: 0xc7,
    dustThreshold: 1000
  },
  vtc: {
    messagePrefix: '\x19Vertcoin Signed Message:\n',
    bip44: 28,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x47,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  nmc: {
    messagePrefix: '\x19Namecoin Signed Message:\n',
    bip44: 7,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x34,
    scriptHash: 0xd,
    wif: 0xb4,
    dustThreshold: 1000
  },
  fair: {
    messagePrefix: '\x19Faircoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x5f,
    scriptHash: 0x24,
    wif: 0xdf,
    dustThreshold: 1000
  },
  dgb: {
    messagePrefix: '\x19Digibyte Signed Message:\n',
    bip44: 20,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  crw: {
    messagePrefix: '\x19Crown Signed Message:\n',
    bip44: 72,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x0,
    scriptHash: 0x1c,
    wif: 0x80,
    dustThreshold: 1000
  },
  arg: {
    messagePrefix: '\x19Argentum Signed Message:\n',
    bip44: 45,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0x5,
    wif: 0x97,
    dustThreshold: 1000
  },
  chips: {
    messagePrefix: '\x19Chips Signed Message:\n',
    bip44: 141,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc,
    dustThreshold: 1000
  },
  btg: {
    messagePrefix: '\x19BitcoinGold Signed Message:\n',
    bip44: 156,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x17,
    wif: 0x80,
    dustThreshold: 1000,
    forkName: 'btg',
    isBtcFork: true
  },
  bch: bitcoin.networks.bitcoincash,
  blk: {
    messagePrefix: '\x19BlackCoin Signed Message:\n',
    bip44: 10,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x55,
    wif: 0x99,
    dustThreshold: 1000,
    isPoS: true
  },
  sib: {
    messagePrefix: '\x19SibCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x28,
    wif: 0x80,
    dustThreshold: 1000
  },
  zec: {
    messagePrefix: '\x19Zcash Signed Message:\n',
    bip44: 133,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x05358394
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x2bb40e60
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationHeight: 419200
  },
  bzc: {
    messagePrefix: '\x19Bitzec Signed Message:\n',
    bip44: 197,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationHeight: 1
  },
  zcl: {
    messagePrefix: '\x19Zclassic Signed Message:\n',
    bip44: 147,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    },
    dustThreshold: 1000,
    isZcash: true,
    sapling: true,
    saplingActivationHeight: 476969
  },
  sng: {
    messagePrefix: '\x19Snowgem Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x05358394
    },
    pubKeyHash: 0x1c28,
    scriptHash: 0x1c2D,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  xmy: {
    messagePrefix: '\x19Myriad Signed Message:\n',
    bip44: 90,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x32,
    scriptHash: 0x9,
    wif: 0xB2,
    dustThreshold: 1000
  },
  hodlc: {
    messagePrefix: '\x19Hodlc Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x28,
    scriptHash: 0x5,
    wif: 0x28 + 128,
    dustThreshold: 1000
  },
  suqa: {
    messagePrefix: '\x19Suqa Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x5,
    wif: 0xbf,
    dustThreshold: 1000
  },
  qtum: {
    messagePrefix: '\x19Qtum Signed Message:\n',
    bip44: 2301,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3A,
    scriptHash: 0x32,
    wif: 0x80,
    dustThreshold: 1000
  },
  btx: {
    messagePrefix: '\x19Bitcore Signed Message:\n',
    bip44: 160,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x0,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  btcz: {
    messagePrefix: '\x19BitcoinZ Signed Message:\n',
    bip44: 177,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  aby: {
    messagePrefix: '\x19ArtByte Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0x5,
    wif: 0x97,
    dustThreshold: 1000
  },
  mac: {
    messagePrefix: '\x19Machinecoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x32,
    scriptHash: 0x5,
    wif: 0xB2,
    dustThreshold: 1000
  },
  vot: {
    messagePrefix: '\x19VoteCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x05358394
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  iop: {
    messagePrefix: '\x19IOP Signed Message:\n',
    bip44: 66,
    bip32: {
      "public": 0x2780915F,
      "private": 0xAE3416F6
    },
    pubKeyHash: 0x75,
    scriptHash: 0xAE,
    wif: 0x31,
    dustThreshold: 1000
  },
  bdl: {
    messagePrefix: '\x19Bitdeal Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x5,
    wif: 0xB0,
    dustThreshold: 1000
  },
  btcp: {
    messagePrefix: '\x18BitcoinPrivate Signed Message:\n',
    bip44: 183,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x1325,
    scriptHash: 0x13AF,
    wif: 0x80,
    dustThreshold: 1000 // isZcash: true,

  },
  // https://github.com/zencashio/zen/blob/master/src/chainparams.cpp#L118
  zen: {
    // new address type
    messagePrefix: '\x19Zencas Signed Message:\n',
    bip44: 121,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x2089,
    scriptHash: 0x2086,
    wif: 0x80,
    dustThreshold: 1000,
    isZcash: true
  },
  sys: {
    // zec based
    messagePrefix: '\x19Syscoin Signed Message:\n',
    bip44: 57,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3F,
    scriptHash: 0x5,
    wif: 0xbf,
    wifAlt: [0x80],
    dustThreshold: 1000,
    isZcash: true
  },
  emc2: {
    messagePrefix: '\x18Einsteinium Signed Message:\n',
    bip44: 41,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x21,
    scriptHash: 0x05,
    wif: 0xB0,
    compressed: true
  },
  // https://github.com/BTA-BATA/BATA-SOURCE/blob/master/src/chainparams.cpp#L156
  bta: {
    messagePrefix: '\x19Bata Signed Message:\n',
    bip44: 89,
    bip32: {
      "public": 0xA40C86FA,
      "private": 0xA40B91BD
    },
    pubKeyHash: 0x19,
    scriptHash: 0x5,
    wif: 0x55,
    dustThreshold: 1000
  },
  // https://github.com/lbryio/lbrycrd/blob/master/src/chainparams.cpp#L176
  lbc: {
    messagePrefix: '\x18LBRYcrd Signed Message:\n',
    bip44: 140,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x55,
    scriptHash: 0x7a,
    wif: 0x1c
  },
  // https://github.com/LIMXTEC/BitSend/blob/master/src/chainparams.cpp#L136
  bsd: {
    messagePrefix: '\x19Bitsend Signed Message:\n',
    bip44: 91,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x66,
    scriptHash: 0x5,
    wif: 0xCC,
    dustThreshold: 1000
  },
  // https://github.com/gobytecoin/gobyte/blob/master/src/chainparams.cpp#L127
  gbx: {
    messagePrefix: '\x19GoByte Signed Message:\n',
    bip44: 176,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0xA,
    wif: 0xC6,
    dustThreshold: 1000
  },
  // https://github.com/Electronic-Gulden-Foundation/egulden/blob/master/src/chainparams.cpp#L139
  efl: {
    messagePrefix: '\x19E-Gulden Signed Message:\n',
    bip44: 78,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x30,
    scriptHash: 0x5,
    wif: 0xB0,
    dustThreshold: 1000
  },
  wc: {
    // xwc
    messagePrefix: '\x18Whitecoin Signed Message:\n',
    bip44: 181,
    bip32: {
      "public": 0x04887F1E,
      "private": 0x048894ED
    },
    pubKeyHash: 0x49,
    scriptHash: 0x57,
    wif: 0xc9,
    dustThreshold: 1000
  },
  // https://github.com/vivocoin/vivo/blob/master/src/chainparams.cpp#L133
  vivo: {
    messagePrefix: '\x19Vivo Signed Message:\n',
    bip44: 166,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x46,
    scriptHash: 0xA,
    wif: 0xC6,
    dustThreshold: 1000
  },
  xvg: {
    messagePrefix: '\x18VERGE Signed Message:\n',
    bip44: 77,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x21,
    wif: 0x9e,
    dustThreshold: 1000
  },
  smart: {
    // wrong address generated
    messagePrefix: '\x19Smartcash Signed Message:\n',
    bip44: 224,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3F,
    scriptHash: 0x12,
    wif: 0xBF,
    dustThreshold: 1000,
    isZcash: true
  },
  // https://github.com/reddcoin-project/reddcoin/blob/master/src/chainparams.cpp#L79
  rdd: {
    messagePrefix: '\x19Reddcoin Signed Message:\n',
    bip44: 4,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3D,
    scriptHash: 0x5,
    wif: 0xBD,
    dustThreshold: 1000
  },
  // https://github.com/PIVX-Project/PIVX/blob/master/src/chainparams.cpp#L180
  pivx: {
    messagePrefix: '\x19Pivx Signed Message:\n',
    bip44: 119,
    bip32: {
      "public": 0x022D2533,
      "private": 0x0221312B
    },
    pubKeyHash: 0x1E,
    scriptHash: 0xD,
    wif: 0xD4,
    dustThreshold: 1000
  },
  // https://github.com/OmniLayer/omnicore/blob/master/src/chainparams.cpp#L128
  omni: {
    messagePrefix: '\x19OmniLayer Signed Message:\n',
    bip44: 200,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x0,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  ok: {
    messagePrefix: '\x19OKCash Signed Message:\n',
    bip44: 69,
    bip32: {
      "public": 0x03CC23D7,
      "private": 0x03CC1C73
    },
    pubKeyHash: 0x37,
    scriptHash: 0x1C,
    wif: 0x03,
    wifAlt: [0xB7],
    dustThreshold: 1000
  },
  neos: {
    messagePrefix: '\x19Neoscoin Signed Message:\n',
    bip44: 25,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x35,
    scriptHash: 0x5,
    wif: 0xB1,
    dustThreshold: 1000
  },
  // https://github.com/NAVCoin/navcoin-core/blob/master/src/chainparams.cpp#L160
  nav: {
    messagePrefix: '\x19Navcoin Signed Message:\n',
    bip44: 130,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x35,
    scriptHash: 0x55,
    wif: 0x96,
    dustThreshold: 1000
  },
  // https://github.com/minexcoin/minexcoin/blob/master/src/chainparams.cpp#L259
  mnx: {
    messagePrefix: '\x19Minexcoin Signed Message:\n',
    bip44: 182,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x4B,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  lcc: {
    messagePrefix: '\x18Litecoin Cash Signed Message:\n',
    bip44: 192,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x1c,
    scriptHash: 0x05,
    wif: 0xb0,
    dustThreshold: 1000
  },
  // https://github.com/Gulden/gulden-official/blob/master/src/chainparams.cpp#L128
  nlg: {
    messagePrefix: '\x19Gulden Cash Signed Message:\n',
    bip44: 87,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x62,
    wif: 0x26 + 128,
    wifAlt: [0x62],
    dustThreshold: 1000
  },
  // https://github.com/fujicoin/fujicoin/blob/master/src/chainparams.cpp#L132
  fjc: {
    messagePrefix: '\x19Fujicoin Signed Message:\n',
    bip44: 75,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x24,
    scriptHash: 0x10,
    wif: 0xA4,
    dustThreshold: 1000
  },
  // https://github.com/flash-coin/bitcore-lib/commit/97d72267f3577173ee90d46b43553af801b214f2#diff-014a66be6f0ee0e90f9357d497267195R144
  flash: {
    messagePrefix: '\x19Flash Signed Message:\n',
    bip44: 120,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x44,
    scriptHash: 0x82,
    wif: 0xc4,
    dustThreshold: 1000
  },
  // https://github.com/FeatherCoin/Feathercoin/blob/master-0.13/src/chainparams.cpp#L132
  ftc: {
    messagePrefix: '\x19FeatherCoin Signed Message:\n',
    bip44: 8,
    bip32: {
      "public": 0x048BC26,
      "private": 0x0488DAEE
    },
    pubKeyHash: 0xE,
    // pubKeyHash: 0x0e,
    scriptHash: 0x5,
    wif: 0x8E,
    dustThreshold: 1000
  },
  // https://github.com/exclfork/ExclusiveCoin/blob/master/src/chainparams.cpp#L82
  excl: {
    messagePrefix: '\x19ExclusiveCoin Signed Message:\n',
    bip44: 190,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x21,
    scriptHash: 0x89,
    wif: 0xA1,
    dustThreshold: 1000
  },
  // https://github.com/DMDcoin/Diamond/blob/master/src/chainparams.cpp#L166
  dmd: {
    messagePrefix: '\x19Diamond Signed Message:\n',
    bip44: 152,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x5A,
    scriptHash: 0x8,
    wif: 0xDA,
    dustThreshold: 1000
  },
  // https://github.com/CooleRRSA/crave/blob/master/src/chainparams.cpp#L99
  crave: {
    messagePrefix: '\x19Crave Signed Message:\n',
    bip44: 186,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x46,
    scriptHash: 0x55,
    wif: 0x99,
    dustThreshold: 1000
  },
  // https://github.com/BitClubDev/ClubCoin/blob/master/src/chainparams.cpp#L114
  club: {
    messagePrefix: '\x19ClubCoin Signed Message:\n',
    bip44: 79,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1C,
    scriptHash: 0x55,
    wif: 0x99,
    dustThreshold: 1000
  },
  // https://github.com/nochowderforyou/clams/blob/master/src/chainparams.cpp#L93
  clam: {
    messagePrefix: '\x19Clams Signed Message:\n',
    bip44: 23,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x89,
    scriptHash: 0xD,
    wif: 0x85,
    dustThreshold: 1000
  },
  // https://github.com/bitcoin-atom/bitcoin-atom/blob/master/src/chainparams.cpp#L168
  bca: {
    messagePrefix: '\x19Bitcoin Atom Signed Message:\n',
    bip44: 185,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0xA,
    wif: 0x80,
    dustThreshold: 1000
  },
  // https://github.com/aurarad/Auroracoin/blob/master/src/chainparams.cpp#L77
  aur: {
    messagePrefix: '\x19Auroracoin Signed Message:\n',
    bip44: 85,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0xA,
    wif: 0xB0,
    dustThreshold: 1000
  },
  // https://github.com/adcoin-project/AdCoin/blob/master/src/chainparams.cpp#L129
  acc: {
    messagePrefix: '\x19AdCoin Signed Message:\n',
    bip44: 161,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0x5,
    wif: 0xB0,
    dustThreshold: 1000
  },
  bcbc: {
    messagePrefix: '\x19Bitcoin CBC Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x0,
    scriptHash: 0x5,
    wif: 0x80,
    dustThreshold: 1000
  },
  // https://raw.githubusercontent.com/iancoleman/bip39/master/src/js/bitcoinjs-extensions.js
  sdc: {
    messagePrefix: '\x18ShadowCash Signed Message:\n',
    bip44: 35,
    bip32: {
      "public": 0xEE80286A,
      "private": 0xEE8031E8
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x7d,
    wif: 0xbf
  },
  mzc: {
    messagePrefix: '\x18Mazacoin Signed Message:\n',
    bip44: 13,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x32,
    scriptHash: 0x09,
    wif: 0xe0
  },
  ppc: {
    messagePrefix: '\x18Peercoin Signed Message:\n',
    bip44: 6,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x00,
    // TODO set this correctly
    wif: 0xb7
  },
  axe: {
    messagePrefix: '\x18AXE Signed Message:\n',
    bip44: 4242,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x10,
    // TODO set this correctly
    wif: 0xcc
  },
  slm: {
    messagePrefix: '\x18Slimcoin Signed Message:\n',
    bip32: {
      "public": 0xef6adf10,
      "private": 0xef69ea80
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x7d,
    wif: 0x46
  },
  nebl: {
    messagePrefix: '\x18Neblio Signed Message:\n',
    bip44: 146,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x35,
    scriptHash: 0x70,
    wif: 0xb5
  },
  jbs: {
    messagePrefix: '\x19Jumbucks Signed Message:\n',
    bip44: 26,
    bip32: {
      "public": 0x037a689a,
      "private": 0x037a6460
    },
    pubKeyHash: 0x2b,
    scriptHash: 0x05,
    wif: 0xab
  },
  zet: {
    messagePrefix: '\x18Zetacoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x50,
    scriptHash: 0x09,
    wif: 0xe0
  },
  onx: {
    messagePrefix: '\x18Onixcoin Signed Message:\n',
    bip44: 174,
    bip32: {
      "public": 0x049d7cb2,
      "private": 0x049d7878
    },
    pubKeyHash: 0x4B,
    scriptHash: 0x05,
    wif: 0x80
  },
  usnbt: {
    messagePrefix: '\x18Nu Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x1a,
    wif: 0x96
  },
  beet: {
    messagePrefix: '\x19Beetlecoin Signed Message:\n',
    bip44: 800,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1A,
    scriptHash: 0x55,
    wif: 0x99
  },
  ac: {
    messagePrefix: '\x18AsiaCoin Signed Message:\n',
    bip44: 51,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x17,
    scriptHash: 0x08,
    wif: 0x97
  },
  bela: {
    messagePrefix: '\x18BelaCoin Signed Message:\n',
    bip44: 73,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x05,
    wif: 0x99
  },
  xbc: {
    messagePrefix: '\x18BitcoinPlus Signed Message:\n',
    bip44: 65,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x08,
    wif: 0x99,
    isPoS: true
  },
  brit: {
    messagePrefix: '\x18BritCoin Signed Message:\n',
    bip44: 70,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x19,
    scriptHash: 0x55,
    wif: 0x99
  },
  cdn: {
    messagePrefix: '\x18Canada eCoin Signed Message:\n',
    bip44: 34,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1c,
    scriptHash: 0x05,
    wif: 0x9c
  },
  ccn: {
    messagePrefix: '\x18Cannacoin Signed Message:\n',
    bip44: 19,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1c,
    scriptHash: 0x05,
    wif: 0x9c
  },
  cmp: {
    messagePrefix: '\x18CompCoin Signed Message:\n',
    bip44: 71,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1c,
    scriptHash: 0x55,
    wif: 0x9c
  },
  defc: {
    // get servers
    messagePrefix: '\x18Defcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x05,
    wif: 0x9e
  },
  dgc: {
    messagePrefix: '\x18Digitalcoin Signed Message:\n',
    bip44: 18,
    bip32: {
      "public": 0x9e0488B2,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x1e,
    scriptHash: 0x05,
    wif: 0x9e
  },
  ecn: {
    messagePrefix: '\x18eCoin Signed Message:\n',
    bip44: 115,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x5c,
    scriptHash: 0x14,
    wif: 0xdc
  },
  edrc: {
    messagePrefix: '\x18EDRcoin Signed Message:\n',
    bip44: 56,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x5d,
    scriptHash: 0x1c,
    wif: 0xdd
  },
  erc: {
    messagePrefix: '\x18Europecoin Signed Message:\n',
    bip44: 151,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x21,
    scriptHash: 0x05,
    wif: 0xa8
  },
  frst: {
    messagePrefix: '\x18FirstCoin Signed Message:\n',
    bip44: 167,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x23,
    scriptHash: 0x05,
    wif: 0xa3
  },
  gcr: {
    messagePrefix: '\x18GCR Signed Message:\n',
    bip44: 49,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x26,
    scriptHash: 0x61,
    wif: 0x9a
  },
  grc: {
    messagePrefix: '\x18Gridcoin Signed Message:\n',
    bip44: 84,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3e,
    scriptHash: 0x55,
    wif: 0xbe
  },
  hnc: {
    messagePrefix: '\x18helleniccoin Signed Message:\n',
    bip44: 168,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x30,
    scriptHash: 0x05,
    wif: 0xb0
  },
  thc: {
    messagePrefix: '\x18Hempcoin Signed Message:\n',
    bip44: 113,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x28,
    scriptHash: 0x08,
    wif: 0xa8
  },
  insn: {
    messagePrefix: '\x18INSaNe Signed Message:\n',
    bip44: 68,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x66,
    scriptHash: 0x39,
    wif: 0x37
  },
  ixc: {
    messagePrefix: '\x18Ixcoin Signed Message:\n',
    bip44: 86,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x8a,
    scriptHash: 0x05,
    wif: 0x80
  },
  kobo: {
    messagePrefix: '\x18Kobocoin Signed Message:\n',
    bip44: 196,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x23,
    scriptHash: 0x1c,
    wif: 0xa3
  },
  ldcn: {
    messagePrefix: '\x18Landcoin Signed Message:\n',
    bip44: 63,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x30,
    scriptHash: 0x7a,
    wif: 0xb0
  },
  linx: {
    messagePrefix: '\x18LinX Signed Message:\n',
    bip44: 114,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x4b,
    scriptHash: 0x05,
    wif: 0xcb
  },
  lynx: {
    messagePrefix: '\x18Lynx Signed Message:\n',
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x2d,
    scriptHash: 0x32,
    wif: 0xad
  },
  nro: {
    messagePrefix: '\x18PPCoin Signed Message:\n',
    bip44: 110,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x35,
    scriptHash: 0x75,
    wif: 0xb5
  },
  nyc: {
    messagePrefix: '\x18Newyorkc Signed Message:\n',
    bip44: 179,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x16,
    wif: 0xbc
  },
  nvc: {
    messagePrefix: '\x18NovaCoin Signed Message:\n',
    bip44: 50,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x08,
    scriptHash: 0x14,
    wif: 0x88
  },
  nsr: {
    messagePrefix: '\x18Nu Signed Message:\n',
    bip44: 11,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x40,
    wif: 0x95
  },
  psb: {
    messagePrefix: '\x18Pesobit Signed Message:\n',
    bip44: 62,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x55,
    wif: 0xb7
  },
  pink: {
    messagePrefix: '\x18Pinkcoin Signed Message:\n',
    bip44: 117,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x03,
    scriptHash: 0x1c,
    wif: 0x83
  },
  posw: {
    messagePrefix: '\x18Poswcoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x55,
    wif: 0xb7
  },
  pot: {
    messagePrefix: '\x18Potcoin Signed Message:\n',
    bip44: 81,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x05,
    wif: 0xb7
  },
  put: {
    messagePrefix: '\x18PutinCoin Signed Message:\n',
    bip44: 122,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x37,
    scriptHash: 0x14,
    wif: 0xb7
  },
  vox: {
    // rvr
    messagePrefix: '\x18Voxels Signed Message:\n',
    bip44: 129,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x46,
    scriptHash: 0x05,
    wif: 0xc6
  },
  rby: {
    messagePrefix: '\x18Rubycoin Signed Message:\n',
    bip44: 16,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x3c,
    scriptHash: 0x55,
    wif: 0xbc
  },
  smly: {
    messagePrefix: '\x18Smileycoin Signed Message:\n',
    bip44: 59,
    bip32: {
      "public": 0x1E562D9A,
      "private": 0x1E5631BC
    },
    pubKeyHash: 0x19,
    scriptHash: 0x05,
    wif: 0x05
  },
  slr: {
    messagePrefix: '\x18SolarCoin Signed Message:\n',
    bip44: 58,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x12,
    scriptHash: 0x05,
    wif: 0x92
  },
  strat: {
    messagePrefix: '\x18Stratis Signed Message:\n',
    bip44: 105,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x3f,
    scriptHash: 0x7d,
    wif: 0xbf
  },
  toa: {
    messagePrefix: '\x18TOA Signed Message:\n',
    bip44: 159,
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x41,
    scriptHash: 0x17,
    wif: 0xc1
  },
  usc: {
    messagePrefix: '\x18UltimateSecureCash Signed Message:\n',
    bip44: 112,
    bip32: {
      "public": 0xEE80286A,
      "private": 0xEE8031E8
    },
    pubKeyHash: 0x44,
    scriptHash: 0x7d,
    wif: 0xbf
  },
  uno: {
    messagePrefix: '\x18Unobtanium Signed Message:\n',
    bip44: 92,
    bip32: {
      "public": 0x0488B21E,
      "private": 0x0488ADE4
    },
    pubKeyHash: 0x82,
    scriptHash: 0x1e,
    wif: 0xe0
  },
  xvc: {
    messagePrefix: '\x18Vcash Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x47,
    scriptHash: 0x08,
    wif: 0xc7
  },
  vpn: {
    messagePrefix: '\x18VpnCoin Signed Message:\n',
    bip32: {
      "public": 0x0488b21e,
      "private": 0x0488ade4
    },
    pubKeyHash: 0x47,
    scriptHash: 0x05,
    wif: 0xc7
  }
}, _defineProperty(_networks, "wc", {
  messagePrefix: '\x18WinCoin Signed Message:\n',
  bip32: {
    "public": 0x0488b21e,
    "private": 0x0488ade4
  },
  pubKeyHash: 0x49,
  scriptHash: 0x1c,
  wif: 0xc9
}), _defineProperty(_networks, "xuez", {
  messagePrefix: '\x18Xuez Signed Message:\n',
  bip44: 225,
  bip32: {
    "public": 0x022d2533,
    "private": 0x0221312b
  },
  pubKeyHash: 0x4b,
  scriptHash: 0x12,
  wif: 0xd4
}), _defineProperty(_networks, "nrg", {
  // etk?
  messagePrefix: '\x18Energicoin Signed Message:\n',
  bip44: 204,
  bip32: {
    "public": 0x03B8C856,
    "private": 0xD7DC6E9F
  },
  pubKeyHash: 0x21,
  scriptHash: 0x35,
  wif: 0x6a
}), _defineProperty(_networks, "excc", {
  messagePrefix: 'ExchangeCoin Signed Message:\n',
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x21B9,
  scriptHash: 0x34AF,
  wif: 0x80
}), _defineProperty(_networks, "xax", {
  messagePrefix: '\x18Artax Signed Message:\n',
  bip44: 219,
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x17,
  scriptHash: 0x1CBD,
  wif: 0x97
}), _defineProperty(_networks, "stt", {
  messagePrefix: '\x18Stash Signed Message:\n',
  bip32: {
    "public": 0x0488b21e,
    "private": 0x0488ade4
  },
  pubKeyHash: 0x4c,
  scriptHash: 0x10,
  wif: 0xcc
}), _defineProperty(_networks, "sls", {
  messagePrefix: '\x18Salus Signed Message:\n',
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x3f,
  scriptHash: 0xc4,
  wif: 0xbf
}), _defineProperty(_networks, "mec", {
  messagePrefix: '\x18Megacoin Signed Message:\n',
  bip44: 217,
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x32,
  scriptHash: 0x05,
  wif: 0xB2
}), _defineProperty(_networks, "cesc", {
  messagePrefix: '\x18Cryptoescudo Signed Message:\n',
  bip32: {
    "public": 0x0488b21e,
    "private": 0x0488ade4
  },
  pubKeyHash: 0x1c,
  scriptHash: 0x05,
  wif: 0x9c
}), _defineProperty(_networks, "btdx", {
  messagePrefix: '\x18BitCloud Signed Message:\n',
  bip44: 218,
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x19,
  scriptHash: 0x05,
  wif: 0x99
}), _defineProperty(_networks, 1337, {
  messagePrefix: "\x18Elite Signed Message:\n",
  pubKeyHash: 0x30,
  scriptHash: 0x1c,
  wif: 0xb0
}), _defineProperty(_networks, "bun", {
  messagePrefix: "\x18BunnyCoin Signed Message:\n",
  pubKeyHash: 0x1a,
  scriptHash: 0x16,
  wif: 0x9a,
  headerHashAlgo: 'scrypt'
}), _defineProperty(_networks, "cat", {
  messagePrefix: "\x18Catcoin Signed Message:\n",
  pubKeyHash: 0x15,
  scriptHash: 0x5,
  wif: 0x95
}), _defineProperty(_networks, "cloak", {
  messagePrefix: "\x18CloakCoin Signed Message:\n",
  pubKeyHash: 0x1b,
  scriptHash: 0x55,
  wif: 0x9b
}), _defineProperty(_networks, "xcp", {
  messagePrefix: "\x18CounterParty Signed Message:\n",
  bip44: 9,
  pubKeyHash: 0x0,
  scriptHash: 0x5,
  wif: 0x80
}), _defineProperty(_networks, "cj", {
  messagePrefix: "\x18CryptoJacks Signed Message:\n",
  pubKeyHash: 0x1c,
  scriptHash: 0x5,
  wif: 0x9c
}), _defineProperty(_networks, "note", {
  messagePrefix: "\x18DNotes Signed Message:\n",
  pubKeyHash: 0x1f,
  scriptHash: 0x5,
  wif: 0x9f
}), _defineProperty(_networks, "dime", {
  messagePrefix: "\x18Dimecoin Signed Message:\n",
  pubKeyHash: 0xf,
  scriptHash: 0x9,
  wif: 0x8f
}), _defineProperty(_networks, "dope", {
  messagePrefix: "\x18Dopecoin Signed Message:\n",
  bip44: 53,
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x1e,
  pubKeyHashAlt: 0x8,
  scriptHash: 0x5,
  wif: 0x9e
}), _defineProperty(_networks, "emc", {
  messagePrefix: "\x18Emercoin Signed Message:\n",
  pubKeyHash: 0x21,
  scriptHash: 0x5,
  wif: 0x80
}), _defineProperty(_networks, "flap", {
  messagePrefix: "\x18FlappyCoin Signed Message:\n",
  pubKeyHash: 0x23,
  scriptHash: 0x5,
  wif: 0xa3
}), _defineProperty(_networks, "geert", {
  messagePrefix: "\x18Geertcoin Signed Message:\n",
  pubKeyHash: 0x26,
  scriptHash: 0x5,
  wif: 0xb0
}), _defineProperty(_networks, "huc", {
  messagePrefix: "\x18HunterCoin Signed Message:\n",
  pubKeyHash: 0x28,
  scriptHash: 0x5,
  wif: 0xa8
}), _defineProperty(_networks, "leo", {
  messagePrefix: "\x18LEOcoin Signed Message:\n",
  pubKeyHash: 0x12,
  scriptHash: 0x58,
  wif: 0x90
}), _defineProperty(_networks, "lemon", {
  messagePrefix: "\x18LemonCoin Signed Message:\n",
  pubKeyHash: 0x30,
  scriptHash: 0x5,
  wif: 0xb0
}), _defineProperty(_networks, "mars", {
  messagePrefix: "\x18MarsCoin Signed Message:\n",
  bip44: 107,
  pubKeyHash: 0x32,
  scriptHash: 0x5,
  wif: 0xb2,
  headerHashAlgo: 'scrypt'
}), _defineProperty(_networks, "mgc", {
  messagePrefix: "\x18MergeCoin Signed Message:\n",
  pubKeyHash: 0x32,
  scriptHash: 0x5,
  wif: 0xb2,
  transactionForm: 'ppc-timestamp',
  isPoS: true // ?

}), _defineProperty(_networks, "moon", {
  messagePrefix: "\x18Mooncoin Signed Message:\n",
  pubKeyHash: 0x3,
  scriptHash: 0x5,
  wif: 0x83
}), _defineProperty(_networks, "nlc2", {
  messagePrefix: "\x18NoLimitCoin Signed Message:\n",
  bip44: 149,
  pubKeyHash: 0x35,
  scriptHash: 0x5c,
  wif: 0xb5
}), _defineProperty(_networks, "pnd", {
  messagePrefix: "\x18PandaCoin Signed Message:\n",
  bip44: 37,
  pubKeyHash: 0x37,
  scriptHash: 0x5,
  wif: 0xb7
}), _defineProperty(_networks, "part", {
  messagePrefix: "\x18Particl Signed Message:\n",
  bip44: 44,
  pubKeyHash: 0x38,
  scriptHash: 0x3c,
  wif: 0x6c
}), _defineProperty(_networks, "ptc", {
  messagePrefix: "\x18Pesetacoin Signed Message:\n",
  bip44: 109,
  pubKeyHash: 0x2f,
  scriptHash: 0x5,
  wif: 0xaf
}), _defineProperty(_networks, "xpm", {
  messagePrefix: "\x18Primecoin Signed Message:\n",
  bip44: 24,
  pubKeyHash: 0x17,
  scriptHash: 0x5,
  wif: 0x97
}), _defineProperty(_networks, "qrk", {
  messagePrefix: "\x18Quark Signed Message:\n",
  bip44: 82,
  pubKeyHash: 0x3a,
  scriptHash: 0x5,
  wif: 0xba
}), _defineProperty(_networks, "song", {
  messagePrefix: "\x18SongCoin Signed Message:\n",
  pubKeyHash: 0x3f,
  scriptHash: 0x5,
  wif: 0xbf
}), _defineProperty(_networks, "trc", {
  messagePrefix: "\x18TerraCoin Signed Message:\n",
  bip44: 83,
  pubKeyHash: 0x0,
  scriptHash: 0x5,
  wif: 0x80
}), _defineProperty(_networks, "tes", {
  messagePrefix: "\x18TeslaCoin Signed Message:\n",
  bip44: 1856,
  pubKeyHash: 0xb,
  scriptHash: 0x5,
  wif: 0x8b
}), _defineProperty(_networks, "tx", {
  messagePrefix: "\x18TransferCoin Signed Message:\n",
  pubKeyHash: 0x42,
  scriptHash: 0x5,
  wif: 0x99
}), _defineProperty(_networks, "unify", {
  messagePrefix: "\x18Unify Signed Message:\n",
  bip44: 124,
  pubKeyHash: 0x44,
  scriptHash: 0x5,
  wif: 0xc4
}), _defineProperty(_networks, "bvc", {
  messagePrefix: "\x18BeaverCoin Signed Message:\n",
  pubKeyHash: 0x19,
  scriptHash: 0x5,
  wif: 0xb0
}), _defineProperty(_networks, "arco", {
  messagePrefix: "\x18Aquariuscoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x17,
  scriptHash: 0x5,
  wif: 0x97
}), _defineProperty(_networks, "taj", {
  messagePrefix: "\x18Tajcoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x41,
  scriptHash: 0x5,
  wif: 0x6f
}), _defineProperty(_networks, "lana", {
  messagePrefix: "\x18Lanacoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x30,
  scriptHash: 0x5,
  wif: 0xb0
}), _defineProperty(_networks, "neva", {
  messagePrefix: "\x18Nevacoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x35,
  scriptHash: 0x5,
  wif: 0xb1
}), _defineProperty(_networks, "netko", {
  messagePrefix: "\x18Netkocoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x35,
  scriptHash: 0x5,
  wif: 0xB1
}), _defineProperty(_networks, "kreds", {
  messagePrefix: '\x19Kreds Signed Message:\n',
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x2D,
  scriptHash: 0x5,
  wif: 0xC3
}), _defineProperty(_networks, "ufo", {
  // https://github.com/UFOCoins/ufo/blob/master-0.15/src/chainparams.cpp#L134
  messagePrefix: '\x19UFO Signed Message:\n',
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x1B,
  scriptHash: 0x5,
  wif: 0x9B
}), _defineProperty(_networks, "grlc", {
  messagePrefix: '\x19GarlicCoin Signed Message:\n',
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x26,
  scriptHash: 0x32,
  wif: 0xB0
}), _defineProperty(_networks, "aywa", {
  messagePrefix: '\x19AywaCoin Signed Message:\n',
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x17,
  scriptHash: 0x53,
  wif: 0x96
}), _defineProperty(_networks, "bitb", {
  messagePrefix: '\x19BitBean Signed Message:\n',
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x3,
  scriptHash: 0x55,
  wif: 0x83
}), _defineProperty(_networks, "xmcc", {
  messagePrefix: '\x19Monoeci Signed Message:\n',
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x32,
  scriptHash: 0x49,
  wif: 0x4D
}), _defineProperty(_networks, "polis", {
  messagePrefix: '\x19Polis Signed Message:\n',
  bip32: {
    "public": 0x03E25D7E,
    "private": 0x03E25945
  },
  pubKeyHash: 0x37,
  scriptHash: 0x38,
  wif: 0x3C
}), _defineProperty(_networks, "crc", {
  messagePrefix: '\x19Crowdcoin Signed Message:\n',
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x41,
  scriptHash: 0x7F,
  wif: 0x3
}), _defineProperty(_networks, "tzc", {
  messagePrefix: "\x18TrezarCoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x42,
  scriptHash: 0x8,
  wif: 0xC2
}), _defineProperty(_networks, "cesc", {
  messagePrefix: "\x18cryptoescudo Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x1C,
  scriptHash: 0x58,
  wif: 0x9C
}), _defineProperty(_networks, "mue", {
  messagePrefix: "\x18MonetaryUnit Signed Message:\n",
  bip32: {
    "public": 0x022D2533,
    "private": 0x0221312B
  },
  pubKeyHash: 0x10,
  scriptHash: 0x4C,
  wif: 0x7E
}), _defineProperty(_networks, "koto", {
  messagePrefix: '\x19Koto Signed Message:\n',
  bip32: {
    "public": 0x0488b21e,
    "private": 0x0488ade4
  },
  pubKeyHash: 0x1836,
  scriptHash: 0x183B,
  wif: 0x80,
  consensusBranchId: {
    1: 0x00,
    2: 0x00,
    3: 0x5ba81b19,
    4: 0x76b809bb
  },
  isZcash: true,
  sapling: true,
  saplingActivationHeight: 1
}), _defineProperty(_networks, "pak", {
  messagePrefix: "\x18Pakcoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x37,
  scriptHash: 0x5,
  wif: 0xB0
}), _defineProperty(_networks, "cpc", {
  messagePrefix: "\x18Capricoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x1C,
  scriptHash: 0x23,
  wif: 0x9C,
  isPoS: true
}), _defineProperty(_networks, "rap", {
  messagePrefix: "\x18Rapture Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x3C,
  scriptHash: 0x10,
  wif: 0xCC
}), _defineProperty(_networks, "pac", {
  messagePrefix: "\x18PACcoin Signed Message:\n",
  bip32: {
    "public": 0x043587CF,
    "private": 0x04358394
  },
  pubKeyHash: 0x37,
  scriptHash: 0xA,
  wif: 0xCC
}), _defineProperty(_networks, "stak", {
  messagePrefix: "\x18Straks Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x3F,
  scriptHash: 0x5,
  wif: 0xCC
}), _defineProperty(_networks, "inn", {
  messagePrefix: "\x18Innova Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x66,
  scriptHash: 0x14,
  wif: 0xC3
}), _defineProperty(_networks, "goa", {
  messagePrefix: "\x18Goacoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x26,
  scriptHash: 0xA,
  wif: 0xC6
}), _defineProperty(_networks, "bbk", {
  messagePrefix: "\x18Bitblocks Signed Message:\n",
  bip32: {
    "public": 0x022D2533,
    "private": 0x0221312B
  },
  pubKeyHash: 0x19,
  scriptHash: 0x55,
  wif: 0x6B
}), _defineProperty(_networks, "uis", {
  messagePrefix: "\x18Unitus Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x44,
  scriptHash: 0xA,
  wif: 0x84
}), _defineProperty(_networks, "uis", {
  messagePrefix: "\x18Unitus Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x44,
  scriptHash: 0xA,
  wif: 0x84
}), _defineProperty(_networks, "arepa", {
  messagePrefix: "\x18Arepacoin Signed Message:\n",
  bip32: {
    "public": 0x0488B21E,
    "private": 0x0488ADE4
  },
  pubKeyHash: 0x17,
  scriptHash: 0x55,
  wif: 0x97,
  isPoS: true
}), _defineProperty(_networks, "qmc", {
  messagePrefix: '\x18QMCoin Signed Message:\n',
  bip32: {
    "public": 0x0488b21e,
    "private": 0x0488ade4
  },
  pubKeyHash: 0x3A,
  scriptHash: 0x78,
  wif: 0x1
}), _defineProperty(_networks, "gin", {
  messagePrefix: '\x18GinCoin Signed Message:\n',
  bip32: {
    "public": 0x0488b21e,
    "private": 0x0488ade4
  },
  pubKeyHash: 0x26,
  scriptHash: 0xA,
  wif: 0xC6
}), _defineProperty(_networks, '2give', {
  messagePrefix: "\x182GIVE Signed Message:\n",
  pubKeyHash: 0x27,
  wif: 0xa7
}), _defineProperty(_networks, '42coin', {
  messagePrefix: "\x18242coin Signed Message:\n",
  pubKeyHash: 0x08,
  wif: 0x88
}), _defineProperty(_networks, "acoin", {
  messagePrefix: "\x18Acoin Signed Message:\n",
  pubKeyHash: 0x17,
  wif: 0xe6
}), _defineProperty(_networks, "agacoin", {
  messagePrefix: "\x18AGAcoin Signed Message:\n",
  pubKeyHash: 0x53,
  wif: 0xd3
}), _defineProperty(_networks, "alphacoin", {
  messagePrefix: "\x18Alphacoin Signed Message:\n",
  pubKeyHash: 0x52,
  wif: 0xd2
}), _defineProperty(_networks, "alqo", {
  messagePrefix: "\x18Alqo Signed Message:\n",
  pubKeyHash: 0x17,
  wif: 0xc1
}), _defineProperty(_networks, "animecoin", {
  messagePrefix: "\x18Animecoin Signed Message:\n",
  pubKeyHash: 0x17,
  wif: 0x97
}), _defineProperty(_networks, "anoncoin", {
  messagePrefix: "\x18Anoncoin Signed Message:\n",
  pubKeyHash: 0x17,
  wif: 0x97
}), _defineProperty(_networks, "apexcoin", {
  messagePrefix: "\x18Apexcoin Signed Message:\n",
  pubKeyHash: 0x17,
  wif: 0x97
}), _defineProperty(_networks, "bbqcoin", {
  messagePrefix: "\x18BBQcoin Signed Message:\n",
  pubKeyHash: 0x55,
  wif: 0xd5
}), _defineProperty(_networks, "biblepay", {
  messagePrefix: "\x18Biblepay Signed Message:\n",
  pubKeyHash: 0x19,
  wif: 0xb6
}), _defineProperty(_networks, "birdcoin", {
  messagePrefix: "\x18Birdcoin Signed Message:\n",
  pubKeyHash: 0x2f,
  wif: 0xaf
}), _defineProperty(_networks, "bitsynq", {
  messagePrefix: "\x18BitSynq Signed Message:\n",
  pubKeyHash: 0x3f,
  wif: 0xbf
}), _defineProperty(_networks, "bitzeny", {
  messagePrefix: "\x18BitZeny Signed Message:\n",
  pubKeyHash: 0x51,
  wif: 0x80
}), _defineProperty(_networks, "blackjack", {
  messagePrefix: "\x18BlackJack Signed Message:\n",
  pubKeyHash: 0x15,
  wif: 0x95
}), _defineProperty(_networks, "blocknet", {
  messagePrefix: "\x18BlockNet Signed Message:\n",
  pubKeyHash: 0x1a,
  wif: 0x9a
}), _defineProperty(_networks, "bolivarcoin", {
  messagePrefix: "\x18BolivarCoin Signed Message:\n",
  pubKeyHash: 0x55,
  wif: 0xd5
}), _defineProperty(_networks, "boxycoin", {
  messagePrefix: "\x18BoxyCoin Signed Message:\n",
  pubKeyHash: 0x4b,
  wif: 0xcb
}), _defineProperty(_networks, "cagecoin", {
  messagePrefix: "\x18Cagecoin Signed Message:\n",
  pubKeyHash: 0x1f,
  wif: 0x9f
}), _defineProperty(_networks, "campuscoin", {
  messagePrefix: "\x18CampusCoin Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x9c
}), _defineProperty(_networks, "canadaecoin", {
  messagePrefix: "\x18CanadaeCoin Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x9c
}), _defineProperty(_networks, "cannabiscoin", {
  messagePrefix: "\x18CannabisCoin Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x9c
}), _defineProperty(_networks, "cassubiandetk", {
  messagePrefix: "\x18CassubianDetk Signed Message:\n",
  pubKeyHash: 0x1e,
  wif: 0x9e
}), _defineProperty(_networks, "cashcoin", {
  messagePrefix: "\x18CashCoin Signed Message:\n",
  pubKeyHash: 0x22,
  wif: 0xa2
}), _defineProperty(_networks, "chaincoin", {
  messagePrefix: "\x18ChainCoin Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x9c
}), _defineProperty(_networks, "colossuscoinxt", {
  messagePrefix: "\x18ColossusCoinXT Signed Message:\n",
  pubKeyHash: 0x1e,
  wif: 0xd4
}), _defineProperty(_networks, "condensate", {
  messagePrefix: "\x18Condensate Signed Message:\n",
  pubKeyHash: 0x3c,
  wif: 0xbc
}), _defineProperty(_networks, "copico", {
  messagePrefix: "\x18Copico Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x90
}), _defineProperty(_networks, "coppercoin", {
  messagePrefix: "\x18CopperCoin Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x9c
}), _defineProperty(_networks, "corgicoin", {
  messagePrefix: "\x18Corgicoin Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x9c
}), _defineProperty(_networks, "cryptobullion", {
  messagePrefix: "\x18CryptoBullion Signed Message:\n",
  pubKeyHash: 0x0b,
  wif: 0x8b
}), _defineProperty(_networks, "cryptoclub", {
  messagePrefix: "\x18CryptoClub Signed Message:\n",
  pubKeyHash: 0x23,
  wif: 0xa3
}), _defineProperty(_networks, "cryptoescudo", {
  messagePrefix: "\x18Cryptoescudo Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x9c
}), _defineProperty(_networks, "cryptonite", {
  messagePrefix: "\x18Cryptonite Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x80
}), _defineProperty(_networks, "cryptowisdomcoin", {
  messagePrefix: "\x18CryptoWisdomCoin Signed Message:\n",
  pubKeyHash: 0x49,
  wif: 0x87
}), _defineProperty(_networks, "c2coin", {
  messagePrefix: "\x18C2coin Signed Message:\n",
  pubKeyHash: 0x1c,
  wif: 0x9c
}), _defineProperty(_networks, "deafdollars", {
  messagePrefix: "\x18DeafDollars Signed Message:\n",
  pubKeyHash: 0x30,
  wif: 0xb0
}), _defineProperty(_networks, "deeponion", {
  messagePrefix: "\x18DeepOnion Signed Message:\n",
  pubKeyHash: 0x1f,
  wif: 0x9f
}), _defineProperty(_networks, "deutsche_emark", {
  messagePrefix: "\x18Deutsche eMark Signed Message:\n",
  pubKeyHash: 0x35,
  wif: 0xb5
}), _defineProperty(_networks, "devcoin", {
  messagePrefix: "\x18Devcoin Signed Message:\n",
  pubKeyHash: 0x00,
  wif: 0x80
}), _defineProperty(_networks, "dogecoindark", {
  messagePrefix: "\x18DogecoinDark Signed Message:\n",
  pubKeyHash: 0x1e,
  wif: 0x9e
}), _defineProperty(_networks, "ekrona", {
  messagePrefix: "\x18eKrona Signed Message:\n",
  pubKeyHash: 0x2d,
  wif: 0xad
}), _defineProperty(_networks, "electra", {
  messagePrefix: "\x18Electra Signed Message:\n",
  pubKeyHash: 0x21,
  wif: 0xa1
}), _defineProperty(_networks, "ember", {
  messagePrefix: "\x18Ember Signed Message:\n",
  pubKeyHash: 0x5c,
  wif: 0x32
}), _defineProperty(_networks, "emerald", {
  messagePrefix: "\x18Emerald Signed Message:\n",
  pubKeyHash: 0x22,
  wif: 0xa2
}), _defineProperty(_networks, "energycoin", {
  messagePrefix: "\x18EnergyCoin Signed Message:\n",
  pubKeyHash: 0x5c,
  wif: 0xdc
}), _defineProperty(_networks, "espers", {
  messagePrefix: "\x18Espers Signed Message:\n",
  pubKeyHash: 0x21,
  wif: 0x90
}), _defineProperty(_networks, "fastcoin", {
  messagePrefix: "\x18Fastcoin Signed Message:\n",
  pubKeyHash: 0x60,
  wif: 0xe0
}), _defineProperty(_networks, "fibre", {
  messagePrefix: "\x18Fibre Signed Message:\n",
  pubKeyHash: 0x23,
  wif: 0xa3
}), _defineProperty(_networks, "florincoin", {
  messagePrefix: "\x18Florincoin Signed Message:\n",
  pubKeyHash: 0x23,
  wif: 0xb0
}), _defineProperty(_networks, "flurbo", {
  messagePrefix: "\x18Flurbo Signed Message:\n",
  pubKeyHash: 0x23,
  wif: 0x30
}), _defineProperty(_networks, "fluttercoin", {
  messagePrefix: "\x18Fluttercoin Signed Message:\n",
  pubKeyHash: 0x23,
  wif: 0xa3
}), _defineProperty(_networks, "frazcoin", {
  messagePrefix: "\x18FrazCoin Signed Message:\n",
  pubKeyHash: 0x23,
  wif: 0xA3
}), _defineProperty(_networks, "freicoin", {
  messagePrefix: "\x18Freicoin Signed Message:\n",
  pubKeyHash: 0x00,
  wif: 0x80
}), _defineProperty(_networks, "fudcoin", {
  messagePrefix: "\x18FUDcoin Signed Message:\n",
  pubKeyHash: 0x23,
  wif: 0xa3
}), _defineProperty(_networks, "fuelcoin", {
  messagePrefix: "\x18Fuelcoin Signed Message:\n",
  pubKeyHash: 0x24,
  wif: 0x80
}), _defineProperty(_networks, "gabencoin", {
  messagePrefix: "\x18GabenCoin Signed Message:\n",
  pubKeyHash: 0x10,
  wif: 0x90
}), _defineProperty(_networks, "garlicoin", {
  messagePrefix: "\x18Garlicoin Signed Message:\n",
  pubKeyHash: 0x26,
  wif: 0xb0
}), _defineProperty(_networks, "globalboost", {
  messagePrefix: "\x18GlobalBoost Signed Message:\n",
  pubKeyHash: 0x26,
  wif: 0xa6
}), _defineProperty(_networks, "goodcoin", {
  messagePrefix: "\x18Goodcoin Signed Message:\n",
  pubKeyHash: 0x26,
  wif: 0xa6
}), _defineProperty(_networks, "gridcoinresearch", {
  messagePrefix: "\x18GridcoinResearch Signed Message:\n",
  pubKeyHash: 0x3e,
  wif: 0xbe
}), _defineProperty(_networks, "guncoin", {
  messagePrefix: "\x18Guncoin Signed Message:\n",
  pubKeyHash: 0x27,
  wif: 0xa7
}), _defineProperty(_networks, "hamradiocoin", {
  messagePrefix: "\x18HamRadioCoin Signed Message:\n",
  pubKeyHash: 0x00,
  wif: 0x80
}), _defineProperty(_networks, "hfrcoin", {
  messagePrefix: "\x18HFRcoin Signed Message:\n",
  pubKeyHash: 0x10,
  wif: 0x90
}), _defineProperty(_networks, "htmlcoin", {
  messagePrefix: "\x18HTMLCoin Signed Message:\n",
  pubKeyHash: 0x29,
  wif: 0xa9
}), _defineProperty(_networks, "hyperstake", {
  messagePrefix: "\x18HyperStake Signed Message:\n",
  pubKeyHash: 0x75,
  wif: 0xf5
}), _defineProperty(_networks, "imperiumcoin", {
  messagePrefix: "\x18ImperiumCoin Signed Message:\n",
  pubKeyHash: 0x30,
  wif: 0xb0
}), _defineProperty(_networks, "incakoin", {
  messagePrefix: "\x18IncaKoin Signed Message:\n",
  pubKeyHash: 0x35,
  wif: 0xb5
}), _defineProperty(_networks, "incognitocoin", {
  messagePrefix: "\x18IncognitoCoin Signed Message:\n",
  pubKeyHash: 0x00,
  wif: 0x80
}), _defineProperty(_networks, "influxcoin", {
  messagePrefix: "\x18Influxcoin Signed Message:\n",
  pubKeyHash: 0x66,
  wif: 0xe6
}), _defineProperty(_networks, "iridiumcoin", {
  messagePrefix: "\x18IridiumCoin Signed Message:\n",
  pubKeyHash: 0x30,
  wif: 0xb0
}), _defineProperty(_networks, "icash", {
  messagePrefix: "\x18iCash Signed Message:\n",
  pubKeyHash: 0x66,
  wif: 0xcc
}), _defineProperty(_networks, "judgecoin", {
  messagePrefix: "\x18Judgecoin Signed Message:\n",
  pubKeyHash: 0x2b,
  wif: 0xab
}), _defineProperty(_networks, "jumbucks", {
  messagePrefix: "\x18Jumbucks Signed Message:\n",
  pubKeyHash: 0x2b,
  wif: 0xab
}), _defineProperty(_networks, "khcoin", {
  messagePrefix: "\x18KHcoin Signed Message:\n",
  pubKeyHash: 0x30,
  wif: 0xb0
}), _defineProperty(_networks, "kittehcoin", {
  messagePrefix: "\x18KittehCoin Signed Message:\n",
  pubKeyHash: 0x2d,
  wif: 0xad
}), _defineProperty(_networks, "latium", {
  messagePrefix: "\x18Latium Signed Message:\n",
  pubKeyHash: 0x17,
  wif: 0x80
}), _defineProperty(_networks, "litedoge", {
  messagePrefix: "\x18LiteDoge Signed Message:\n",
  pubKeyHash: 0x5a,
  wif: 0xab
}), _defineProperty(_networks, "lomocoin", {
  messagePrefix: "\x18LoMoCoin Signed Message:\n",
  pubKeyHash: 0x30,
  wif: 0xb0
}), _defineProperty(_networks, "madbytecoin", {
  messagePrefix: "\x18MadbyteCoin Signed Message:\n",
  pubKeyHash: 0x32,
  wif: 0x6e
}), _defineProperty(_networks, "magicinternetmoney", {
  messagePrefix: "\x18MagicInternetMoney Signed Message:\n",
  pubKeyHash: 0x30,
  wif: 0xb0
}), _defineProperty(_networks, "magicoin", {
  messagePrefix: "\x18Magicoin Signed Message:\n",
  pubKeyHash: 0x14,
  wif: 0x94
}), _defineProperty(_networks, "martexcoin", {
  messagePrefix: "\x18MarteXcoin Signed Message:\n",
  pubKeyHash: 0x32,
  wif: 0xb2
}), _defineProperty(_networks, "masterdoge", {
  messagePrefix: "\x18MasterDoge Signed Message:\n",
  pubKeyHash: 0x33,
  wif: 0x8b
}), _defineProperty(_networks, "mintcoin", {
  messagePrefix: "\x18MintCoin Signed Message:\n",
  pubKeyHash: 0x33,
  wif: 0xb3
}), _defineProperty(_networks, "mobiuscoin", {
  messagePrefix: "\x18MobiusCoin Signed Message:\n",
  pubKeyHash: 0x00,
  wif: 0x80
}), _defineProperty(_networks, "monocle", {
  messagePrefix: "\x18Monocle Signed Message:\n",
  pubKeyHash: 0x32,
  wif: 0xb2
}), _defineProperty(_networks, "mooncoin", {
  messagePrefix: "\x18Monocle Signed Message:\n",
  pubKeyHash: 0x03,
  wif: 0x83
}), _defineProperty(_networks, "needlecoin", {
  messagePrefix: "\x18NeedleCoin Signed Message:\n",
  pubKeyHash: 0x35,
  wif: 0xb5
}), _defineProperty(_networks, "neetcoin", {
  messagePrefix: "\x18NeetCoin Signed Message:\n",
  pubKeyHash: 0x35,
  wif: 0xb5
}), _defineProperty(_networks, "nubits", {
  messagePrefix: "\x18Nubits Signed Message:\n",
  pubKeyHash: 0x19,
  wif: 0xbf
}), _defineProperty(_networks, "nyancoin", {
  messagePrefix: "\x18Nyancoin Signed Message:\n",
  pubKeyHash: 0x2d,
  wif: 0xad
}), _defineProperty(_networks, "ocupy", {
  messagePrefix: "\x18Ocupy Signed Message:\n",
  pubKeyHash: 0x73,
  wif: 0xf3
}), _defineProperty(_networks, "omnicoin", {
  messagePrefix: "\x18Omnicoin Signed Message:\n",
  pubKeyHash: 0x73,
  wif: 0xf3
}), _defineProperty(_networks, "onyxcoin", {
  messagePrefix: "\x18Onyxcoin Signed Message:\n",
  pubKeyHash: 0x73,
  wif: 0xf3
}), _defineProperty(_networks, "paccoin", {
  messagePrefix: "\x18PacCoin Signed Message:\n",
  pubKeyHash: 0x18,
  wif: 0x98
}), _defineProperty(_networks, "paycoin", {
  messagePrefix: "\x18Paycoin Signed Message:\n",
  pubKeyHash: 0x37,
  wif: 0xb7
}), _defineProperty(_networks, "parkbyte", {
  messagePrefix: "\x18ParkByte Signed Message:\n",
  pubKeyHash: 0x37,
  wif: 0xb7
}), _defineProperty(_networks, "phcoin", {
  messagePrefix: "\x18PHCoin Signed Message:\n",
  pubKeyHash: 0x37,
  wif: 0xb7
}), _defineProperty(_networks, "phoenixcoin", {
  messagePrefix: "\x18PhoenixCoin Signed Message:\n",
  pubKeyHash: 0x38,
  wif: 0xb8
}), _defineProperty(_networks, "piggycoin", {
  messagePrefix: "\x18PiggyCoin Signed Message:\n",
  pubKeyHash: 0x76,
  wif: 0xf6
}), _defineProperty(_networks, "prospercoinclassic", {
  messagePrefix: "\x18ProsperCoinClassic Signed Message:\n",
  pubKeyHash: 0x3a,
  wif: 0xba
}), _defineProperty(_networks, "qubitcoin", {
  messagePrefix: "\x18Qubitcoin Signed Message:\n",
  pubKeyHash: 0x26,
  wif: 0xe0
}), _defineProperty(_networks, "riecoin", {
  messagePrefix: "\x18Riecoin Signed Message:\n",
  pubKeyHash: 0x3c,
  wif: 0x80
}), _defineProperty(_networks, "rimbit", {
  messagePrefix: "\x18Rimbit Signed Message:\n",
  pubKeyHash: 0x3c,
  wif: 0xbc
}), _defineProperty(_networks, "roicoin", {
  messagePrefix: "\x18ROIcoin Signed Message:\n",
  pubKeyHash: 0x3c,
  wif: 0x80
}), _defineProperty(_networks, "rupaya", {
  messagePrefix: "\x18Rupaya Signed Message:\n",
  pubKeyHash: 0x3c,
  wif: 0xbc
}), _defineProperty(_networks, "sambacoin", {
  messagePrefix: "\x18Sambacoin Signed Message:\n",
  pubKeyHash: 0x3e,
  wif: 0xbe
}), _defineProperty(_networks, "seckcoin", {
  messagePrefix: "\x18SecKCoin Signed Message:\n",
  pubKeyHash: 0x3f,
  wif: 0xbf
}), _defineProperty(_networks, "sixeleven", {
  messagePrefix: "\x18SixEleven Signed Message:\n",
  pubKeyHash: 0x34,
  wif: 0x80
}), _defineProperty(_networks, "spreadcoin", {
  messagePrefix: "\x18SpreadCoin Signed Message:\n",
  pubKeyHash: 0x3f,
  wif: 0xbf
}), _defineProperty(_networks, "stealthcoin", {
  messagePrefix: "\x18StealthCoin Signed Message:\n",
  pubKeyHash: 0x3e,
  wif: 0xbe
}), _defineProperty(_networks, "swagbucks", {
  messagePrefix: "\x18SwagBucks Signed Message:\n",
  pubKeyHash: 0x3f,
  wif: 0x99
}), _defineProperty(_networks, "titcoin", {
  messagePrefix: "\x18Titcoin Signed Message:\n",
  pubKeyHash: 0x00,
  wif: 0x80
}), _defineProperty(_networks, "tittiecoin", {
  messagePrefix: "\x18TittieCoin Signed Message:\n",
  pubKeyHash: 0x41,
  wif: 0xc1
}), _defineProperty(_networks, "topcoin", {
  messagePrefix: "\x18Topcoin Signed Message:\n",
  pubKeyHash: 0x42,
  wif: 0xc2
}), _defineProperty(_networks, "treasurehuntcoin", {
  messagePrefix: "\x18TreasureHuntCoin Signed Message:\n",
  pubKeyHash: 0x32,
  wif: 0xb2
}), _defineProperty(_networks, "trezarcoin", {
  messagePrefix: "\x18TrezarCoin Signed Message:\n",
  pubKeyHash: 0x42,
  wif: 0xC2
}), _defineProperty(_networks, "usde", {
  messagePrefix: "\x18USDe Signed Message:\n",
  pubKeyHash: 0x26,
  wif: 0xa6
}), _defineProperty(_networks, "versioncoin", {
  messagePrefix: "\x18Versioncoin Signed Message:\n",
  pubKeyHash: 0x46,
  wif: 0xc6
}), _defineProperty(_networks, "vikingcoin", {
  messagePrefix: "\x18VikingCoin Signed Message:\n",
  pubKeyHash: 0x46,
  wif: 0x56
}), _defineProperty(_networks, "w2coin", {
  messagePrefix: "\x18W2Coin Signed Message:\n",
  pubKeyHash: 0x49,
  wif: 0xc9
}), _defineProperty(_networks, "wacoins", {
  messagePrefix: "\x18WACoins Signed Message:\n",
  pubKeyHash: 0x49,
  wif: 0xc9
}), _defineProperty(_networks, "wankcoin", {
  messagePrefix: "\x18WankCoin Signed Message:\n",
  pubKeyHash: 0x00,
  wif: 0x80
}), _defineProperty(_networks, "wearesatoshicoin", {
  messagePrefix: "\x18WeAreSatoshiCoin Signed Message:\n",
  pubKeyHash: 0x87,
  wif: 0x97
}), _defineProperty(_networks, "worldcoin", {
  messagePrefix: "\x18WorldCoin Signed Message:\n",
  pubKeyHash: 0x49,
  wif: 0xc9
}), _defineProperty(_networks, "xp", {
  messagePrefix: "\x18XP Signed Message:\n",
  pubKeyHash: 0x4b,
  wif: 0xcb
}), _defineProperty(_networks, "yenten", {
  messagePrefix: "\x18Yenten Signed Message:\n",
  pubKeyHash: 0x4e,
  wif: 0x7b
}), _defineProperty(_networks, "wlc21", {
  messagePrefix: '\x19Komodo Signed Message:\n',
  bip44: 141,
  bip32: {
    "public": 0x0488b21e,
    "private": 0x0488ade4
  },
  pubKeyHash: 0x3c,
  scriptHash: 0x55,
  wif: 0xbc,
  consensusBranchId: {
    1: 0x00,
    2: 0x00,
    3: 0x5ba81b19,
    4: 0x76b809bb
  },
  dustThreshold: 1000,
  isZcash: true,
  sapling: true
}), _networks);

var _require = require('./coin-helpers'),
    kmdAssetChains = _require.kmdAssetChains;

var acNetworkData = JSON.parse(JSON.stringify(networks.kmd));
delete acNetworkData.kmdInterest;

for (var i = 0; i < kmdAssetChains.length; i++) {
  if (!networks[kmdAssetChains[i].toLowerCase()] && kmdAssetChains[i].toLowerCase() !== 'pirate') {
    networks[kmdAssetChains[i].toLowerCase()] = acNetworkData;
  }
}

module.exports = networks;