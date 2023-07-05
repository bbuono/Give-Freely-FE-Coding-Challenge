import { CountButton } from '~features/CountButton';

import '~styles/base.css';
import '~styles/style.css';

function IndexPopup() {
  return (
    <div className="flex items-center justify-center h-16 w-40">
      <CountButton />
    </div>
  );
}

export default IndexPopup;
