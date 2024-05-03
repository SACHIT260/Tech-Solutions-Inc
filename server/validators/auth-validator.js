const z=require("zod");

//We can also write the zod schema for login in signup by first writing the schema of email & password in login & extending it to signup,export both
//require both in auth-router

// Creating an object schema
const signupSchema=z.object({
    username:z
        .string({required_error:"Name is required"})
        .trim()
        .min(3,{message:"Name must be atleat of 3 char."})
        .max(255,{message:"Name must not be  of  more than 255 char."}),
    email:z
        .string({required_error:"Email is required"})
        .trim()
        .email({message:"Inavalid email address"})
        .min(3,{message:"Email must be atleat of 3 char."})
        .max(255,{message:"Email must not be  of  more than 255 char."}),
    phone:z
        .string({required_error:"Phone is required"})
        .trim()
        .min(10,{message:"Phone must be atleat of 10 char."})
        .max(20,{message:"Phone must not be  of  more than 20 char."}),
    password:z
        .string({required_error:"Password is required"})
        .min(7,{message:"Password must be atleat of 6 char."})
        .max(1024,{message:"Password can't be greater than 1024 charcters."}),
});

module.exports=signupSchema;