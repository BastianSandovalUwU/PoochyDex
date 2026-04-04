const fs = require('fs');
const path = require('path');

/**
 * Load `.env` from the project root into `process.env` (only keys not already set).
 * Does not require the `dotenv` package — the repo does not list it in package.json.
 */
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) {
    return false;
  }
  const raw = fs.readFileSync(envPath, 'utf8').replace(/^\uFEFF/, '');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
    if (eq === -1) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
  return true;
}

// Prefer shell/CI env; otherwise read `.env` from disk
if (!process.env.NODE_JS_API) {
  if (loadEnvFile()) {
    console.log(
      process.env.NODE_JS_API
        ? '✅ NODE_JS_API loaded from .env'
        : '⚠️  .env found but NODE_JS_API is not set (add NODE_JS_API=... to .env or the shell)'
    );
  }
}

const NODE_JS_API = process.env.NODE_JS_API;

const envDir = path.join(__dirname, 'src/environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Always generate BOTH files so Angular fileReplacements works on build
const devFile = `// This file can be replaced during build by using the fileReplacements array.
// ng build replaces environment.ts with environment.prod.ts.
// The list of file replacements can be found in angular.json.

export const environment = {
  production: false,
  nodeJsApi: '${NODE_JS_API}',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as zone.run, zoneDelegate.invokeTask.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
`;

const prodFile = `export const environment = {
  production: true,
  nodeJsApi: '${NODE_JS_API}',
};
`;

// Write both environment files
fs.writeFileSync(path.join(envDir, 'environment.ts'), devFile);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), prodFile);

console.log('✅ environment.ts written');
console.log('✅ environment.prod.ts written');
console.log(`📍 NODE_JS_API: ${NODE_JS_API}`);



