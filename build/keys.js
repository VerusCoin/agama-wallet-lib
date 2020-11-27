"use strict";

var sha256 = require('js-sha256');

var bigi = require('bigi');

var bitcoin = require('bitgo-utxo-lib');

var bs58check = require('bs58check');

var bip39 = require('bip39');

var bip32 = require('bip32');

var ethersWallet = require('ethers/wallet');

var ethUtil = require('ethereumjs-util');

var wif = require('wif');

var bitcoinjsNetworks = require('./bitcoinjs-networks'); // TODO: grs/emc2 multisig fix


var addressVersionCheck = function addressVersionCheck(network, address) {
  try {
    var _b58check = bitcoin.address.fromBase58Check(address);

    if (_b58check.version === network.pubKeyHash || _b58check.version === network.scriptHash) {
      return true;
    }

    return false;
  } catch (e) {
    return 'Invalid pub address';
  }
};

var wifToWif = function wifToWif(_wif, network) {
  var key;

  if (network && network.hasOwnProperty('compressed') && network.compressed === true) {
    var decoded = wif.decode(_wif);
    var d = bigi.fromBuffer(decoded.privateKey);
    key = new bitcoin.ECPair(d, null, {
      network: network
    });
  } else {
    key = new bitcoin.ECPair.fromWIF(_wif, network, true);
  }

  return {
    pub: key.getAddress(),
    priv: key.toWIF(),
    pubHex: key.getPublicKeyBuffer().toString('hex')
  };
};

var seedToWif = function seedToWif(seed, network, iguana) {
  var isWif = false;

  try {
    bs58check.decode(seed);
    isWif = true;
    throw new Error('provided string is a WIF key');
  } catch (e) {
    if (!isWif) {
      var hash = sha256.create().update(seed);
      var bytes = hash.array();

      if (iguana) {
        bytes[0] &= 248;
        bytes[31] &= 127;
        bytes[31] |= 64;
      }

      var d = bigi.fromBuffer(bytes);
      var keyPair;

      if (network && network.hasOwnProperty('compressed') && network.compressed === true) {
        keyPair = new bitcoin.ECPair(d, null, {
          compressed: true,
          network: network
        });
      } else {
        keyPair = new bitcoin.ECPair(d, null, {
          network: network
        });
      }

      return {
        pub: keyPair.getAddress(),
        priv: keyPair.toWIF(),
        pubHex: keyPair.getPublicKeyBuffer().toString('hex')
      };
    }

    throw new Error('provided string is a WIF key');
  }
}; // login like function


var stringToWif = function stringToWif(string, network, iguana) {
  var _wifError = false;
  var isWif = false;
  var keys; // watchonly

  if (string.match('^[a-zA-Z0-9]{34}$')) {
    return {
      priv: string,
      pub: string,
      isPub: true
    };
  }

  try {
    bs58check.decode(string);
    isWif = true;
  } catch (e) {}

  if (isWif) {
    try {
      var key;

      if (network && network.hasOwnProperty('compressed') && network.compressed === true) {
        var decoded = wif.decode(string);
        var d = bigi.fromBuffer(decoded.privateKey);
        key = new bitcoin.ECPair(d, null, {
          network: network
        });
      } else {
        key = new bitcoin.ECPair.fromWIF(string, network, true);
      }

      keys = {
        priv: key.toWIF(),
        pub: key.getAddress(),
        pubHex: key.getPublicKeyBuffer().toString('hex')
      };
    } catch (e) {
      _wifError = true;
    }
  } else {
    keys = seedToWif(string, network, iguana);
  }

  return _wifError ? 'error' : keys;
};

var bip39Search = function bip39Search(seed, network, matchPattern, addressDepth, accountsCount, includeChangeAddresses, addressDepthOffset, accountCountOffset) {
  seed = bip39.mnemonicToSeed(seed);
  var hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, network);
  var _defaultAddressDepth = addressDepth;
  var _defaultAccountCount = accountsCount;
  var _addresses = [];

  var _matchingKey = matchPattern ? [] : {};

  accountCountOffset = !accountCountOffset ? 0 : accountCountOffset;
  addressDepthOffset = !addressDepthOffset ? 0 : addressDepthOffset;

  for (var i = Number(accountCountOffset); i < Number(accountCountOffset) + Number(_defaultAccountCount); i++) {
    for (var j = 0; j < (includeChangeAddresses ? 2 : 1); j++) {
      for (var k = Number(addressDepthOffset); k < Number(addressDepthOffset) + Number(_defaultAddressDepth); k++) {
        var _key = hdMaster.derivePath("m/44'/141'/".concat(i, "'/").concat(j, "/").concat(k));

        if (!matchPattern) {
          _matchingKey.push({
            path: "m/44'/141'/".concat(i, "'/").concat(j, "/").concat(k),
            pub: _key.keyPair.getAddress(),
            priv: _key.keyPair.toWIF()
          });
        } else if (_key.keyPair.getAddress() === matchPattern) {
          _matchingKey = {
            pub: _key.keyPair.getAddress(),
            priv: _key.keyPair.toWIF()
          };
        }
      }
    }
  }

  return _matchingKey || 'address is not found';
}; // src: https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/ecpair.js#L62


var fromWif = function fromWif(string, network, versionCheck) {
  var decoded = wif.decode(string);
  var version = decoded.version;
  if (!network) throw new Error('Unknown network version');

  if (versionCheck) {
    if (network.wifAlt && version !== network.wif && network.wifAlt.indexOf(version) === -1) throw new Error('Invalid network version');
    if (!network.wifAlt && version !== network.wif) throw new Error('Invalid network version');
  }

  var d = bigi.fromBuffer(decoded.privateKey);
  var masterKP;

  if (network && network.hasOwnProperty('compressed') && network.compressed === true) {
    var _decoded = wif.decode(string);

    var _d = bigi.fromBuffer(_decoded.privateKey);

    masterKP = new bitcoin.ECPair(_d, null, {
      compressed: true,
      network: network
    });
  } else {
    masterKP = new bitcoin.ECPair(d, null, {
      network: network
    });
  }

  if (network.wifAlt) {
    var altKP = [];

    for (var i = 0; i < network.wifAlt.length; i++) {
      var _network = JSON.parse(JSON.stringify(network));

      _network.wif = network.wifAlt[i];

      var _altKP = new bitcoin.ECPair(d, null, {
        network: _network
      });

      altKP.push({
        pub: _altKP.getAddress(),
        priv: _altKP.toWIF(),
        version: network.wifAlt[i]
      });
    }

    return {
      inputKey: decoded,
      master: {
        pub: masterKP.getAddress(),
        priv: masterKP.toWIF(),
        version: network.wif
      },
      alt: altKP
    };
  }

  return {
    inputKey: decoded,
    master: {
      pub: masterKP.getAddress(),
      priv: masterKP.toWIF(),
      version: network.wif
    }
  };
};

var pubkeyToAddress = function pubkeyToAddress(pubkey, network) {
  try {
    var publicKey = Buffer.from(pubkey, 'hex');
    var publicKeyHash = bitcoin.crypto.hash160(publicKey);
    var address = bitcoin.address.toBase58Check(publicKeyHash, network.pubKeyHash);
    return address;
  } catch (e) {
    return false;
  }
}; // priv can be a valid priv key or a seed


var etherKeys = function etherKeys(priv, iguana) {
  try {
    if (ethUtil.isValidPrivate(ethUtil.toBuffer(priv))) {
      return new ethersWallet.Wallet(priv);
    }
  } catch (e) {}

  var hash = sha256.create().update(priv);
  var bytes = hash.array();

  if (iguana) {
    bytes[0] &= 248;
    bytes[31] &= 127;
    bytes[31] |= 64;
  }

  var _wallet = new ethersWallet.Wallet(ethUtil.bufferToHex(bytes));

  return _wallet;
}; // https://github.com/bitcoinjs/bitcoinjs-lib/blob/582727f6de251441c75027a6292699b6f1e1b8f2/test/integration/bip32.js#L31
// btc forks only


var xpub = function xpub(seed, options) {
  var _seed = bip39.mnemonicToSeed(seed);

  var node = options && options.network ? bip32.fromSeed(_seed, options.network) : bip32.fromSeed(_seed);
  var string;

  if (options && options.hasOwnProperty('bip32')) {
    string = node.neutered().toBase58();
  } else if (options && options.hasOwnProperty('path')) {
    string = node.derivePath(options.path).neutered().toBase58();
  } else {
    return 'missing path arg';
  }

  return string;
};

var btcToEthPriv = function btcToEthPriv(_wif) {
  var decodedWif = wif.decode(_wif);
  var ethWallet = new ethersWallet.Wallet(ethUtil.bufferToHex(decodedWif.privateKey));
  return ethWallet.signingKey.privateKey;
};

var ethToBtcWif = function ethToBtcWif(priv, network) {
  var buf = ethUtil.toBuffer(priv);
  var d = bigi.fromBuffer(buf);

  if (network) {
    return new bitcoin.ECPair(d, null, {
      compressed: true,
      network: network
    }).toWIF();
  }

  return new bitcoin.ECPair(d, null, {
    compressed: true,
    network: bitcoinjsNetworks.btc
  }).toWIF();
};

var seedToPriv = function seedToPriv(string, dest) {
  try {
    bs58check.decode(string);
    return dest === 'btc' ? string : btcToEthPriv(string);
  } catch (e) {}

  try {
    if (ethUtil.isValidPrivate(ethUtil.toBuffer(string))) {
      return dest === 'eth' ? string : ethToBtcWif(string);
    }
  } catch (e) {}

  return string;
}; // pubKeys - array containing pub key hash hex
// note: likely won't work for PoS lib


var multisigGenerate = function multisigGenerate(NofN, pubKeys, network) {
  if (!pubKeys || pubKeys.length < NofN) {
    throw "Error pubKeys length is less than NofN (".concat(NofN, " vs ").concat(pubKeys.length, ")");
  } else {
    var _pubKeys = pubKeys.map(function (hex) {
      return Buffer.from(hex, 'hex');
    });

    var redeemScript = bitcoin.script.multisig.output.encode(NofN, _pubKeys);
    var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript));
    var address = network ? bitcoin.address.fromOutputScript(scriptPubKey, network) : bitcoin.address.fromOutputScript(scriptPubKey);
    return {
      address: address,
      scriptPubKey: scriptPubKey.toString('hex'),
      redeemScript: redeemScript.toString('hex')
    };
  }
};

var redeemScriptToPubAddress = function redeemScriptToPubAddress(scriptPubKey, network) {
  return network ? bitcoin.address.fromOutputScript(Buffer.from(scriptPubKey, 'hex'), network) : bitcoin.address.fromOutputScript(Buffer.from(scriptPubKey, 'hex'));
};

var decodeRedeemScript = function decodeRedeemScript(redeemScript, options) {
  var decodedRedeemScript = bitcoin.script.multisig.output.decode(Buffer.from(redeemScript, 'hex'));

  if (options && options.hasOwnProperty('toHex') && options.toHex === true) {
    var _pubKeys = decodedRedeemScript.pubKeys;

    for (var i = 0; i < _pubKeys.length; i++) {
      decodedRedeemScript.pubKeys[i] = decodedRedeemScript.pubKeys[i].toString('hex');
    }
  }

  return decodedRedeemScript;
}; // ref: https://github.com/bitcoinjs/bitcoinjs-lib/issues/990


var pubToElectrumScriptHashHex = function pubToElectrumScriptHashHex(address, network) {
  var script = bitcoin.address.toOutputScript(address, network || bitcoinjsNetworks.btc);
  var hash = bitcoin.crypto.sha256(script);
  var reversedHash = Buffer.from(hash.reverse());
  return reversedHash.toString('hex');
};

var getAddressVersion = function getAddressVersion(address) {
  try {
    var _b58check = bitcoin.address.fromBase58Check(address);

    var _items = [];

    for (var key in bitcoinjsNetworks) {
      if (_b58check.version === bitcoinjsNetworks[key].pubKeyHash || _b58check.version === bitcoinjsNetworks[key].scriptHash) {
        if (key !== 'vrsc' && key !== 'komodo') {
          _items.push(key);
        }
      }
    }

    return _items.length ? {
      coins: _items,
      version: _b58check.version
    } : 'Unknown or invalid pub address';
  } catch (e) {
    return 'Invalid pub address';
  }
};

var pubToPub = function pubToPub(address, networkSrc, networkDest) {
  var script = bitcoin.address.toOutputScript(address, networkSrc || bitcoinjsNetworks.btc);
  return bitcoin.address.fromOutputScript(Buffer.from(script, 'hex'), networkDest || bitcoinjsNetworks.btc);
};

var isPrivKey = function isPrivKey(str) {
  var isPrivKey = false;

  try {
    if (ethUtil.isValidPrivate(ethUtil.toBuffer(str))) {
      isPrivKey = true;
    }
  } catch (e) {
    try {
      bs58check.decode(str);
      isPrivKey = true;
    } catch (e) {}
  }

  return isPrivKey;
};

module.exports = {
  bip39Search: bip39Search,
  addressVersionCheck: addressVersionCheck,
  wifToWif: wifToWif,
  seedToWif: seedToWif,
  stringToWif: stringToWif,
  fromWif: fromWif,
  pubkeyToAddress: pubkeyToAddress,
  etherKeys: etherKeys,
  xpub: xpub,
  btcToEthPriv: btcToEthPriv,
  ethToBtcWif: ethToBtcWif,
  seedToPriv: seedToPriv,
  multisig: {
    generate: multisigGenerate,
    redeemScriptToPubAddress: redeemScriptToPubAddress,
    decodeRedeemScript: decodeRedeemScript
  },
  pubToElectrumScriptHashHex: pubToElectrumScriptHashHex,
  getAddressVersion: getAddressVersion,
  pubToPub: pubToPub,
  isPrivKey: isPrivKey
};