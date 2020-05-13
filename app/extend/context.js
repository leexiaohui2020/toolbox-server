'use strict';
exports.handler = function(data) {
  if (data instanceof Error) {
    this.body = { status: 'err', errmsg: data.message };
  } else {
    this.body = { status: 'ok', data };
  }
}
