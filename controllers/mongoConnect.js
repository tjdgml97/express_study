const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tjdgml97:tjddms78!@cluster0.yomboil.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, 
  { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client;