const NAV_OFFSET_FALLBACK_PX = 82;
const SECTION_IDS = new Set([
  'how',
  'who',
  'earn',
  'merchants',
  'faq',
  'join',
  'products',
  'for-customers',
  'for-merchants',
  'for-agents',
]);

/** Height of the fixed header (top bar + navbar), so sections land just below it. */
function navOffset() {
  const header = document.getElementById('site-header');
  return header ? header.offsetHeight + 12 : NAV_OFFSET_FALLBACK_PX;
}

function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth') {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const top = section.getBoundingClientRect().top + window.scrollY - navOffset();
  window.scrollTo({ top: Math.max(0, top), behavior });
}

function isSectionPath(pathname: string) {
  const sectionId = pathname.replace(/^\/+/, '').toLowerCase();
  return SECTION_IDS.has(sectionId);
}

function sectionFromPath(pathname: string) {
  const sectionId = pathname.replace(/^\/+/, '').toLowerCase();
  return SECTION_IDS.has(sectionId) ? sectionId : '';
}

export function navigateToSection(sectionId: string) {
  const cleanId = sectionId.toLowerCase();
  if (!SECTION_IDS.has(cleanId)) return;

  const currentPath = window.location.pathname;
  const targetPath = `/${cleanId}`;

  if (currentPath === '/contact') {
    window.location.assign(targetPath);
    return;
  }

  if (currentPath !== targetPath) {
    window.history.pushState(null, '', targetPath);
  }

  requestAnimationFrame(() => scrollToSection(cleanId));
}

export function syncSectionNavigationFromUrl(pathname: string, hash: string) {
  const hashSection = hash.replace('#', '').trim().toLowerCase();
  const pathSection = sectionFromPath(pathname);
  const sectionId = pathSection || (SECTION_IDS.has(hashSection) ? hashSection : '');

  if (!sectionId) return;

  if (hashSection && !pathSection) {
    window.history.replaceState(null, '', `/${sectionId}`);
  }

  requestAnimationFrame(() => scrollToSection(sectionId, 'auto'));
}
