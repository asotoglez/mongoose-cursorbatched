module.exports = (schema) => {
  schema.query.cursorBatched = async function* ({ batchSize = 20 }) {
    const cursor = await this.cursor({ batchSize });
    let batch = [];
    let hasNext = false;
    do {
      const item = await cursor.next();
      hasNext = !!item;
      if (hasNext) batch.push(item);
      if (batch.length === batchSize) {
        yield batch;
        batch = [];
      }
    } while (hasNext);
    if (batch.length) yield batch;
  };
};
