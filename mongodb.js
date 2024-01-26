const express = require('express');
const{ MongoClient, ObjectId } = require('mongodb');
const bodyParser=require('body-parser');
const port=3040;
const uri='mongodb://localhost:27017/';
const client =new MongoClient(uri);
const databaseName="Sample";
function dbConnect(){
    try{
        client.connect().then(()=>{
            console.log("Connection Established")
        });
    }
    catch(err){
        console.log(err);
    }
}
dbConnect();
function insert(collectionName,DocToInc){
    const database=client.db(databaseName);
    const collection=database.collection(collectionName);
    let ins=collection.insertOne(DocToInc).then(()=>{
        console.log('Document Inserted');
    });
    return ins;    
}
function drop(collectionName,id){
    const database=client.db(databaseName);
    const collection=database.collection(collectionName);
    const Id= new ObjectId(id);
    let del=collection.deleteOne({_id:Id}).then(()=>{
        console.log('Deleted Successfully')
    })
    return del;
    
}
function change(collectionName,filter,updatekey){
    const database=client.db(databaseName);
    const collection=database.collection(collectionName);
    const update={$set:updatekey}
    let updt=collection.updateOne(filter,update).then(()=>{
        console.log()
    });
    return updt;
}
const app=express();
app.use(bodyParser.json());
app.post('/api/Insert/:collection',(req,res)=>{
    let collection=req.params.collection
    let data=req.body;
    try{
       const ins= insert(collection,data);
       if(ins)
        {
            res.json("Inserted")
        }
        else{
            res.json("Not Inserted")
        }
        
    }
    catch(err){
        console.log(err);
    }
    
    
});
app.delete('/api/Delete/:collection/:id',(req,res)=>{
    let collection=req.params.collection
    let id=req.params.id;
    try{
       let del= drop(collection,id);
       if(del)
        {
            res.json('Deleted')
        }
        else{
            res.json('Not Found')
        }
    }
    catch(err){
        console.log(err);
    }
});
app.put('/api/Update/:collection/:Name/',(req,res)=>{
    let collection=req.params.collection
    let Names=req.params.Name;
    let data ={Name:Names};
    let update=req.body;
    try{
        change(collection,data,update);
        res.json('Updated');
    }
    catch(err){
        console.log(err);
    }
   
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});