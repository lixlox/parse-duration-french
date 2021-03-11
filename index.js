"use strict";

var duration = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([a-zµμ]*)/gi;

module.exports = parse;
// enable default import syntax in typescript
module.exports.default = parse;

/**
 * conversion ratios
 */

parse.nanoseconde = parse.ns = 1 / 1e6;

parse["µs"] = parse["μs"] = parse.us = parse.microsecond = 1 / 1e3;

parse.milliseconde = parse.ms = 1;

parse.seconde = parse.sec = parse.s = parse.ms * 1000;

parse.minute = parse.min = parse.m = parse.s * 60;

parse.heure = parse.hr = parse.h = parse.m * 60;

parse.jour = parse.j = parse.h * 24;

parse.semaine = parse.sem = parse.w = parse.d * 7;

parse.mois = parse.d * (365.25 / 12);

parse.annee = parse.ans = parse.y = parse.d * 365.25;

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} format
 * @return {Number}
 */

function parse(str = "", format = "ms") {
  var result = null;
  // ignore commas
  str = str.replace(/(\d),(\d)/g, "$1$2");
  str.replace(duration, function (_, n, units) {
    units = parse[units] || parse[units.toLowerCase().replace(/s$/, "")];
    if (units) result = (result || 0) + parseFloat(n, 10) * units;
  });

  return result && result / parse[format];
}
