const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tjdgml97:tjddms78!@cluster0.yomboil.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function main() {

  try {
  await client.connect();
  const test = client.db('kdt5').collection('test');
  await test.deleteMany({});
  await test.insertMany([
      {name: 'pororo', age: 5},
      {name: 'crong', age: 4},
      {name: 'loopy', age: 6},    
    ]);
  if(!insertManyResult.acknowledged) return '데이터 삽입 에러 발생';
  
  const findCursor = test.find(
    {age : {$gte: 5}}
  );
  const dataArray  = await findCursor.toArray();
  console.log(dataArray);
  // console.log(deleteManyResultSec);

  // const deleteManyResultSec = await test.deleteMany( 
  //   {
  //     $age: {gte:5}
  //   }
  // );


  } catch (err) {
    console.error(err);
  }
}

main();

// insertOne
// client.connect(err => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({},(deleteErr, deleteResult) => {
//     if(deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertOne({
//       name : 'pororo',
//       age: 5,
//     },
//     (insertErr, insertResult) => {
//       if(insertErr) throw insertErr;
//       console.log(insertResult);
//     },
//     );
//   })
// });

//insertMany

// client.connect(err => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({},(deleteErr, deleteResult) => {
//     if(deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name : 'pororo', age: 5, },
//         { name : 'loopy', age: 6, },
//         { name : 'crong', age: 4, },
//       ],
//       (insertErr, insertResult) => {
//         if(insertErr) throw insertErr;
//         console.log(insertResult);
//       },
//     );
//   })
// });

// deleteOne 쿼리 
// client.connect(err => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({},(deleteErr, deleteResult) => {
//     if(deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name : 'pororo', age: 5, },
//         { name : 'loopy', age: 6, },
//         { name : 'crong', age: 4, },
//       ],
//       (insertErr, insertResult) => {
//         if(insertErr) throw insertErr;
//         console.log(insertResult);

//         // 조건은 객체에 담아서 
//         test.deleteMany(
//           { age: {$gte: 5} },
//           (deleteManyErr, deleteManyResult) => {
//             if(deleteManyErr) throw deleteManyErr;
//             console.log(deleteManyResult);
//           }
//         );

//         // client.close()
//       },
//     );
//   })
// });

// update 쿼리 
// client.connect(err => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({},(deleteErr, deleteResult) => {
//     if(deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name : 'pororo', age: 5, },
//         { name : 'loopy', age: 6, },
//         { name : 'crong', age: 4, },
//       ],
//       (insertErr, insertResult) => {
//         if(insertErr) throw insertErr;
//         console.log(insertResult);

//         // 실행결과 - 콜백으로 받음 
//         test.updateOne({name :'loopy'}, {$set: { name: '루피' }},
//         (updateErr, updateResult) => {
//           if(updateErr) throw updateErr;
//           console.log(updateResult);
//         } )

//         // client.close()

//       },
//     );
//   })
// });

// client.connect(err => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({},(deleteErr, deleteResult) => {
//     if(deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name : 'pororo', age: 5, },
//         { name : 'loopy', age: 6, },
//         { name : 'crong', age: 4, },
//       ],
//       (insertErr, insertResult) => {
//         if(insertErr) throw insertErr;
//         console.log(insertResult);

//         // 실행결과 - 콜백으로 받음 
//         test.updateMany({age : { $gte: 5}}, {$set: { name: '5살 이상 친구들!' }},
//         (updateErr, updateResult) => {
//           if(updateErr) throw updateErr;
//           console.log(updateResult);
//         } )

//         // client.close()

//       },  
//     );
//   })
// });

// find 쿼리 
// client.connect(err => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({},(deleteErr, deleteResult) => {
//     if(deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name : 'pororo', age: 5, },
//         { name : 'loopy', age: 6, },
//         { name : 'crong', age: 4, },
//       ],
//       (insertErr, insertResult) => {
//         if(insertErr) throw insertErr;
//         console.log(insertResult);

//         test.findOne(
//           {name : 'loopy'},
//           (findErr, findData)=>{
//             if(findErr) throw findErr;
//             console.log(findData)
//           }
//         )

//         // client.close()

//       },  
//     );
//   })
// });

// client.connect(err => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({},(deleteErr, deleteResult) => {
//     if(deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name : 'pororo', age: 5, },
//         { name : 'loopy', age: 6, },
//         { name : 'crong', age: 4, },
//       ],
//       (insertErr, insertResult) => {
//         if(insertErr) throw insertErr;
//         console.log(insertResult);

//         const findCursor = test.find({},);
//         console.log(findCursor);
//         findCursor.toArray((toArrErr, toArrData) => { 
//           if(toArrErr) throw toArrErr;
//           console.log(toArrData);
//         })

//         // client.close()

//       },  
//     );
//   })
// });


// client.connect(err => {
//   const test = client.db('kdt5').collection('test');

//   test.deleteMany({},(deleteErr, deleteResult) => {
//     if(deleteErr) throw deleteErr;
//     console.log(deleteResult);

//     test.insertMany(
//       [
//         { name : 'pororo', age: 5, },
//         { name : 'loopy', age: 6, },
//         { name : 'crong', age: 4, },
//       ],
//       (insertErr, insertResult) => {
//         if(insertErr) throw insertErr;
//         console.log(insertResult);

//         const findCursor = test.find({},);
//         console.log(findCursor);
//         findCursor.toArray((toArrErr, toArrData) => { 
//           if(toArrErr) throw toArrErr;
//           console.log(toArrData);
//         })

//         // client.close()

//       },  
//     );
//   })
// });