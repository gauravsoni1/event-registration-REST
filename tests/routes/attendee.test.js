const request = require('supertest');
const app = require('../../app/app');
const Attendee = require('../../app/models/attendee.model');
const mongoose =  require('mongoose');

beforeEach(()=>{
  Attendee.deleteMany();
});

test('Should create a new attendee',async ()=>{
  await request(app).post('/attendee/create').send({
    "name":"max",
    "age":50,
    "occupation":"accounts",
    "businessName":"Dxb"
  }).expect(200)
});

afterAll(() => {
  mongoose.disconnect();
});
