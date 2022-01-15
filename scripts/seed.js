const User = require("../server/models/user");
const Animation = require("../server/models/animation");
const Frame = require("../server/models/frame");
const connect = require("../server/database");
const faker = require("@faker-js/faker");
const sampleSize = require("lodash.samplesize");

/**
 * Seeds users. Returns list of all users.
 * @param {Number} n number of users to seed
 */
async function seedUsers(n = 10) {
  await User.deleteMany();

  let users = [];

  for (let i = 0; i < n; ++i) {
    const user = new User({
      name: faker.name.findName(),
      googleid: faker.mersenne.rand(11214843000, 113512389000),
    });

    users.push(user.save());
  }

  return await Promise.all(users);
}

async function seedFrames(users, n = 5) {
  let frames = []

  await Promise.all(frames);

  for (let i = 0; i < n; ++i) {
    const user = sampleSize(users, 1)[0];

    const width = 640, height = 360;
    
    const frame = new Frame({
      user: user,
      data: `http://picsum.photos/${width}/${height}`
    });

    frames.push(frame.save());
  }

  return await Promise.all(frames);
}

async function seedAnimations(users, n = 10) {
  await Frame.deleteMany();
  await Animation.deleteMany();

  let animations = [];

  for (let i = 0; i < n; ++i) {
    const op = sampleSize(users, 1)[0];

    const animation = new Animation({
      creator: op,
      frames: await seedFrames(users),
      upvoters: sampleSize(users, 5)
    });

    animations.push(animation.save());
  }

  const result = await Promise.all(animations);

  return result;
}

async function run() {
  const connection = connect();

  // NOTE(kosi): First seed fake users
  const users = await seedUsers();

  console.dir(JSON.parse(JSON.stringify(users)));

  // NOTE(kosi): Then seed about fake animations
  const animations = await seedAnimations(users);

  console.dir(JSON.parse(JSON.stringify(animations)), { depth: null })

  connection.close();
}

run();
