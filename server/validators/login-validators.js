const z=require("zod");


const loginschema=z.object({
    email:z
        .string({required_error:"Email is required"})
        .trim()
        .email({message:"Inavalid email address"})
        .min(3,{message:"Email must be atleat of 3 char."})
        .max(255,{message:"Email must not be  of  more than 255 char."}),
    password:z
        .string({required_error:"Password is required"})
        .min(7,{message:"Password must be atleat of 6 char."})
        .max(1024,{message:"Password can't be greater than 1024 charcters."}),
});

module.exports=loginschema;