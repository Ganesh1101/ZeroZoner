const express = require('express');
const port=3020;
const { MongoClient, ObjectId }=require('mongodb');
url='mongodb://localhost:27017/';
const client =new MongoClient(url);
 async function connect(){
    try{
         await client.connect().then(()=>{
            console.log("connection Established")
        })
    }
    catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}
connect();

const databaseName='ZeroZoner';
//Insterting data in database
function insert(collectionName,docToIns){
   
    const database=client.db(databaseName);
    const collection=database.collection(collectionName);
   
    const result=collection.insertOne(docToIns).then(()=>{
        console.log(' Inserted Successfully');
    });
}
//Deleting document Data
function drop(collectionName,Id)
{
    const database=client.db(databaseName)
    const collection=database.collection(collectionName);
    collection.deleteOne({_id:Id}).then(()=>{
        console.log("Deleted Succesfully");
    });
    
}
//Updating values in database 
function update(collectionName,filter,updatekey){
    const database=client.db(databaseName);
    const collection=database.collection(collectionName);
    update={$set:updatekey}
    collection.updateOne(filter,update);
    console.log('Document Updated');
}
//insert('users',{name:'Mano',email:'ganeshofficial1101@gmail.com',phone:1234567890, role:'Freelancer'});
insert('projects',{name:'Mano',description:'Practice Project',fileRegardingTheConcept:'test'});
insert('user_wallets',{userBalance:100000,accountDetails:'Test'});
insert('user_transactions',{TransactionId:'12ab34cd',pamentMode:'test',amount:100000,"Credit/Debit":'test'});
drop('users',new ObjectId("65b2008d0f755f5c8c2c52ac"));
update('users',{name:'Mano'},{phone:2345678910});
const app=express();
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})