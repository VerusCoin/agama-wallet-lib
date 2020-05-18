"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
MIT License

Copyright (c) 2017 Yuki Akiyama, SuperNET
Copyright (c) 2017 - 2019 SuperNET

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Supported coin types: bitcoin, bitcoin forks BTG and BCH, zcash based coins, PoS type coins
*/
var bitcoin = require('bitgo-utxo-lib'); // zcash tx decode fallback


var _require = require('tx-builder/src/buffer-read'),
    readSlice = _require.readSlice,
    readInt32 = _require.readInt32,
    readUInt32 = _require.readUInt32;

var _require2 = require('tx-builder/src/compose-read'),
    compose = _require2.compose,
    addProp = _require2.addProp;

var _require3 = require('tx-builder/src/tx-decoder'),
    readInputs = _require3.readInputs,
    readInput = _require3.readInput,
    readOutput = _require3.readOutput;

var crypto = require('crypto');

var _sha256 = function _sha256(data) {
  return crypto.createHash('sha256').update(data).digest();
};

var decodeFormat = function decodeFormat(tx) {
  var result = {
    txid: tx.getId(),
    version: tx.version,
    locktime: tx.locktime
  };
  return result;
};

var decodeInput = function decodeInput(tx) {
  var result = [];
  tx.ins.forEach(function (input, n) {
    var vin = {
      txid: !input.hash.reverse ? input.hash : input.hash.reverse().toString('hex'),
      n: input.index,
      script: bitcoin.script.toASM(input.script),
      sequence: input.sequence
    };
    result.push(vin);
  });
  return result;
};

var decodeOutput = function decodeOutput(tx, network) {
  var format = function format(out, n, network) {
    var vout = {
      satoshi: out.value,
      value: (1e-8 * out.value).toFixed(8),
      n: n,
      scriptPubKey: {
        asm: bitcoin.script.toASM(out.script),
        hex: out.script.toString('hex'),
        type: bitcoin.script.classifyOutput(out.script),
        addresses: []
      }
    };

    switch (vout.scriptPubKey.type) {
      case 'pubkeyhash':
        vout.scriptPubKey.addresses.push(bitcoin.address.fromOutputScript(out.script, network));
        break;

      case 'pubkey':
        var pubKeyBuffer = Buffer.from(vout.scriptPubKey.asm.split(' ')[0], 'hex');
        vout.scriptPubKey.addresses.push(bitcoin.ECPair.fromPublicKeyBuffer(pubKeyBuffer, network).getAddress());
        break;

      case 'scripthash':
        vout.scriptPubKey.addresses.push(bitcoin.address.fromOutputScript(out.script, network));
        break;
    }

    return vout;
  };

  var result = [];
  tx.outs.forEach(function (out, n) {
    result.push(format(out, n, network));
  });
  return result;
};

var transactionDecoder = function transactionDecoder(rawtx, network, debug) {
  if (debug) {
    var _tx = bitcoin.Transaction.fromHex(rawtx, network || null);

    return {
      tx: _tx,
      network: network,
      format: decodeFormat(_tx),
      inputs: decodeInput(_tx, network),
      outputs: decodeOutput(_tx, network)
    };
  }

  if (network.isZcash) {
    var _tx2 = bitcoin.Transaction.fromHex(rawtx, network);

    if (_tx2.joinsplits || _tx2.vShieldedSpend || _tx2.vShieldedOutput) {
      var buffer = Buffer.from(rawtx, 'hex');

      var readHash = function readHash(buffer) {
        var _readSlice = readSlice(32)(_sha256(_sha256(buffer))),
            _readSlice2 = _slicedToArray(_readSlice, 2),
            res = _readSlice2[0],
            bufferLeft = _readSlice2[1];

        var hash = Buffer.from(res, 'hex').reverse().toString('hex');
        return hash;
      };

      _tx2.getId = function () {
        return readHash(buffer);
      };

      return {
        tx: _tx2,
        network: network,
        format: decodeFormat(_tx2),
        inputs: !_tx2.ins.length ? [{
          txid: '0000000000000000000000000000000000000000000000000000000000000000'
        }] : decodeInput(_tx2, network),
        outputs: decodeOutput(_tx2, network)
      };
    }
  }

  try {
    var _tx3 = bitcoin.Transaction.fromHex(rawtx, network);

    return {
      tx: _tx3,
      network: network,
      format: decodeFormat(_tx3),
      inputs: decodeInput(_tx3, network),
      outputs: decodeOutput(_tx3, network)
    };
  } catch (e) {
    return false;
  }
};

module.exports = transactionDecoder;