import packageJson from './package.json';
import App from './src/App';
import { AppIcon } from './icon';

interface Settings {
  language: 'en';
}

export const path = `/${packageJson.name}`;
export default (settings: Settings) => ({
  id: 'ADVERTISEMENTS',
  path,
  nameLocale: 'Advertisements',
  color: '#fff',
  backgroundColor: '#fbc02d',
  icon: AppIcon,
  app: App,
});
