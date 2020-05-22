'use strict';
module.exports = () => {

  return async function(ctx, next) {
    const { token } = ctx.headers;
    if (!token) return ctx.handler(new Error('授权失败'));
    const admin = await ctx.model.Admin.findOne({ token });
    if (!admin) return ctx.handler(new Error('授权失败'));
    ctx.admin = admin;
    await next();
  };
};
