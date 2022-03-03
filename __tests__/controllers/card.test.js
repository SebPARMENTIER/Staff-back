const frisby = require('frisby');
const Joi = frisby.Joi;

const accessToken = [];
const cardId = [];

describe('Card controller', () => {
  describe('getAll', () => {
    it('should return status 400 and an object if there is a bad request', () => {
      return frisby
        .post('https://seb-stan.herokuapp.com/api/v1/login', {
          email: 'sebastien.parmentier@outlook.fr',
          password: 'motdepasse'
        })
        .then((res) => {
          accessToken.push(res.json.accessToken);
          return frisby
            .setup({
              request: {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken[0]}`
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
    it('should return status 401 if there is no token in headers', () => {
      return frisby
        .get(`https://seb-stan.herokuapp.com/api/v1/card/`)
        .expect('status', 401);
    });
    it('should return status 200 and an object if the request is valid', () => {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken[0]}`
            }
          }
        })
        .get('https://seb-stan.herokuapp.com/api/v1/card')
        .expect('status', 200)
        .expect('jsonTypes', frisby.Joi.array().required())
        .then((res) => {
          cardId.push(res.json[0].id);
        })
    });
  });
  describe('getById', () => {
    it('should return status 404 and an object if the card does not exist', () => {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken[0]}`
            }
          }
        })
        .get(`https://seb-stan.herokuapp.com/api/v1/card/${cardId[1]}`)
        .expect('status', 404)
        .expect('json', {
          data: [],
          error: "Cette ressource est introuvable"
        });
    });
    it('should return status 401 if there is no token in headers', () => {
      return frisby
        .get(`https://seb-stan.herokuapp.com/api/v1/card/${cardId[0]}`)
        .expect('status', 401);
    });
  });
});

