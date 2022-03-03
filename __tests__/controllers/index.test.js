const frisby = require('frisby');

describe('Route /', () => {
  it('should return status 200 and an object on / route', () => {
    return frisby
    .get('https://seb-stan.herokuapp.com/api/v1/')
    .expect('status', 200)
    .expect('json', {
      "message": "API Stan - Case Study",
      "author": "PARMENTIER Sébastien"
    });
  });
});
