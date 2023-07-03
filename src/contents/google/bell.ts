import { onDomContentLoaded } from '~contents-utils/onDomContentLoaded';

import '~google-sites-config';

async function domContentLoaded(): Promise<void> {
  console.log('DOM Content Loaded - bell');
}

function main(): void {
  onDomContentLoaded(domContentLoaded);
}

void main();
