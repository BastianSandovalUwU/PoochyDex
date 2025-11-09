const fs = require('fs');
const path = require('path');

if (!process.env.NODE_JS_API) {
  dotenv.config({ path: '.env' });
}

const devEnv = {
  NODE_JS_API: process.env.NODE_JS_API,
  ENVIRONMENT: process.env.ENVIRONMENT,
};

const envDir = path.join(__dirname, 'src/environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

if(devEnv.ENVIRONMENT === 'development') {
  const devFile = `export const environment = {
    production: false,
    nodeJsApi: '${devEnv.NODE_JS_API || ''}',
  };`;

  fs.writeFileSync(path.join(envDir, 'environment.ts'), devFile);
  console.log('✅ environment.ts generado');
} else {
  const prodFile = `export const environment = {
    production: true,
    nodeJsApi: '${devEnv.NODE_JS_API || ''}',
  };`;

  fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), prodFile);
  console.log('✅ environment.prod.ts generado');
}



