// backend/generate.js- para gerar uma massa de dados fake
import { faker } from '@faker-js/faker/locale/pt_BR';
import { times } from 'lodash';
import { writeFileSync } from 'fs';

const peoples = times(50, () => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  avatar: faker.image.avatar(),
  address: faker.location.streetAddress(),
  email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName() }),
}));

const data = { peoples };
writeFileSync('db.json', JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
  console.log('Finalizado...');
});