(function () {
  "use strict";

  var config = window.WEDDING_CONFIG || {};

  function patchMeta() {
    if (config.pageTitle) document.title = config.pageTitle;

    var descParts = [config.dateDisplay, config.venueDisplay].filter(Boolean);
    var description = descParts.join(" - ");

    [
      ['meta[property="og:title"]',        config.pageTitle],
      ['meta[name="twitter:title"]',       config.pageTitle],
      ['meta[name="description"]',         description],
      ['meta[property="og:description"]',  description],
      ['meta[name="twitter:description"]', description]
    ].forEach(function (pair) {
      var el = document.querySelector(pair[0]);
      if (el && pair[1]) el.setAttribute("content", pair[1]);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", patchMeta);
  } else {
    patchMeta();
  }
})();
