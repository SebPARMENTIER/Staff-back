const frisby = require('frisby');
const Joi = frisby.Joi;

const accessToken = [];
const cardId = [];
const testId = [];

describe('Card controller', () => {
  describe('getAll', () => {
    it('should return status 400 and an object if there is a bad request', () => {
      return frisby
        .post('https://seb-staff.herokuapp.com/api/v1/login', {
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
            .post('https://seb-staff.herokuapp.com/api/v1/card')
            .expect('status', 400)
            .expect('json', {
              data: [],
              error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
            });
        });
    });
    it('should return status 401 if there is no token in headers', () => {
      return frisby
        .get(`https://seb-staff.herokuapp.com/api/v1/card/`)
        .expect('status', 401);
    });
    it('should return status 200 and an array if the request is valid', () => {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken[0]}`
            }
          }
        })
        .get('https://seb-staff.herokuapp.com/api/v1/card')
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
        .get(`https://seb-staff.herokuapp.com/api/v1/card/${cardId[1]}`)
        .expect('status', 404)
        .expect('json', {
          data: [],
          error: "Cette ressource est introuvable"
        });
    });
    it('should return status 401 if there is no token in headers', () => {
      return frisby
        .get(`https://seb-staff.herokuapp.com/api/v1/card/${cardId[0]}`)
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
        .get(`https://seb-staff.herokuapp.com/api/v1/card/${cardId[0]}`)
        .expect('status', 200)
        .expect('jsonTypes', frisby.Joi.object().required())
    });
  });
  describe('createCard', () => {
    it('should return status 401 if there is no token in headers', () => {
      return frisby
        .post('https://seb-staff.herokuapp.com/api/v1/card', {
          title: "Nouvelle carte 2022",
          description: "Voici la nouvelle carte 2022",
          restaurant_id: 1
        })
        .expect('status', 401)
    });
    it('should return status 400 and an object if there is a bad request', () => {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken[0]}`
            }
          }
        })
        .post('https://seb-staff.herokuapp.com/api/v1/card')
        .expect('status', 400)
        .expect('json', {
          data: [],
          error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
        });
    });
    it('should return status 200 and on object if the request is valid', () => {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken[0]}`
            }
          }
        })
        .post('https://seb-staff.herokuapp.com/api/v1/card', {
          title: "Nouvelle carte 2022",
          description: "Voici la nouvelle carte 2022",
          restaurant_id: 1
        })
        .expect('status', 200)
        .expect('jsonTypes', frisby.Joi.object().required())
        .then((res) => {
          testId.push(res.json.card.id)
        });
    });
  });
  describe('updateCard', () => {
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
        .patch('https://seb-staff.herokuapp.com/api/v1/card', {
          id: 100000000,
          title: "Nouvelle carte 2023",
          description: "Nouvelle carte 2023 un peu en avance"
        })
        .expect('status', 404)
        .expect('json', {
          data: [],
          error: "Cette ressource est introuvable"
        });
    });
    it('should return status 401 if there is no token in headers', () => {
      return frisby
        .patch('https://seb-staff.herokuapp.com/api/v1/card', {
          id: testId[0],
          title: "Nouvelle carte 2023",
          description: "Nouvelle carte 2023 un peu en avance"
        })
        .expect('status', 401)
    });
    it('should return status 400 and an object if the card does not exist', () => {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken[0]}`
            }
          }
        })
        .post('https://seb-staff.herokuapp.com/api/v1/card', {
          id: testId[0],
          title: "Nouvelle carte 2023",
          description: "Nouvelle carte 2023 un peu en avance"
        })
        .expect('status', 400)
        .expect('json', {
          data: [],
          error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
        });
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
        .patch('https://seb-staff.herokuapp.com/api/v1/card', {
          id: testId[0],
          title: "Nouvelle carte 2023",
          description: "Nouvelle carte 2023 un peu en avance"
        })
        .expect('status', 200)
        .expect('jsonTypes', frisby.Joi.object().required())
    });
  });
  describe('deleteCard', () => {
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
        .del('https://seb-staff.herokuapp.com/api/v1/card/-1')
        .expect('status', 404)
        .expect('json', {
          data: [],
          error: "Cette ressource est introuvable"
        });
    });
    it('should return status 401 if there is no token in headers', () => {
      return frisby
        .del(`https://seb-staff.herokuapp.com/api/v1/card/${testId[0]}`)
        .expect('status', 401)
    });
    it('should return status 400 and an object if there is a bad request', () => {
      return frisby
        .setup({
          request: {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken[0]}`
            }
          }
        })
        .post('https://seb-staff.herokuapp.com/api/v1/card')
        .expect('status', 400)
        .expect('json', {
          data: [],
          error: "Désolé, une erreur est survenue, veuillez réessayer ultérieurement."
        });
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
        .del(`https://seb-staff.herokuapp.com/api/v1/card/${testId[0]}`)
        .expect('status', 200)
        .expect('jsonTypes', {
          OK: true
        });
    });
  });
});

