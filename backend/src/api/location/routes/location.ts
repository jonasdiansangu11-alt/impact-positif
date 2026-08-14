export default {
  routes: [
    {
      method: 'GET',
      path: '/locations',
      handler: 'location.find',
      config: { policies: [] }
    },
    {
      method: 'GET',
      path: '/locations/:id',
      handler: 'location.findOne',
      config: { policies: [] }
    },
    {
      method: 'POST',
      path: '/locations',
      handler: 'location.create',
      config: { policies: [] }
    }
  ]
};