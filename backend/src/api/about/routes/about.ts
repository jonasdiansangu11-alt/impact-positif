export default {
  routes: [
    {
      method: 'GET',
      path: '/about',
      handler: 'about.find',
      config: { policies: [] }
    },
    
  ]
};