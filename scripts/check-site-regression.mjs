import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    failures.push(`${relativePath} is missing`);
    return '';
  }

  return fs.readFileSync(absolutePath, 'utf8');
}

function expectIncludes(file, html, fragments) {
  for (const fragment of fragments) {
    if (!html.includes(fragment)) {
      failures.push(`${file} must include: ${fragment}`);
    }
  }
}

function expectExcludes(file, html, fragments) {
  for (const fragment of fragments) {
    if (html.includes(fragment)) {
      failures.push(`${file} must not include: ${fragment}`);
    }
  }
}

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') {
      continue;
    }

    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(entryPath, files);
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

const index = read('index.html');
expectIncludes('index.html', index, [
  '<h1 id="home-title">A11Y Cat Extension</h1>',
  'Current extension surfaces',
  'assets/video/a11y-cat-extension-video.mp4',
  'assets/img/video-poster-dark.png',
  'assets/extension/current/panel-scan-results.png',
  'feature-matrix',
  'footer-credit',
  'Approved for internal Chrome use',
  'Do not publish or externally share the internal install link',
]);

expectExcludes('index.html', index, [
  'Local-first accessibility inspection for engineering and QA teams',
  'assets/screenshots/extension-panel-overview.png',
  'Open the feature guide',
  'Read how it works',
]);

const installation = read('docs/installation.html');
expectIncludes('docs/installation.html', installation, [
  'authorized internal Chrome users',
  'do not publish the install link',
]);

const faq = read('docs/faq.html');
expectIncludes('docs/faq.html', faq, [
  'Can I share the Chrome install link publicly?',
  'Do not publish it on the public site',
]);

const chromeStatus = read('docs/chrome-store-submission.html');
expectIncludes('docs/chrome-store-submission.html', chromeStatus, [
  'Internal Chrome status',
  'approved for internal Chrome use only',
  'Do not publish or externally share the internal install link',
  'Screenshots and animated previews',
]);

const allFiles = walk(root);
const htmlFiles = allFiles.filter((file) => file.endsWith('.html'));
const missingTargets = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    let target = match[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|#)/.test(target)) {
      continue;
    }

    target = target.split('#')[0].split('?')[0];
    if (!target) {
      continue;
    }

    let resolvedTarget = path.resolve(path.dirname(file), target);
    if (target.endsWith('/')) {
      resolvedTarget = path.join(resolvedTarget, 'index.html');
    }

    if (!fs.existsSync(resolvedTarget)) {
      missingTargets.push(`${path.relative(root, file)} -> ${match[1]}`);
    }
  }
}

for (const missingTarget of missingTargets) {
  failures.push(`Missing local href/src target: ${missingTarget}`);
}

const stalePatterns = [
  /Chrome Web Store support assets/i,
  /store-support assets/i,
  /Store prep/i,
  /Store materials/i,
  /Chrome Web Store prep/i,
  /Store-ready copy/i,
  /Install locally/i,
  /public extension package/i,
  /public release package/i,
  /not proof that Chrome has approved/i,
  /Do not claim Chrome Web Store approval/i,
  /public beta/i,
  /private beta/i,
];

const forbiddenPublicInstallLinkPatterns = [
  /https?:\/\/chromewebstore\.google\.com\/detail/i,
  /https?:\/\/chrome\.google\.com\/webstore\/detail/i,
];

for (const file of allFiles) {
  const relativePath = path.relative(root, file);
  if (
    relativePath.startsWith('.git/')
    || relativePath === 'scripts/check-site-regression.mjs'
    || /\.(png|jpe?g|gif|mp4|ico|zip)$/i.test(relativePath)
  ) {
    continue;
  }

  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of stalePatterns) {
    if (pattern.test(text)) {
      failures.push(`${relativePath} contains stale public/store wording matching ${pattern}`);
    }
  }

  for (const pattern of forbiddenPublicInstallLinkPatterns) {
    if (pattern.test(text)) {
      failures.push(`${relativePath} appears to publish a Chrome install link matching ${pattern}`);
    }
  }
}

if (failures.length > 0) {
  console.error('Site regression guard failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Site regression guard passed for ${htmlFiles.length} HTML files.`);
