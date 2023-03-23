const { MongoClient, ServerApiVersion } = require('mongodb');
const { MONGO_DB_URI } = process.env;

// const uri = "mongodb+srv://tjdgml97:tjddms78!@cluster0.yomboil.mongodb.net/?retryWrites=true&w=majority";
console.log(MONGO_DB_URI);
const client = new MongoClient(MONGO_DB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;

