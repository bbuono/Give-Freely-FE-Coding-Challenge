import { CountButton } from '~features/CountButton';

import '~base.css';
import '~style.css';

console.log('From popup', process.env.PLASMO_PUBLIC_PARTICIPANTS_API_URL);

function IndexPopup() {
  return (
    <div className="flex items-center justify-center h-16 w-40">
      <CountButton />
    </div>
  );
}

export default IndexPopup;
