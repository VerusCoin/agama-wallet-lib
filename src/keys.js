const sha256 = require('js-sha256');
const bigi = require('bigi');
const bitcoin = require('bitgo-utxo-lib');
const bs58check = require('bs58check');
const bip39 = require('bip39');
const bip32 = require('bip32');
const ethersWallet = require('ethers/wallet');
const ethUtil = require('ethereumjs-util');
const wif = require('wif');
const bitcoinjsNetworks = require('./bitcoinjs-networks');

// TODO: grs/emc2 multisig fix

const addressVersionCheck = (network, address) => {
  try {
    const _b58check = bitcoin.address.fromBase58Check(address);

    if (_b58check.version === network.pubKeyHash
        || _b58check.version === network.scriptHash) {
      return true;
    }

    return false;
  } catch (e) {
    return 'Invalid pub address';
  }
};

const wifToWif = (_wif, network) => {
  let key;


  if (network
      && network.hasOwnProperty('compressed')
      && network.compressed === true) {
    const decoded = wif.decode(_wif);
    const d = bigi.fromBuffer(decoded.privateKey);
    key = new bitcoin.ECPair(d, null, {
      network,
    });
  } else {
    key = new bitcoin.ECPair.fromWIF(_wif, network, true);
  }


  return {
    pub: key.getAddress(),
    priv: key.toWIF(),
    pubHex: key.getPublicKeyBuffer().toString('hex'),
  };
};

const seedToWif = (seed, network, iguana) => {
  let isWif = false;

  try {
    bs58check.decode(seed);
    isWif = true;
    throw new Error('provided string is a WIF key');
  } catch (e) {
    if (!isWif) {
      const hash = sha256.create().update(seed);
      const bytes = hash.array();

      if (iguana) {
        bytes[0] &= 248;
        bytes[31] &= 127;
        bytes[31] |= 64;
      }

      const d = bigi.fromBuffer(bytes);
      let keyPair;


      if (network
          && network.hasOwnProperty('compressed')
          && network.compressed === true) {
        keyPair = new bitcoin.ECPair(d, null, {
          compressed: true,
          network,
        });
      } else {
        keyPair = new bitcoin.ECPair(d, null, { network });
      }

      return {
        pub: keyPair.getAddress(),
        priv: keyPair.toWIF(),
        pubHex: keyPair.getPublicKeyBuffer().toString('hex'),
      };
    }
    throw new Error('provided string is a WIF key');
  }
};

// login like function
const stringToWif = (string, network, iguana) => {
  let _wifError = false;
  let isWif = false;
  let keys;

  // watchonly
  if (string.match('^[a-zA-Z0-9]{34}$')) {
    return {
      priv: string,
      pub: string,
      isPub: true,
    };
  }

  try {
    bs58check.decode(string);
    isWif = true;
  } catch (e) {}

  if (isWif) {
    try {
      let key;
      if (network
          && network.hasOwnProperty('compressed')
          && network.compressed === true) {
        const decoded = wif.decode(string);
        const d = bigi.fromBuffer(decoded.privateKey);
        key = new bitcoin.ECPair(d, null, {
          network,
        });
      } else {
        key = new bitcoin.ECPair.fromWIF(string, network, true);
      }


      keys = {
        priv: key.toWIF(),
        pub: key.getAddress(),
        pubHex: key.getPublicKeyBuffer().toString('hex'),
      };
    } catch (e) {
      _wifError = true;
    }
  } else {
    keys = seedToWif(string, network, iguana);
  }

  return _wifError ? 'error' : keys;
};

const bip39Search = (seed, network, matchPattern, addressDepth, accountsCount, includeChangeAddresses, addressDepthOffset, accountCountOffset) => {
  seed = bip39.mnemonicToSeed(seed);
  const hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, network);
  const _defaultAddressDepth = addressDepth;
  const _defaultAccountCount = accountsCount;
  const _addresses = [];
  let _matchingKey = matchPattern ? [] : {};
  accountCountOffset = !accountCountOffset ? 0 : accountCountOffset;
  addressDepthOffset = !addressDepthOffset ? 0 : addressDepthOffset;

  for (let i = Number(accountCountOffset); i < Number(accountCountOffset) + Number(_defaultAccountCount); i++) {
    for (let j = 0; j < (includeChangeAddresses ? 2 : 1); j++) {
      for (let k = Number(addressDepthOffset); k < Number(addressDepthOffset) + Number(_defaultAddressDepth); k++) {
        const _key = hdMaster.derivePath(`m/44'/141'/${i}'/${j}/${k}`);

        if (!matchPattern) {
          _matchingKey.push({
            path: `m/44'/141'/${i}'/${j}/${k}`,
            pub: _key.keyPair.getAddress(),
            priv: _key.keyPair.toWIF(),
          });
        } else if (_key.keyPair.getAddress() === matchPattern) {
          _matchingKey = {
            pub: _key.keyPair.getAddress(),
            priv: _key.keyPair.toWIF(),
          };
        }
      }
    }
  }

  return _matchingKey || 'address is not found';
};

// src: https://github.com/bitcoinjs/bitcoinjs-lib/blob/master/src/ecpair.js#L62
const fromWif = (string, network, versionCheck) => {
  const decoded = wif.decode(string);
  const { version } = decoded;

  if (!network) throw new Error('Unknown network version');

  if (versionCheck) {
    if (network.wifAlt && version !== network.wif && network.wifAlt.indexOf(version) === -1) throw new Error('Invalid network version');
    if (!network.wifAlt && version !== network.wif) throw new Error('Invalid network version');
  }

  const d = bigi.fromBuffer(decoded.privateKey);
  let masterKP;

  if (network
        && network.hasOwnProperty('compressed')
        && network.compressed === true) {
    const decoded = wif.decode(string);
    const d = bigi.fromBuffer(decoded.privateKey);
    masterKP = new bitcoin.ECPair(d, null, {
      compressed: true,
      network,
    });
  } else {
    masterKP = new bitcoin.ECPair(d, null, {
      network,
    });
  }

  if (network.wifAlt) {
    const altKP = [];

    for (let i = 0; i < network.wifAlt.length; i++) {
      const _network = JSON.parse(JSON.stringify(network));
      _network.wif = network.wifAlt[i];

      const _altKP = new bitcoin.ECPair(d, null, {
        network: _network,
      });

      altKP.push({
        pub: _altKP.getAddress(),
        priv: _altKP.toWIF(),
        version: network.wifAlt[i],
      });
    }

    return {
      inputKey: decoded,
      master: {
        pub: masterKP.getAddress(),
        priv: masterKP.toWIF(),
        version: network.wif,
      },
      alt: altKP,
    };
  }

  return {
    inputKey: decoded,
    master: {
      pub: masterKP.getAddress(),
      priv: masterKP.toWIF(),
      version: network.wif,
    },
  };
};

const pubkeyToAddress = (pubkey, network) => {
  try {
    const publicKey = Buffer.from(pubkey, 'hex');
    const publicKeyHash = bitcoin.crypto.hash160(publicKey);
    const address = bitcoin.address.toBase58Check(publicKeyHash, network.pubKeyHash);

    return address;
  } catch (e) {
    return false;
  }
};

// priv can be a valid priv key or a seed
const etherKeys = (priv, iguana) => {
  try {
    if (ethUtil.isValidPrivate(ethUtil.toBuffer(priv))) {
      return new ethersWallet.Wallet(priv);
    }  
  } catch (e) {}
  
  const hash = sha256.create().update(priv);
  const bytes = hash.array();

  if (iguana) {
    bytes[0] &= 248;
    bytes[31] &= 127;
    bytes[31] |= 64;
  }

  const _wallet = new ethersWallet.Wallet(ethUtil.bufferToHex(bytes));

  return _wallet;
};

// https://github.com/bitcoinjs/bitcoinjs-lib/blob/582727f6de251441c75027a6292699b6f1e1b8f2/test/integration/bip32.js#L31
// btc forks only
const xpub = (seed, options) => {
  const _seed = bip39.mnemonicToSeed(seed);
  const node = options && options.network ? bip32.fromSeed(_seed, options.network) : bip32.fromSeed(_seed);
  let string;

  if (options
      && options.hasOwnProperty('bip32')) {
    string = node.neutered().toBase58();
  } else if (options
        && options.hasOwnProperty('path')) {
    string = node.derivePath(options.path).neutered().toBase58();
  } else {
    return 'missing path arg';
  }

  return string;
};

const btcToEthPriv = (_wif) => {
  const decodedWif = wif.decode(_wif);
  const ethWallet = new ethersWallet.Wallet(ethUtil.bufferToHex(decodedWif.privateKey));

  return ethWallet.signingKey.privateKey;
};

const ethToBtcWif = (priv, network) => {
  const buf = ethUtil.toBuffer(priv);
  const d = bigi.fromBuffer(buf);

  if (network) {
    return new bitcoin.ECPair(d, null, {
      compressed: true,
      network,
    }).toWIF();
  }
  return new bitcoin.ECPair(d, null, {
    compressed: true,
    network: bitcoinjsNetworks.btc,
  }).toWIF();
};

const seedToPriv = (string, dest) => {
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
};

// pubKeys - array containing pub key hash hex
// note: likely won't work for PoS lib
const multisigGenerate = (NofN, pubKeys, network) => {
  if (!pubKeys
      || pubKeys.length < NofN) {
    throw (`Error pubKeys length is less than NofN (${NofN} vs ${pubKeys.length})`);
  } else {
    const _pubKeys = pubKeys.map(hex => Buffer.from(hex, 'hex'));
    const redeemScript = bitcoin.script.multisig.output.encode(NofN, _pubKeys);
    const scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript));
    const address = network
      ? bitcoin.address.fromOutputScript(scriptPubKey, network)
      : bitcoin.address.fromOutputScript(scriptPubKey);

    return {
      address,
      scriptPubKey: scriptPubKey.toString('hex'),
      redeemScript: redeemScript.toString('hex'),
    };
  }
};

const redeemScriptToPubAddress = (scriptPubKey, network) => (network
  ? bitcoin.address.fromOutputScript(Buffer.from(scriptPubKey, 'hex'), network)
  : bitcoin.address.fromOutputScript(Buffer.from(scriptPubKey, 'hex')));

const decodeRedeemScript = (redeemScript, options) => {
  const decodedRedeemScript = bitcoin.script.multisig.output.decode(Buffer.from(redeemScript, 'hex'));

  if (options
      && options.hasOwnProperty('toHex')
      && options.toHex === true) {
    const _pubKeys = decodedRedeemScript.pubKeys;

    for (let i = 0; i < _pubKeys.length; i++) {
      decodedRedeemScript.pubKeys[i] = decodedRedeemScript.pubKeys[i].toString('hex');
    }
  }

  return decodedRedeemScript;
};

// ref: https://github.com/bitcoinjs/bitcoinjs-lib/issues/990
const pubToElectrumScriptHashHex = (address, network) => {
  const script = bitcoin.address.toOutputScript(address, network || bitcoinjsNetworks.btc);
  const hash = bitcoin.crypto.sha256(script);
  const reversedHash = Buffer.from(hash.reverse());

  return reversedHash.toString('hex');
};

const getAddressVersion = (address) => {
  try {
    const _b58check = bitcoin.address.fromBase58Check(address);
    const _items = [];

    for (const key in bitcoinjsNetworks) {
      if (_b58check.version === bitcoinjsNetworks[key].pubKeyHash
          || _b58check.version === bitcoinjsNetworks[key].scriptHash) {
        if (key !== 'vrsc'
            && key !== 'komodo') {
          _items.push(key);
        }
      }
    }

    return _items.length ? {
      coins: _items,
      version: _b58check.version,
    } : 'Unknown or invalid pub address';
  } catch (e) {
    return 'Invalid pub address';
  }
};

const pubToPub = (address, networkSrc, networkDest) => {
  const script = bitcoin.address.toOutputScript(address, networkSrc || bitcoinjsNetworks.btc);

  return bitcoin.address.fromOutputScript(Buffer.from(script, 'hex'), networkDest || bitcoinjsNetworks.btc);
};

const isPrivKey = (str) => {
  let isPrivKey = false;

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
  bip39Search,
  addressVersionCheck,
  wifToWif,
  seedToWif,
  stringToWif,
  fromWif,
  pubkeyToAddress,
  etherKeys,
  xpub,
  btcToEthPriv,
  ethToBtcWif,
  seedToPriv,
  multisig: {
    generate: multisigGenerate,
    redeemScriptToPubAddress,
    decodeRedeemScript,
  },
  pubToElectrumScriptHashHex,
  getAddressVersion,
  pubToPub,
  isPrivKey,
};
