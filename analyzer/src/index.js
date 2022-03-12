const mongoose = require("mongoose");
const utils = require("./utils");

const analyze = async () => {
  await mongoose.connect("mongodb://crawler:123456@localhost:27017/projects", {
    authSource: "admin",
  });
  const schema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: function genUUID() {
          return uuidv4;
        },
      },
    },
    { strict: false }
  );
  const Model = mongoose.model("Project", schema);

  let keepRunning = true;
  while (keepRunning) {
    try {
      const documents = await Model.find();
      for (const doc of documents) {
        const {
          _id,
          _doc: { __v, ...data },
        } = doc;

        await utils.sleep(10000);

        const analysis = {
          similarity: utils.random(100) + "%",
          uniqueness: utils.random(100) + "%",
          complexity: utils.random(100) + "%",
          analyzedAt: new Date().toISOString(),
        };

        await Model.findByIdAndUpdate(
          _id,
          {
            ...data,
            analysis,
          },
          { new: true }
        );

        console.log(`Project <${data.name}> analyzed successfully!`);
      }
    } catch (err) {
      keepRunning = false;
    }
  }

  await mongoose.connection.close();
};

analyze().catch(async (err) => {
  await mongoose.connection.close();
  console.error(err);
});
