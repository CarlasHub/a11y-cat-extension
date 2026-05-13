(function initialiseA11YCatSideNavigation() {
  'use strict';

  const sideNav = document.querySelector('.side-nav, .docs-sidebar');
  if (!sideNav) return;

  const currentPath = normalisePath(window.location.pathname);
  const pageLinks = Array.from(sideNav.querySelectorAll('a[href]'));
  const topNavLinks = Array.from(document.querySelectorAll('.top-nav a[href], .header-nav a[href]'));

  markCurrentPage(pageLinks, currentPath);
  markCurrentPage(topNavLinks, currentPath);
  buildPageSectionNavigation(sideNav);

  function normalisePath(pathname) {
    return String(pathname || '')
      .replace(/\/index\.html$/i, '/')
      .replace(/\/$/, '/index.html');
  }

  function linkPath(link) {
    try {
      return normalisePath(new URL(link.getAttribute('href'), window.location.href).pathname);
    } catch (_error) {
      return '';
    }
  }

  function markCurrentPage(links, path) {
    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (!href || href.startsWith('#') || /^https?:\/\//i.test(href)) return;
      if (linkPath(link) !== path) return;
      link.classList.add('is-current-page');
      link.setAttribute('aria-current', 'page');
    });
  }

  function buildPageSectionNavigation(container) {
    const article = document.querySelector('.doc-article, .docs-main');
    if (!article) return;

    const headings = Array.from(article.querySelectorAll('h2'))
      .filter((heading) => heading.textContent && heading.textContent.trim());
    if (headings.length < 2) return;

    const usedIds = new Set(Array.from(document.querySelectorAll('[id]')).map((node) => node.id));
    headings.forEach((heading) => {
      if (heading.id) return;
      const base = slugify(heading.textContent);
      let id = base || 'section';
      let counter = 2;
      while (usedIds.has(id)) {
        id = `${base || 'section'}-${counter}`;
        counter += 1;
      }
      heading.id = id;
      usedIds.add(id);
    });

    const sectionTitle = document.createElement('p');
    sectionTitle.className = 'side-nav-title side-nav-title--sections';
    sectionTitle.textContent = 'On this page';

    const nav = document.createElement('nav');
    nav.className = 'side-nav__page-sections';
    nav.setAttribute('aria-label', 'Sections on this page');

    const list = document.createElement('ol');
    list.className = 'side-nav__section-list';

    const sectionLinks = headings.map((heading) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.trim();
      link.dataset.sideNavSection = heading.id;
      link.addEventListener('click', () => {
        setActiveSection(link, sectionLinks);
        userSelectedUntil = Date.now() + 650;
      });
      item.appendChild(link);
      list.appendChild(item);
      return link;
    });

    let userSelectedUntil = 0;
    nav.appendChild(list);
    container.appendChild(sectionTitle);
    container.appendChild(nav);

    const updateActiveSection = () => {
      if (Date.now() < userSelectedUntil) return;
      const activeHeading = currentHeadingInViewport(headings);
      if (!activeHeading) return;
      const activeLink = sectionLinks.find((link) => link.dataset.sideNavSection === activeHeading.id);
      if (activeLink) setActiveSection(activeLink, sectionLinks);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(updateActiveSection, {
        root: null,
        rootMargin: '-22% 0px -60% 0px',
        threshold: [0, 0.1, 0.4, 0.8, 1]
      });
      headings.forEach((heading) => observer.observe(heading));
    }

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });

    const hashId = decodeURIComponent((window.location.hash || '').replace(/^#/, ''));
    const initialLink = sectionLinks.find((link) => link.dataset.sideNavSection === hashId) || sectionLinks[0];
    setActiveSection(initialLink, sectionLinks);
    updateActiveSection();
  }

  function slugify(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function currentHeadingInViewport(headings) {
    const headerOffset = Math.min(Math.max(window.innerHeight * 0.42, 160), 420);
    const current = headings
      .map((heading) => ({
        heading,
        top: heading.getBoundingClientRect().top
      }))
      .filter((entry) => entry.top <= headerOffset)
      .pop();
    if (current) return current.heading;
    return headings.find((heading) => heading.getBoundingClientRect().top >= 0) || headings[0];
  }

  function setActiveSection(activeLink, links) {
    links.forEach((link) => {
      const isActive = link === activeLink;
      link.classList.toggle('is-active-section', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    activeLink.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }
})();
