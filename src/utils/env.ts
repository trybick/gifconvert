const isBrowserOnly = process.env.REACT_APP_BROWSER_ONLY === 'true';

// Use this to differentiate between browser and electron env.
// Currently not in use.
export const isElectron = !isBrowserOnly;
