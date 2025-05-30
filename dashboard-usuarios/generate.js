import { faker } from '@faker-js/faker/locale/pt_BR';
import lodash from 'lodash';
import fs from 'fs';

const peoples = lodash.times(50, function(n){
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    id: n+1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    avatar: faker.image.avatar(),
    address: faker.location.streetAddress(),
    email: faker.internet.email({firstName: firstName.toLowerCase(), lastName: lastName.toLowerCase()})
  }
});

const data = {};
data.peoples = peoples;
fs.writeFile('db.json', JSON.stringify(data), (err) => { // o arquivo db será atualizado com a massa de dados fakes
  if(err) throw err;
  console.log('Finalizado...');
});