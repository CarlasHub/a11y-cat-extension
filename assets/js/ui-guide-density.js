(function () {
  function openTargetDetails() {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    if (!target) return;
    var d = target.closest('details');
    while (d) {
      d.open = true;
      d = d.parentElement ? d.parentElement.closest('details') : null;
    }
  }

  function wrapFeatureArticles() {
    var grid = document.querySelector('.feature-grid');
    if (!grid) return;
    var cards = Array.from(grid.children).filter(function (n) { return n.tagName === 'ARTICLE'; });
    cards.forEach(function (article, index) {
      var heading = article.querySelector('h3');
      if (!heading) return;
      var summaryText = heading.textContent.replace(/\s+/g, ' ').trim();
      var details = document.createElement('details');
      details.className = 'feature-accordion';
      if (index < 3) details.open = true;
      var summary = document.createElement('summary');
      summary.textContent = summaryText;
      article.classList.add('feature-accordion__body');
      article.parentNode.insertBefore(details, article);
      details.appendChild(summary);
      details.appendChild(article);
    });
  }

  function wrapGuideSections() {
    var main = document.getElementById('main-content');
    if (!main) return;
    var sections = Array.from(main.querySelectorAll(':scope > section.section-panel'));
    sections.forEach(function (section, index) {
      var h2 = section.querySelector(':scope > h2');
      if (!h2 || index < 2) return;
      var details = document.createElement('details');
      details.className = 'guide-section';
      details.open = index < 4;

      var summary = document.createElement('summary');
      summary.textContent = h2.textContent.replace(/\s+/g, ' ').trim();
      details.appendChild(summary);

      while (section.firstChild) {
        details.appendChild(section.firstChild);
      }

      section.appendChild(details);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('docs-page--guide')) return;
    wrapGuideSections();
    wrapFeatureArticles();
    openTargetDetails();
    window.addEventListener('hashchange', openTargetDetails);
  });
})();
