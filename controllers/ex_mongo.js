const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tjdgml97:tjddms78!@cluster0.yomboil.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
  const member = client.db('kdt5').collection('member');

  member.deleteMany({},(deleteManyErr, deleteManyResult) => {
    if(deleteManyErr) throw deleteManyErr;

    member.insertMany (
      [
        { name : '인영' , age: 25 },
        { name : '민영' , age: 25 },
        { name : '성희' , age: 24 },
        { name : '두루' , age: 30 },
      ],
      (insertManyErr, insertManyresult) => {
        if(insertManyErr) throw insertManyErr;

        member.insertOne  (
          {name: '정혁' , age : 26},
          (insertOneErr, insertOneResult )=> {
            if(insertOneErr) throw insertOneErr; 
            console.log("insert:",insertOneResult);

            member.deleteOne(
              {name:'인영'},
              (deleteOneErr, deleteOneResult) => {
                if(deleteOneErr) throw deleteOneErr; 
                console.log("delete:",deleteOneResult);
                member.updateOne(
                  {name:'정혁' , age:26} ,
                  { $set : {name:"인영" , age:25}} ,
                  (updateOneErr, updateOneResult ) => {
                    if(updateOneErr) throw  updateOneErr;
                    console.log("update: ",updateOneResult);
                    const oldCursor = member.find({age : {$gte : 25}},);

                    oldCursor.toArray( (toArrErr, toArrData) => {
                      if(toArrErr) throw toArrErr;
                      console.log(toArrData);
                    })
                  }
                )
              }
            )
          }
        );
      }
    ); 
  })
});