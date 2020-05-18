"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var transactionType = function transactionType(tx, targetAddress, isKomodo, options) {
  // TODO: - sum vins / sum vouts to the same address
  //       - multi vin multi vout
  //       - detect change address
  //       - double check for exact sum input/output values
  var result = [];
  var _parse = {
    inputs: {},
    outputs: {}
  };
  var _sum = {
    inputs: 0,
    outputs: 0
  };
  var _total = {
    inputs: 0,
    outputs: 0
  };
  var _addresses = {
    inputs: [],
    outputs: []
  };

  if (tx.format === 'cant parse') {
    return {
      type: 'unknown',
      amount: 'unknown',
      address: targetAddress,
      timestamp: tx.timestamp,
      txid: tx.format.txid,
      confirmations: tx.confirmations
    };
  }

  for (var key in _parse) {
    if (!tx[key].length) {
      _parse[key] = [];

      _parse[key].push(tx[key]);
    } else {
      _parse[key] = tx[key];
    }

    for (var i = 0; i < _parse[key].length; i++) {
      _total[key] += Number(_parse[key][i].value); // ignore op return outputs

      if (_parse[key][i].scriptPubKey && _parse[key][i].scriptPubKey.addresses && _parse[key][i].scriptPubKey.addresses[0] && _parse[key][i].scriptPubKey.addresses[0] === targetAddress && _parse[key][i].value) {
        _sum[key] += Number(_parse[key][i].value);
      }

      if (_parse[key][i].scriptPubKey && _parse[key][i].scriptPubKey.addresses && _parse[key][i].scriptPubKey.addresses[0]) {
        _addresses[key].push(_parse[key][i].scriptPubKey.addresses[0]);

        if (_parse[key][i].scriptPubKey.addresses[0] === targetAddress && options && options.skipTargetAddress) {
          _addresses[key].pop();
        }
      }
    }
  }

  _addresses.inputs = _toConsumableArray(new Set(_addresses.inputs));
  _addresses.outputs = _toConsumableArray(new Set(_addresses.outputs));
  var isSelfSend = {
    inputs: false,
    outputs: false
  };

  for (var _key in _parse) {
    for (var _i = 0; _i < _addresses[_key].length; _i++) {
      if (_addresses[_key][_i] === targetAddress && _addresses[_key].length === 1) {
        isSelfSend[_key] = true;
      }
    }
  }

  if (_sum.inputs > 0 && _sum.outputs > 0) {
    // vin + change, break into two tx
    // send to self
    if (isSelfSend.inputs && isSelfSend.outputs) {
      result = {
        type: 'self',
        amount: _sum.inputs === _sum.outputs ? Number(_sum.outputs).toFixed(8) : Number(_sum.inputs - _sum.outputs).toFixed(8),
        amountIn: Number(_sum.inputs).toFixed(8),
        amountOut: Number(_sum.outputs).toFixed(8),
        totalIn: Number(_total.inputs).toFixed(8),
        totalOut: Number(_total.outputs).toFixed(8),
        fee: Number(_total.inputs - _total.outputs).toFixed(8),
        address: targetAddress,
        timestamp: tx.timestamp,
        txid: tx.format.txid,
        confirmations: tx.confirmations
      };

      if (isKomodo) {
        // calc claimed interest amount
        var vinVoutDiff = _total.inputs - _total.outputs;

        if (vinVoutDiff < 0) {
          result.interest = Number(vinVoutDiff.toFixed(8));
        }
      }
    } else {
      result = {
        type: 'sent',
        amount: Number(isKomodo && _sum.inputs - _sum.outputs < 0 ? _total.outputs - _sum.outputs : _sum.inputs - _sum.outputs).toFixed(8),
        amountIn: Number(_sum.inputs).toFixed(8),
        amountOut: Number(_sum.outputs).toFixed(8),
        totalIn: Number(_total.inputs).toFixed(8),
        totalOut: Number(_total.outputs).toFixed(8),
        fee: Number(_total.inputs - _total.outputs).toFixed(8),
        address: _addresses.outputs[0],
        timestamp: tx.timestamp,
        txid: tx.format.txid,
        confirmations: tx.confirmations,
        from: _addresses.inputs,
        to: _addresses.outputs
      };

      if (isKomodo) {
        // calc claimed interest amount
        var _vinVoutDiff = _total.inputs - _total.outputs;

        if (_vinVoutDiff < 0) {
          result.interest = Number(_vinVoutDiff.toFixed(8));
        }
      }
    }
  } else if (_sum.inputs === 0 && _sum.outputs > 0) {
    result = {
      type: 'received',
      amount: Number(_sum.outputs).toFixed(8),
      amountIn: Number(_sum.inputs).toFixed(8),
      amountOut: Number(_sum.outputs).toFixed(8),
      totalIn: Number(_total.inputs).toFixed(8),
      totalOut: Number(_total.outputs).toFixed(8),
      fee: Number(_total.inputs - _total.outputs).toFixed(8),
      address: targetAddress,
      timestamp: tx.timestamp,
      txid: tx.format.txid,
      confirmations: tx.confirmations,
      inputAddresses: _addresses.inputs,
      outputAddresses: _addresses.outputs
    };
  } else if (_sum.inputs > 0 && _sum.outputs === 0) {
    result = {
      type: 'sent',
      amount: Number(_sum.inputs).toFixed(8),
      amountIn: Number(_sum.inputs).toFixed(8),
      amountOut: Number(_sum.outputs).toFixed(8),
      totalIn: Number(_total.inputs).toFixed(8),
      totalOut: Number(_total.outputs).toFixed(8),
      fee: Number(_total.inputs - _total.outputs).toFixed(8),
      address: isSelfSend.inputs && isSelfSend.outputs ? targetAddress : _addresses.outputs[0],
      timestamp: tx.timestamp,
      txid: tx.format.txid,
      confirmations: tx.confirmations,
      inputAddresses: _addresses.inputs,
      outputAddresses: _addresses.outputs
    };

    if (isKomodo) {
      // calc claimed interest amount
      var _vinVoutDiff2 = _total.inputs - _total.outputs;

      if (_vinVoutDiff2 < 0) {
        result.interest = Number(_vinVoutDiff2.toFixed(8));
      }
    }
  } else {
    // (?)
    result = {
      type: 'other',
      amount: 'unknown',
      address: 'unknown',
      timestamp: tx.timestamp,
      txid: tx.format.txid,
      confirmations: tx.confirmations
    };
  }

  return result;
};

module.exports = transactionType;