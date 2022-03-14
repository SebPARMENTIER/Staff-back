const frisby = require('frisby');
const Joi = frisby.Joi;

describe('User controller', () => {
  describe('login', () => {
    it('should return status 404 and an object if mail is not correct', () => {
      return frisby
      .post('https://seb-staff.herokuapp.com/api/v1/login', {
        email: 'seb@seb.fr',
        password: 'motdepasse'
      })
      .expect('status', 404)
      .expect('json', {
        data: [],
        error: "L'email renseigné n'existe pas"
      });
    });
    it('should return status 400 and an object if mail or password is missing', () => {
      return frisby
      .post('https://seb-staff.herokuapp.com/api/v1/login', {
        email: 'sebastien.parmentier@outlook.fr',
        password: ''
      })
      .expect('status', 400)
      .expect('json', {
        data: [],
        error: "Vous devez entrer un email et un mot de passe"
      });
    });
    it('should return status 400 and an object if passord is not correct', () => {
      return frisby
      .post('https://seb-staff.herokuapp.com/api/v1/login', {
        email: 'staff@staff.fr',
        password: 'mot'
      })
      .expect('status', 400)
      .expect('json', {
        data: [],
        error: "Le mot de passe ne correspond pas"
      });
    });
    it('should return status 200 and an object with token if email and password are valid', () => {
      return frisby
      .post('https://seb-staff.herokuapp.com/api/v1/login', {
        email: 'staff@staff.fr',
        password: 'motdepasse'
      })
      .expect('status', 200)
      .expect('jsonTypes', frisby.Joi.object().required());
    });
  });
});
