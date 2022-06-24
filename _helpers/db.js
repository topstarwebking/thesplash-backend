const mongoose = require("mongoose");
const conf = require("../config.json");
const gCloud = require("./SecretManager");

// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://Robin:yDCuGR51NjyCHhu4@cluster0.5wwuzix.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   // const collection = client.db("splash").collection("devices");
//   // perform actions on the collection object
//   console.log(err);
//   console.log("asdfsdfasdfsadfsdf=-========================");
//   client.close();
// });
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

gCloud
  .getSecret("freshcart-mongo-uri")
  .then((urifromsecret) => {
    connectDB(
      "mongodb+srv://Robin:yDCuGR51NjyCHhu4@cluster0.5wwuzix.mongodb.net/?retryWrites=true&w=majority"
    );
  })
  .catch((error) => {
    console.log("Error in fetching DB secret: ", error);
    return res.status(503).json(error);
  });

function connectDB(dbURI) {
  mongoose
    .connect(dbURI, connectionOptions)
    .catch((error) => console.error(error));

  mongoose.Promise = global.Promise;

  mongoose.connection.on("error", (e) => {
    console.log("DB02 - DB Connection Error");
  });
  mongoose.connection.on("connected", () => {
    console.log("DB00 - DB Connection Successful");
  });
}

module.exports = {
  // User: require("../models/user.model"),
  // Cart: require("../models/cart.model"),
  // CartInventory: require("../models/cartinventory.model"),
  // Invite: require("../models/invite.model"),
  // Itemmaster: require("../models/itemmaster.model"),
  // ZipItemPrice: require("../models/zipitemprice.model"),
  // CartLocation: require("../models/cartlocation.model"),
  // Basket: require("../models/basket.model"),
  WhiteList: require("../models/whitelist.model"),
};
