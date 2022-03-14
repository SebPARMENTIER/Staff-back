const frisby = require('frisby');

describe('Route /', () => {
  it('should return status 200 and an object on / route', () => {
    return frisby
    .get('https://seb-staff.herokuapp.com/api/v1/')
    .expect('status', 200)
    .expect('json', {
      "message": "API Staff - Case Study",
      "author": "PARMENTIER Sébastien"
    });
  });
});
