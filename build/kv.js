"use strict";

/*
  KV lite format description:

  kv-version:encryption:tag:content

  kv-version: two bytes representing format version

  tag: any string 64 length max
  name: any string 64 length max

  predefined formats

  profile:
  01 0 profile
  ex. 010 profile john doe RjaTxL1QYdEp2cMAJaWXS3E1XThcTKT5Mj slack @jdoe, email jdoe@johndoe.com

  profile content format
  raddress:name:content
  name: any string 64 length max
  raddress: raddress, 64 bytes

  content format
  title:version:content

  title: any string 128 length max
  version: version(revision) of content
  content: any string 4096 chars max

  random content example:
  01:0:0:post:test post from john doe:test test test 1234
*/
var KV_OPRETURN_MAX_SIZE_BYTES = 8192;
var KV_VERSION = {
  current: '01',
  minSupported: '01'
}; // fixed size

var KV_HEADER_SIZE = [2, // kv version
1, // encrypted
64 // tag
]; // variable size

var KV_CONTENT_HEADER_SIZE = [3, // content version
64, // previous txid
128 // title
];
var KV_MAX_CONTENT_SIZE = 4096;

encode = function encode(data) {
  var kvBuf = [Buffer.alloc(KV_HEADER_SIZE[0]), Buffer.alloc(KV_HEADER_SIZE[1]), Buffer.alloc(KV_HEADER_SIZE[2]), Buffer.alloc(KV_CONTENT_HEADER_SIZE[0]), Buffer.alloc(KV_CONTENT_HEADER_SIZE[1]), Buffer.alloc(KV_CONTENT_HEADER_SIZE[2]), Buffer.alloc(data.content.body.length)];
  kvBuf[0].write(KV_VERSION.current);
  kvBuf[1].write('0');
  kvBuf[2].write(data.tag);
  kvBuf[3].write(data.content.version.toString() || '1');
  kvBuf[4].write(data.content.parent ? data.content.parent : '0000000000000000000000000000000000000000000000000000000000000000');
  kvBuf[5].write(data.content.title);
  kvBuf[6].write(data.content.body);
  var out = Buffer.concat(kvBuf);

  if (out.toString('hex').length > KV_MAX_CONTENT_SIZE + KV_CONTENT_HEADER_SIZE[0] + KV_CONTENT_HEADER_SIZE[1] + KV_CONTENT_HEADER_SIZE[2]) {
    return -1;
  }

  return out.toString('hex');
};

decode = function decode(hex, fromTx) {
  if (fromTx) {
    hex = Buffer.from(hex, 'hex').toString();
  }

  var _kvBuf = Buffer.from(hex, 'hex');

  var kvBuf = [_kvBuf.slice(0, KV_HEADER_SIZE[0]), _kvBuf.slice(KV_HEADER_SIZE[0], KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1]), _kvBuf.slice(KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1], KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1] + KV_HEADER_SIZE[2]), _kvBuf.slice(KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1] + KV_HEADER_SIZE[2], KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1] + KV_HEADER_SIZE[2] + KV_CONTENT_HEADER_SIZE[0]), _kvBuf.slice(KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1] + KV_HEADER_SIZE[2] + KV_CONTENT_HEADER_SIZE[0], KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1] + KV_HEADER_SIZE[2] + KV_CONTENT_HEADER_SIZE[0] + KV_CONTENT_HEADER_SIZE[1]), _kvBuf.slice(KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1] + KV_HEADER_SIZE[2] + KV_CONTENT_HEADER_SIZE[0] + KV_CONTENT_HEADER_SIZE[1], KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1] + KV_HEADER_SIZE[2] + KV_CONTENT_HEADER_SIZE[0] + KV_CONTENT_HEADER_SIZE[1] + KV_CONTENT_HEADER_SIZE[2]), _kvBuf.slice(KV_HEADER_SIZE[0] + KV_HEADER_SIZE[1] + KV_HEADER_SIZE[2] + KV_CONTENT_HEADER_SIZE[0] + KV_CONTENT_HEADER_SIZE[1] + KV_CONTENT_HEADER_SIZE[2], _kvBuf.length)];
  var out = {
    version: kvBuf[0].toString().replace(/\0/g, ''),
    encrypted: kvBuf[1].toString().replace(/\0/g, ''),
    tag: kvBuf[2].toString().replace(/\0/g, ''),
    content: {
      version: kvBuf[3].toString().replace(/\0/g, ''),
      parent: kvBuf[4].toString().replace(/\0/g, ''),
      title: kvBuf[5].toString().replace(/\0/g, ''),
      body: kvBuf[6].toString().replace(/\0/g, '')
    }
  };

  if (out.version && out.encrypted && out.content.version) {
    return out;
  } else {
    return false;
  }
};

module.exports = {
  encode: encode,
  decode: decode
};