var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';
var jsonObject =  {
      "address" : {
         "street" : "Calle la Mar",
         "zipcode" : "28080",
         "building" : "124",
         "coord" : [ 32.242325, -12.712266 ]
      },
      "borough" : "Madrid",
      "cuisine" : "Japanese",
      "grades" : [
         {
            "date" : new Date(),
            "grade" : "A",
            "score" : 10
         },
         {
            "date" : new Date(),
            "grade" : "B",
            "score" : 8
         }
      ],
      "name" : "Ginza",
      "restaurant_id" : "22724621"
   };
var jsonObject1 =  {
      "address" : {
         "street" : "Avenida Pimientos",
         "zipcode" : "32012",
         "building" : "44",
         "coord" : [ 23.91, -22.26563 ]
      },
      "borough" : "Andorra",
      "cuisine" : "Andorrana",
      "grades" : [
         {
            "date" : new Date(),
            "grade" : "A",
            "score" : 10
         },
         {
            "date" : new Date(),
            "grade" : "B",
            "score" : 9
         }
      ],
      "name" : "McDonalds",
      "restaurant_id" : "2276867821"
   };
var parametreBusqueda = {borough : "Madrid"};
var paramentreDelete = {"borough" : "Andorra"};
var coleccio = 'restaurants';

//INSERT Function
var insertDocument = function(db,coleccio,jsonObject, callback) {
   db.collection(coleccio).insertOne(jsonObject, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the " + coleccio + " collection.");
    callback();
  });
};

//Update Function
var updateDocument = function(db,coleccio,jsonObject, callback) {
   db.collection(coleccio).update(jsonObject, function(err, result) {
    assert.equal(err, null);
    console.log("Updated a document into the " + coleccio + " collection.");
    callback();
  });
};


//FIND All Function
var findAll = function(db,coleccio, callback) {
   var cursor =db.collection(coleccio).find( );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

//FIND Function
var findDocument = function(db,coleccio, parametre, callback) {
   var cursor = db.collection(coleccio).find(parametre);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

//DELETE Function
var deleteDocument = function(db,coleccio, parametre, callback) {
   var cursor = db.collection(coleccio).remove(parametre);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc !== null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

// //INSERT CALL
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   insertDocument(db,coleccio,jsonObject1, function() {
//       db.close();
//   });
// });

// //UPDATE CALL
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   updateDocument(db,coleccio,jsonObject1, function() {
//       db.close();
//   });
// });

// //FIND All CALL
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   findAll(db,coleccio,function() {
//       db.close();
//   });
// });

// //FIND CALL
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findDocument(db,coleccio,parametreBusqueda,function() {
      db.close();
  });
});

