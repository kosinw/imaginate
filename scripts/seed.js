const connect = require("../server/database");
const { faker } = require("@faker-js/faker");
const cuid = require('cuid');

const AnimationsController = require("../server/controllers/animations");
const User = require("../server/models/user");

async function seedDatum() {
  const user = new User({
    name: faker.name.firstName(),
    googleid: cuid()
  });

  await user.save();

  const animation = await AnimationsController.create({
    creator: user._id,
    framerate: 3,
    title: faker.company.bsNoun(),
    resolution: {
      width: 640,
      height: 360
    },
  });

  for (let i = 0; i < 12; ++i) {
    await AnimationsController.insertFrame({
      id: animation._id,
      data: `https://picsum.photos/seed/${cuid()}/640/360`,
      user: user._id
    });
  }
}


async function run() {
  const connection = connect();
  const data = [];

  for (let i = 0; i < 10; ++i) {
    await seedDatum();
  }

  connection.close();
}

run();
