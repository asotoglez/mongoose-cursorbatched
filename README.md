# mongoose-cursorbatched
A mongoose plugin that allows iterations over batches with cursor.
## Installation
```shell
$ npm i --save mongoose-cursorbatched
```

## How to use
```js
const mongoose = require('mongoose');
const cursorbatched = require('mongoose-cursorbatched');
mongoose.plugin(cursorbatched);

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
```
## Example result
![image](https://user-images.githubusercontent.com/24250413/124524518-6524af00-ddc9-11eb-82ec-ce5e96c9413d.png)