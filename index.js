const express = require("express");
const app = express();
const User = require("./connection")

app.use(express.json())

// post
app.post("/register",async(req,res)=>{
    // console.log("fff",req.body)
    const {name,email,password,date} = req.body;
    const newDate = new Date(date); 
    const data =  await User.create({name,email,password,date:newDate});
    res.status(201).send(data);
})

// get 
app.get("/getUserData", async(req,res)=>{
    const userData = await User.find();
    return res.status(200).json({data:userData})
})

// getById
app.get("/getUserDataById/:id", async(req,res)=>{
    const {id} = req.params;
    const userData = await User.findById({_id:id});
    return res.status(200).send(userData)
})

app.put("/updateUserData/:id", async(req,res)=>{

    try{
        const {id} = req.params;
        const {email,password} = req.body;
        // const userData = await User.findById({_id:id});
        const updateUserById = await User.findByIdAndUpdate({ _id: id }, {email,password},{new: true});
        return res.status(200).send(updateUserById)    
    }
    catch(error){
      return res.status(500).send(error.message)
    } 
})

app.put("/updateUserData", async(req,res)=>{

    try{
        const {email,password,id} = req.body;
        // const userData = await User.findById({_id:id});
        const updateUserById = await User.findByIdAndUpdate({ _id: id }, {email,password},{new: true});
        return res.status(200).send(updateUserById)    
    }
    catch(error){
      return res.status(500).send(error.message)
    } 
})

app.put("/updateuserdatabyname",async(req,res)=>{
    try {
    const {email,password,name}=req.body;
    const data = await User.findOneAndUpdate({name:name},{email,password},{new:true})
    return res.status(200).send(data)
} catch (error) {
        return res.status(500).send(error.message);
}
})

app.delete("/deleteById/:id",async(req,res)=>{
    try {
    const {id}=req.params;
    const data = await User.findByIdAndDelete({_id:id})
    return res.status(200).send(data)
} catch (error) {
        return res.status(500).send(error.message);
}
})

app.delete("/deleteByName/:name",async(req,res)=>{
    try {
    const {name}=req.params;
    const data = await User.findOneAndDelete({name:name})
    return res.status(200).send({message:"successfully deleted"})
} catch (error) {
        return res.status(500).send(error.message);
}
})

app.get("/advanceSearch",async(req,res)=>{
    const {limit,sort} =req.query;
    req.query.sort?req.query.sort==='desc'?-1:1:1
    req.query.limit?req.query.limit:5
    // const data = await User.find({}).limit(3).sort({date:1})
    const data = await User.find({}).limit(5).sort({date:1})
    const count = await User.find({}).count();
    return res.status(200).send({data,count})
})

// app.get("/querySearch", async(req,res)=>{
//     const query = req.query.seach;
//     // const data = User.find({ name: { $regex: query, $options: "i" } });
//     const data = User.find({ $text : { $search : query }});
//     return res.status(200).send({data:data})
// })


// and
app.get("/andOperator", async(req,res)=>{
    const {name, email} = req.body;
    const data = await User.findOne({$and:[{name:name},{email:email}]});
    if(data){
        res.status(200).send(data);
    } else{
        res.status(200).send("No record found")
    }
})

// or
app.get("/orOperator", async(req,res)=>{
    const {name, email} = req.body;
    const data = await User.findOne({$or:[{name:name},{email:email}]});
    if(data){
        res.status(200).send(data);
    } else{
        res.status(200).send("No record found")
    }
})

app.get("/greaterThan", async(req,res)=>{
    const {date} = req.body;
    const newDate = new Date(date);
    const data = await User.find({date:{$gt:newDate}});
    return res.status(200).send(data)
})

app.get("/greaterThanAndlessThan", async(req,res)=>{
    const {startDate} = req.body;
    const newStartDate = new Date(startDate);
    const {endDate} = req.body;
    const newEndDate = new Date(endDate);
    const data = await User.find({date:{$gt:newStartDate, $lt:newEndDate}});
    return res.status(200).send(data)
})

app.get("/pagination", async(req,res)=>{
    const page = req.query.page || 0;
    const perpage = 3;
    const data = await User.find({}).limit(perpage).skip((page-1)*perpage)
    return res.status(200).send(data)
})

app.get("/existAndTypeOperator", async(req,res)=>{
    // const data = await User.find({email:{$exists:false}})
    const data = await User.find({email:{$exists:true,$type:"bool"}})
    return res.status(200).send(data)
})










app.listen(4000,()=>{
    console.log("server listen on port no 4000")
})
