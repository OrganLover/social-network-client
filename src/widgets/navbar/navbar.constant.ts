import { IconType } from 'react-icons';
import { PiGear, PiMessengerLogo, PiUser, PiUsers } from 'react-icons/pi';

export const PATHS = [
  ['profile', PiUser],
  ['dialogs', PiMessengerLogo],
  ['users', PiUsers],
  ['settings', PiGear],
] as [string, IconType][];
