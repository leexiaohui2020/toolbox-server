'use strict';
const url = require('url');
const cheerio = require('cheerio');
const Service = require('egg').Service;

// 连接格式化
function urlFormatter(link) {
  if (!/https?:\/\//.test(link)) {
    return url.resolve('https://www.shipuxiu.com/', link);
  }
  return link;
}

class ShipuService extends Service {

  // 获取食材分类
  async menu() {
    const { ctx } = this;
    const { data: res } = await ctx.curl('https://www.shipuxiu.com/shicai/', {
      dataType: 'text',
    });
    const $ = cheerio.load(res, { decodeEntities: false });
    const list = [];

    $('.scTxt > a').each((i, e) => {
      const id = $(e).attr('href');
      const text = $(e).text();
      list.push({ id, text });
    });

    return list;
  }

  // 获取食材分类详情
  async getMenuItem(opts = {}) {
    const { ctx } = this;
    const { id } = opts;
    const { data: res } = await ctx.curl(urlFormatter(id), { dataType: 'text' });
    const $ = cheerio.load(res, { decodeEntities: false });
    const list = [];

    $('.scBox ul.clearfix a').each((i, e) => {
      const id = $(e).attr('href');
      const img = urlFormatter($('img', e).attr('src'));
      const text = $('span', e).text();
      list.push({ id, img, text });
    });

    const title = $('.scTxt').text();
    return { title, list };
  }

  // 获取食材做法大全
  async getItemDetail(opts) {
    const { ctx } = this;
    const { id } = opts;
    const { data: res } = await ctx.curl(urlFormatter(id), { dataType: 'text' });
    const $ = cheerio.load(res, { decodeEntities: false });
    const cover = urlFormatter($('.tFaceL > img').attr('src'));
    const intro = $('.tFaceR').text().trim().split('\n');
    const list = [];

    $('.caipulist > ul a').each((i, e) => {
      const id = $(e).attr('href');
      const img = urlFormatter($('img', e).attr('src'));
      const text = $('span', e).text();
      list.push({ id, img, text });
    });

    const nextId = $('.pages .current + a').attr('href') || '';

    return { cover, intro, list, nextId };
  }

  // 获取菜谱详情
  async getCaiPu(opts) {
    const { ctx } = this;
    const { id } = opts;
    const { data: res } = await ctx.curl(urlFormatter(opts.id), { dataType: 'text' });
    const $ = cheerio.load(res, { decodeEntities: false });

    // 作者
    const author = {
      name: $('span.author').text(),
      avatarUrl: urlFormatter($('.author1 > a > img').attr('src')),
    };
    // 基本信息
    const baseInfo = {
      title: $('.recipe-show > p').text(),
      intro: $('.recipe-show > .desc').text().trim(),
      cover: urlFormatter($('img.photo').attr('src')),
    };
    // 配方
    const material = [];
    let materialTag = null;

    $('.material > ul > li').each((i, e) => {
      const $e = $(e);
      if ($e.hasClass('imit_h2')) {
        materialTag = {
          tagName: $e.text().replace('：', ''),
          material: [],
        };
        material.push(materialTag);
        return;
      }

      if (!materialTag) return;

      const name = $('.name', e).text().trim();
      const amount = $('.amount', e).text();
      if (name && amount) {
        materialTag.material.push({ name, amount });
      }
    });

    // 步骤
    const steps = [];
    $('dl.step > dd').each((i, e) => {
      const img = urlFormatter($('img', e).attr('src'));
      const text = $('.sstep', e).text().trim().split('.').slice(1).join('.');
      if (text) {
        steps.push({ img, text });
      }
    });

    return { author, baseInfo, material, steps };
  }
}

module.exports = ShipuService;
