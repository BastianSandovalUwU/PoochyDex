const fs = require('fs');
const path = require('path');

// Intentar cargar dotenv solo si no hay variables de entorno
if (!process.env.NODE_JS_API) {
  try {
    const dotenv = require('dotenv');
    dotenv.config({ path: '.env' });
  } catch (error) {
    console.log('⚠️  dotenv no encontrado, usando variables de sistema');
  }
}

const NODE_JS_API = process.env.NODE_JS_API;

const envDir = path.join(__dirname, 'src/environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// SIEMPRE generar AMBOS archivos para que Angular pueda hacer el ile replacement
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

// Escribir AMBOS archivos siempre
fs.writeFileSync(path.join(envDir, 'environment.ts'), devFile);
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), prodFile);

console.log('✅ environment.ts generado');
console.log('✅ environment.prod.ts generado');
console.log(`📍 NODE_JS_API: ${NODE_JS_API}`);



