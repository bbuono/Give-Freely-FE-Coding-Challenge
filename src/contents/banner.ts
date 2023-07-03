import type { PlasmoCSConfig } from 'plasmo';

import { onDomContentLoaded } from '~contents-utils/onDomContentLoaded';

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
};

function bannerMatcher(): boolean {
  const exampleDomain = 'http://example.org';
  const url = new URL(exampleDomain);
  const regexp = new RegExp(url.origin || '', 'gi');
  return !!regexp.exec(window.location.origin || '');
}

function injectBanner() {
  alert('Matches');
}

async function domContentLoaded(): Promise<void> {
  if (bannerMatcher()) {
    injectBanner();
  }

  window.addEventListener('locationchange', () => {
    if (bannerMatcher()) {
      injectBanner();
    }
  });
}

function main(): void {
  onDomContentLoaded(domContentLoaded);
}

void main();
