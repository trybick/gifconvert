const isBrowserOnly = process.env.REACT_APP_BROWSER_ONLY === 'true';
export const isElectron = !isBrowserOnly;
