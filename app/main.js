// Black Friday Deal Finder 2026 — hand-written UI logic.
// No libraries, no fetch, no network: everything renders from data.js.

(function () {
  "use strict";

  var deals = window.DEALS || [];
  var meta = window.SITE_META || {};

  var state = {
    query: "",
    retailer: "All",
    category: "All",
    sort: "discount-desc"
  };

  var $ = function (id) { return document.getElementById(id); };
  var dealsEl = $("deals");
  var countEl = $("count");
  var emptyEl = $("empty");

  function money(n) {
    return "$" + n.toFixed(2);
  }

  function discountPct(d) {
    return Math.round((d.was - d.price) / d.was * 1000) / 10;
  }

  function savings(d) {
    return Math.round((d.was - d.price) * 100) / 100;
  }

  // Real-deal signal: the discount itself is the evidence.
  function dealTag(d) {
    var pct = discountPct(d);
    if (pct >= 40) return { label: "HOT", cls: "hot" };
    if (pct >= 25) return { label: "GOOD", cls: "good" };
    return { label: "OK", cls: "ok" };
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function retailerClass(r) {
    return r.toLowerCase().replace(/[^a-z]/g, "");
  }

  function cardHtml(d) {
    var tag = dealTag(d);
    return (
      '<article class="card">' +
        '<div class="card-top">' +
          '<span class="retailer ' + retailerClass(d.retailer) + '">' + esc(d.retailer) + '</span>' +
          '<span class="category">' + esc(d.category) + '</span>' +
        '</div>' +
        '<h2>' + esc(d.title) + '</h2>' +
        '<div class="price-row">' +
          '<span class="price">' + money(d.price) + '</span>' +
          '<span class="was">' + money(d.was) + '</span>' +
          '<span class="tag ' + tag.cls + '">' + tag.label + ' −' + discountPct(d) + '%</span>' +
        '</div>' +
        '<div class="save">You save ' + money(savings(d)) + ' (' + discountPct(d) + '% off)</div>' +
        '<p class="note">' + esc(d.note) + '</p>' +
        '<p class="checked">on the retailer page · ' + esc(d.checked) + ' Beijing</p>' +
        '<a class="view" href="' + esc(d.link) + '" target="_blank" rel="noopener">View deal at ' + esc(d.retailer) + ' →</a>' +
      '</article>'
    );
  }

  function filtered() {
    var q = state.query.trim().toLowerCase();
    var list = deals.filter(function (d) {
      if (state.retailer !== "All" && d.retailer !== state.retailer) return false;
      if (state.category !== "All" && d.category !== state.category) return false;
      if (q) {
        var hay = (d.title + " " + d.retailer + " " + d.category + " " + d.note).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
    var sorters = {
      "discount-desc": function (a, b) { return discountPct(b) - discountPct(a); },
      "savings-desc": function (a, b) { return savings(b) - savings(a); },
      "price-asc": function (a, b) { return a.price - b.price; },
      "price-desc": function (a, b) { return b.price - a.price; },
      "title-asc": function (a, b) { return a.title.localeCompare(b.title); }
    };
    list.sort(sorters[state.sort] || sorters["discount-desc"]);
    return list;
  }

  function render() {
    var list = filtered();
    dealsEl.innerHTML = list.map(cardHtml).join("");
    countEl.textContent = list.length + " of " + deals.length + " deals";
    emptyEl.hidden = list.length !== 0;
  }

  function chipGroup(el, values, key) {
    el.innerHTML = "";
    ["All"].concat(values).forEach(function (v) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip" + (state[key] === v ? " active" : "");
      b.textContent = v;
      b.setAttribute("aria-pressed", state[key] === v ? "true" : "false");
      b.addEventListener("click", function () {
        state[key] = v;
        chipGroup(el, values, key);
        render();
      });
      el.appendChild(b);
    });
  }

  function renderStats() {
    var totalSaved = deals.reduce(function (sum, d) { return sum + savings(d); }, 0);
    var best = deals.reduce(function (a, b) { return discountPct(b) > discountPct(a) ? b : a; }, deals[0]);
    $("stats").innerHTML =
      '<span class="stat"><b>' + deals.length + '</b> verified deals</span>' +
      '<span class="stat"><b>' + meta.retailers.length + '</b> retailers</span>' +
      '<span class="stat"><b>' + meta.categories.length + '</b> categories</span>' +
      '<span class="stat">Total savings <b>' + money(totalSaved) + '</b></span>' +
      '<span class="stat">Best deal <b>−' + discountPct(best) + '%</b></span>';
    $("updated").textContent = meta.updated + " (Beijing)";
  }

  $("search").addEventListener("input", function (e) {
    state.query = e.target.value;
    render();
  });

  $("sort").addEventListener("change", function (e) {
    state.sort = e.target.value;
    render();
  });

  chipGroup($("retailerFilters"), meta.retailers, "retailer");
  chipGroup($("categoryFilters"), meta.categories, "category");
  renderStats();
  render();
})();
