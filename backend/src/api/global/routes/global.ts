export default {
  routes: [
    {
      method: 'GET',
      path: '/global',
      handler: 'global.find',
      config: { policies: [] }
    },
    
  ]
};