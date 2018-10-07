'use strict';

var sha256 = require('js-sha256');
var crypto = require('crypto');
var bigi = require('bigi');
var bitcoinZcash = require('bitcoinjs-lib-zcash');
var bitcoin = require('bitcoinjs-lib');
var bitcoinPos = require('bitcoinjs-lib-pos');
var bs58check = require('bs58check');
var bip39 = require('bip39');

var addressVersionCheck = function addressVersionCheck(network, address) {
  try {
    var _b58check = network.isZcash ? bitcoinZcash.address.fromBase58Check(address) : bitcoin.address.fromBase58Check(address);

    if (_b58check.version === network.pubKeyHash || _b58check.version === network.scriptHash) {
      return true;
    }
    return false;
  } catch (e) {
    return 'Invalid pub address';
  }
};

var wifToWif = function wifToWif(wif, network) {
  var key = void 0;

  if (network.isZcash) {
    key = new bitcoinZcash.ECPair.fromWIF(wif, network, true);
  } else {
    key = new bitcoin.ECPair.fromWIF(wif, network, true);
  }

  return {
    pub: key.getAddress(),
    priv: key.toWIF(),
    pubHex: key.getPublicKeyBuffer().toString('hex')
  };
};

var seedToWif = function seedToWif(seed, network, iguana) {
  var hash = sha256.create().update(seed);
  var bytes = hash.array();

  if (iguana) {
    bytes[0] &= 248;
    bytes[31] &= 127;
    bytes[31] |= 64;
  }

  var d = bigi.fromBuffer(bytes);
  var keyPair = void 0;

  if (network.isZcash) {
    keyPair = new bitcoinZcash.ECPair(d, null, { network: network });
  } else {
    keyPair = new bitcoin.ECPair(d, null, { network: network });
  }

  var keys = {
    pub: keyPair.getAddress(),
    priv: keyPair.toWIF(),
    pubHex: keyPair.getPublicKeyBuffer().toString('hex')
  };

  return keys;
};

// login like function
var stringToWif = function stringToWif(string, network, iguana) {
  var _wifError = false;
  var isWif = false;
  var keys = void 0;

  // watchonly
  if (string.match('^[a-zA-Z0-9]{34}$')) {
    return {
      priv: string,
      pub: string
    };
  }
  try {
    bs58check.decode(string);
    isWif = true;
  } catch (e) {}

  if (isWif) {
    try {
      if (network.isZcash) {
        key = new bitcoinZcash.ECPair.fromWIF(string, network, true);
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
        var _key = hdMaster.derivePath('m/44\'/141\'/' + i + '\'/' + j + '/' + k);

        if (!matchPattern) {
          _matchingKey.push({
            path: 'm/44\'/141\'/' + i + '\'/' + j + '/' + k,
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
};

// src: https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/ecpair.js#L62
var fromWif = function fromWif(string, network) {
  var decoded = wif.decode(string);
  var version = decoded.version;

  if (!network) throw new Error('Unknown network version');
  if (network.wifAlt && version !== network.wif && network.wifAlt.indexOf(version) === -1) throw new Error('Invalid network version');
  if (!network.wifAlt && version !== network.wif) throw new Error('Invalid network version');

  var d = bigi.fromBuffer(decoded.privateKey);

  var masterKP = network.isZcash ? new bitcoinZcash.ECPair(d, null, {
    compressed: !decoded.compressed,
    network: network
  }) : new bitcoin.ECPair(d, null, {
    compressed: !decoded.compressed,
    network: network
  });

  if (network.wifAlt) {
    var altKP = [];

    for (var i = 0; i < network.wifAlt.length; i++) {
      var _network = JSON.parse(JSON.stringify(network));
      _network.wif = network.wifAlt[i];

      var _altKP = network.isZcash ? new bitcoinZcash.ECPair(d, null, {
        compressed: !decoded.compressed,
        network: _network
      }) : new bitcoin.ECPair(d, null, {
        compressed: !decoded.compressed,
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
    var publicKey = new Buffer(pubkey, 'hex');
    var publicKeyHash = bitcoin.crypto.hash160(publicKey);
    var address = network.isZcash ? bitcoinZcash.address.toBase58Check(publicKeyHash, network.pubKeyHash) : bitcoin.address.toBase58Check(publicKeyHash, network.pubKeyHash);

    return address;
  } catch (e) {
    return false;
  }
};

module.exports = {
  bip39Search: bip39Search,
  addressVersionCheck: addressVersionCheck,
  wifToWif: wifToWif,
  seedToWif: seedToWif,
  stringToWif: stringToWif,
  fromWif: fromWif,
  pubkeyToAddress: pubkeyToAddress
};