import type { PlasmoCSConfig } from 'plasmo';

import { onDomContentLoaded } from '~contents-utils/onDomContentLoaded';

export const config: PlasmoCSConfig = {
  matches: ['https://*.google.com/search*', 'https://*.google.com.ar/search*'],
};

async function domContentLoaded(): Promise<void> {
  console.log('DOM Content Loaded - bell');
}

function main(): void {
  onDomContentLoaded(domContentLoaded);
}

void main();
