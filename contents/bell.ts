import type { PlasmoCSConfig } from 'plasmo';

import { onDomContentLoaded } from '~contents-utils/onDomContentLoaded';
import googleSites from '~google-sites/sites.json';

export const config: PlasmoCSConfig = {
  matches: googleSites,
};

async function domContentLoaded(): Promise<void> {
  console.log('DOM Content Loaded - bell');
}

function main(): void {
  onDomContentLoaded(domContentLoaded);
}

void main();
