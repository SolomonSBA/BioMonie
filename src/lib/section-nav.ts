const NAV_OFFSET_PX = 82;
const SECTION_IDS = new Set(['how', 'who', 'earn', 'merchants', 'faq', 'join']);

function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth') {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const top = section.getBoundingClientRect().top + window.scrollY - NAV_OFFSET_PX;
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
