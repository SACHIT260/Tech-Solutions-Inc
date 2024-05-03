const User=require("../models/user-model");
const Contact=require("../models/contact-model");

const getAllUsers= async(req,res)=>{
    try {
        const users=await User.find({},{password:0});
        console.log(users.username);
        if(!users || users.length===0){
            return res.status(404).json({message:"No Users found"});
        }
       return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}


//Single user logic
const getUserById= async(req,res,next)=>{
    try {
        const id=req.params.id;
        const data=await User.findOne({_id:id},{password:0});
        return res.status(200).json({message:data});
    } catch (error) {
        next(error);
    }
}

//logic to update user data

const updateUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        const updatedUserData=req.body;

        const updatedData=await User.updateOne({_id:id},{$set:updatedUserData});
        return res.status(200).json(updatedData)
    } catch (error) {
        next(error);
    }
}


//Logic to delete user

const deleteUserById= async(req,res)=>{
    try {
        const id=req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}

//logic to get contact
const getAllContacts=async(req,res)=>{
    try {
        const contacts=await Contact.find();
        //  console.log(contacts);
        if(!contacts || contacts.length===0){
            return res.status(404).json({message:"No Contacts found"});
        }
       return res.status(200).json(contacts);
    }
    catch (error) {
        // console.log(error.message)
        next(error);
    }
}

//Logic to delete contact

const deleteContactById= async(req,res)=>{
    try {
        const id=req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"Contact Deleted Successfully"});
    } catch (error) {
        next(error);
    }
}


module.exports={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById}