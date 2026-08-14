const fs = require('fs');
const path = require('path');

const apis = {
  global: {
    kind: "singleType",
    attributes: {
      siteName: { type: "string", default: "IMPACT POSITIF" },
      contactEmail: { type: "email" },
      logoUrl: { type: "string" }
    }
  },
  hero: {
    kind: "singleType",
    attributes: {
      titlePrefix: { type: "string", default: "Nous sommes" },
      titleHighlight1: { type: "string", default: "IMPACT" },
      titleHighlight2: { type: "string", default: "POSITIF" },
      subtitle: { type: "string" }
    }
  },
  about: {
    kind: "singleType",
    attributes: {
      whoAreWeTitle: { type: "string" },
      whoAreWeContent: { type: "text" },
      ourRoleTitle: { type: "string" },
      ourRoleContent: { type: "text" }
    }
  },
  service: {
    kind: "collectionType",
    attributes: {
      title: { type: "string" },
      icon: { type: "string" },
      description: { type: "text" },
      capabilities: { type: "json" },
      image: { type: "string" },
      highlight: { type: "string" }
    }
  },
  location: {
    kind: "collectionType",
    attributes: {
      city: { type: "string" }
    }
  },
  message: {
    kind: "collectionType",
    attributes: {
      name: { type: "string" },
      email: { type: "string" },
      subject: { type: "string" },
      content: { type: "text" }
    }
  }
};

const baseDir = path.join(__dirname, 'backend', 'src', 'api');

for (const [name, config] of Object.entries(apis)) {
  const apiDir = path.join(baseDir, name);
  const contentTypesDir = path.join(apiDir, 'content-types', name);
  const routesDir = path.join(apiDir, 'routes');
  const controllersDir = path.join(apiDir, 'controllers');
  const servicesDir = path.join(apiDir, 'services');

  fs.mkdirSync(contentTypesDir, { recursive: true });
  fs.mkdirSync(routesDir, { recursive: true });
  fs.mkdirSync(controllersDir, { recursive: true });
  fs.mkdirSync(servicesDir, { recursive: true });

  // schema.json
  const schema = {
    kind: config.kind,
    collectionName: name + 's',
    info: {
      singularName: name,
      pluralName: name + 's',
      displayName: name.charAt(0).toUpperCase() + name.slice(1)
    },
    options: {
      draftAndPublish: false
    },
    pluginOptions: {},
    attributes: config.attributes
  };
  fs.writeFileSync(path.join(contentTypesDir, 'schema.json'), JSON.stringify(schema, null, 2));

  // routes
  const routeContent = `export default {
  routes: [
    {
      method: 'GET',
      path: '/${name}${config.kind === 'collectionType' ? 's' : ''}',
      handler: '${name}.find',
      config: { policies: [] }
    },
    ${config.kind === 'collectionType' ? `{
      method: 'GET',
      path: '/${name}s/:id',
      handler: '${name}.findOne',
      config: { policies: [] }
    },
    {
      method: 'POST',
      path: '/${name}s',
      handler: '${name}.create',
      config: { policies: [] }
    }` : ''}
  ]
};`;
  fs.writeFileSync(path.join(routesDir, `${name}.ts`), routeContent);

  // controllers
  const coreType = config.kind === 'collectionType' ? 'createCoreController' : 'createCoreController'; // Strapi 5 uses factories
  const controllerContent = `import { factories } from '@strapi/strapi';
export default factories.createCoreController('api::${name}.${name}');`;
  fs.writeFileSync(path.join(controllersDir, `${name}.ts`), controllerContent);

  // services
  const serviceContent = `import { factories } from '@strapi/strapi';
export default factories.createCoreService('api::${name}.${name}');`;
  fs.writeFileSync(path.join(servicesDir, `${name}.ts`), serviceContent);
}

console.log("Strapi APIs generated successfully.");
