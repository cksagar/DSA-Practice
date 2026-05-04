const user = {
  name: 'Chetan',
  address: { city: 'Mumbai' },
};
console.log('originaluser', user);
const copy = { ...user };
copy.name = 'Rahul'; // only copy changes
copy.address.city = 'ytl'; // original also changes
// shallow copy means only the top level properties are copied, not the nested properties
console.log('shallow copy', copy);
console.log('originaluser after shallow copy', user);

const user2 = {
  name: 'Sagar',
  address: { city: 'Pune' },
};
console.log('**************************');
const copy2 = structuredClone(user2);
copy2.name = 'Rahul';

copy2.address.city = 'nagpur';

console.log('copy2', copy2);

console.log('originaluser after copy2', user);