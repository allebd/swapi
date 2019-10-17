export const up = queryInterface => queryInterface.bulkInsert('Comments', [{
  id: '6a7b986e-1102-4e9a-83b0-cad7df993e1c',
  commentBody: 'this is movie is so nice',
  movieId: '1',
  publicIp: '127.0.0.1',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: 'b84f246f-ba18-4f83-876d-145be90b494d',
  commentBody: 'yeah I think the same',
  movieId: '1',
  publicIp: '192.17.8.17',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: '6841495e-94e6-4067-852f-4e6e3da14a7b',
  commentBody: 'fresh like today bread',
  movieId: '1',
  publicIp: '192.17.8.19',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: '0f491e3b-2c96-4111-af14-614b504c7c98',
  commentBody: 'yeah I think the same too',
  movieId: '1',
  publicIp: '192.17.8.15',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: '835bdd01-bf00-491d-93ca-ed9c03203076',
  commentBody: 'would watch it again',
  movieId: '1',
  publicIp: '192.17.9.17',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: 'c024cc0c-f90b-4f06-a0af-154166087c68',
  commentBody: 'you missing',
  movieId: '1',
  publicIp: '192.57.8.19',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 'e25bb858-d39b-476d-aaec-1d178872905b',
  commentBody: 'yeah I think the same too',
  movieId: '1',
  publicIp: '192.37.8.15',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: '2cc864ba-1520-469c-bc2b-28edb6a5bd6d',
  commentBody: 'yeah I think the same',
  movieId: '1',
  publicIp: '192.18.8.17',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: '840e7774-68f6-463e-b28b-b15572db7ed0',
  commentBody: 'fresh like today bread',
  movieId: '1',
  publicIp: '192.17.8.19',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 'a5aa5975-84fc-4036-96e1-65957b6f50d4',
  commentBody: 'yeah I think the same too',
  movieId: '1',
  publicIp: '192.17.8.15',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: 'af7c57c9-5e42-4fdc-93a5-03630970db03',
  commentBody: 'yeah I think the same',
  movieId: '1',
  publicIp: '192.17.8.17',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  id: '29374eea-fb24-41a0-8416-4c60977c0d23',
  commentBody: 'fresh like today bread',
  movieId: '1',
  publicIp: '192.17.8.19',
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: '3e6fb87d-04d6-446c-93f8-205d933fcec2',
  commentBody: 'yeah I think the same too',
  movieId: '1',
  publicIp: '192.17.8.15',
  createdAt: new Date(),
  updatedAt: new Date()
}], {});
export const down = queryInterface => queryInterface.bulkDelete('Comments', null, {});
