import { IconType } from 'react-icons';
import { PiMessengerLogo, PiUser, PiUsers } from 'react-icons/pi';

export const NAVBAR_TRANSLATION_PREFIX = 'pages:main.navbar';

export const PATHS = [
  ['users/me', PiUser],
  ['dialogs', PiMessengerLogo],
  ['users', PiUsers],
] as [string, IconType][];
