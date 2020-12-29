import { nativeImage } from 'electron';
import * as path from 'path';

function createAppIcon() {
  const iconPath = path.join(__dirname, '../images/icon.png');
  const createdIcon = nativeImage.createFromPath(iconPath);
  const resizedIcon = createdIcon.resize({ width: 16, height: 16 });
  return resizedIcon;
}

const appIcon = createAppIcon();

export default appIcon;
