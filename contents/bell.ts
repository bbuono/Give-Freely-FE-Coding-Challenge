import type { PlasmoCSConfig } from 'plasmo';

import googleSites from '~google-sites/sites.json';

export const config: PlasmoCSConfig = {
  matches: googleSites,
};

async function domContentLoaded(): Promise<void> {
  console.log('DOM Content Loaded - bell');
}

function main(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', domContentLoaded);
  } else {
    domContentLoaded();
  }
}

void main();
