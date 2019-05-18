const mongoose = require('mongoose');
const glob = require('glob');
const { resolve } = require('path');
const db = 'mongodb://localhost/douban-test';


mongoose.Promise = global.Promise;

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
};

exports.initAdmin = async () => {
  const User = mongoose.model('User');
  let user = await User.findOne({
    username: 'jason',
  });

  if (!user) {
    user = new User({
      username: 'jason',
      email: '348842258@qq.com',
      password: '123',
    });
  }

  await user.save();
};

exports.connect = () => {
  let maxConnectCount = 0;

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
      mongoose.set('useCreateIndex', true);
    };

    mongoose.connect(db);

    mongoose.connection.on('disconnected', () => {
      maxConnectCount ++;
      if (maxConnectCount < 5) {
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂了吧！')
      };
    });

    mongoose.connection.on('error', (err) => {
      maxConnectCount++;
      if (maxConnectCount < 5) {
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂了吧！')
      }
    });

    mongoose.connection.on('open', () => {
      const Dog = mongoose.model('Dog', { name: String });
      const dog = new Dog({ name: '阿尔法' });
      dog.save().then(() => {
        console.log('wang');
      });

      resolve();
      console.log('MongoBD connected success!');
    });
  });
};
