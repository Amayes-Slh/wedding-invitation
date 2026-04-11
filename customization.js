(function () {
  "use strict";

  var config = window.WEDDING_CONFIG || {};
  var replacements = config.textReplacements || {};
  var root = document.documentElement;
  var fallbackRegexReplacements = [
    [/Laura\s*&\s*Javier/gi, config.coupleNames || "Amayes & Manel"],
    [/\bBoda\b/gi, "Mariage"],
    [/\bBarcelona\b/gi, "Paris"],
    [/Confirma tu asistencia/gi, "Confirme ta presence"]
  ];

  function replaceInText(input) {
    var output = input;
    Object.keys(replacements).forEach(function (from) {
      var to = replacements[from];
      if (!from || typeof to !== "string") return;
      output = output.split(from).join(to);
    });
    fallbackRegexReplacements.forEach(function (pair) {
      output = output.replace(pair[0], pair[1]);
    });
    return output;
  }

  function patchMeta() {
    if (config.pageTitle) document.title = config.pageTitle;

    var title = config.pageTitle || config.coupleNames;
    var descParts = [config.dateDisplay, config.venueDisplay].filter(Boolean);
    var description = descParts.join(" - ");

    [
      ['meta[property="og:title"]', title],
      ['meta[name="twitter:title"]', title],
      ['meta[name="description"]', description],
      ['meta[property="og:description"]', description],
      ['meta[name="twitter:description"]', description]
    ].forEach(function (pair) {
      var selector = pair[0];
      var value = pair[1];
      if (!value) return;
      var el = document.querySelector(selector);
      if (el) el.setAttribute("content", value);
    });
  }

  function patchTextNodes() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue || !node.nodeValue.trim()) continue;
      var next = replaceInText(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    }
  }

  function patchAttributes() {
    var nodes = document.querySelectorAll("[aria-label],[title],[placeholder]");
    nodes.forEach(function (el) {
      ["aria-label", "title", "placeholder"].forEach(function (attr) {
        var value = el.getAttribute(attr);
        if (!value) return;
        var next = replaceInText(value);
        if (next !== value) el.setAttribute(attr, next);
      });
    });
  }

  function applyAll() {
    if (!document.body) return;
    patchMeta();
    patchTextNodes();
    patchAttributes();
    root.setAttribute("data-customized", "true");
  }

  var observer = new MutationObserver(function () {
    // React can update existing text nodes; re-apply replacements continuously.
    applyAll();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyAll();
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      });
    });
  } else {
    applyAll();
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }
})();
