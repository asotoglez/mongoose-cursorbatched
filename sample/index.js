const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursorbatched = require('mongoose-cursorbatched');
mongoose.plugin(cursorbatched);

// *** Schema definition ***
const UserSchema = new Schema({ name: { type: String } });
const User = mongoose.model('User', UserSchema, 'User');
// *** Schema definition ***

const MONGODB_CONNECTION_STRING = 'mongodb+srv://########';

mongoose
  .connect(MONGODB_CONNECTION_STRING, {
    appname: 'test-db',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Use it like this
    const cursor = await User.find({}).cursorBatched({ batchSize: 5 });

    for await (const batch of cursor) {
      console.log('batch', batch);
      // Here you can run your process with the data...
      // Example:
      await timeout(5000);
    }
  });
