const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Card controller', () => {
  describe('getAll', () => {
    it('should return status 400 and an object if there is a bad request', () => {
      return frisby
      .post('https://seb-stan.herokuapp.com/api/v1/login', {
        email: 'sebastien.parmentier@outlook.fr',
        password: 'motdepasse'
      })
      .then((res) => {
        const accessToken = res.json.accessToken;
        return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          }
        })
        .post('https://seb-stan.herokuapp.com/api/v1/card')
        .expect('status', 400)
        .expect('json', {
          data: [],
          error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
        });
      });
    });
    it('should return status 200 and an object if the request is valid', () => {
      return frisby
      .post('https://seb-stan.herokuapp.com/api/v1/login', {
        email: 'sebastien.parmentier@outlook.fr',
        password: 'motdepasse'
      })
      .then((res) => {
        const accessToken = res.json.accessToken;
        return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          }
        })
        .get('https://seb-stan.herokuapp.com/api/v1/card')
        .expect('status', 200)
        .expect('jsonTypes', frisby.Joi.array().required());
      });
    });
  });
});
