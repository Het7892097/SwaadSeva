const { z } = require("zod");

const indianMobNoSchema = z.string().length(13).startsWith("+91");
const passwordSchema = z.string().length(60);
const nameSchema = z.string().min(3).max(30);
const isAdminSchema = z.boolean().optional();

function userCreateValidator(reqBody) {
  console.log("Through user_CU_Validtor");
  const userZSchema = z.object({
    mobNo: indianMobNoSchema,
    password: passwordSchema, //password in hased format
    name: nameSchema,
    isAdmin: isAdminSchema,
  });

  const result = userZSchema.safeParse(reqBody);
  // console.log(result); //for debugging
  return result["success"];
}

function UserLoggingValidator(reqBody) {
  const userZSchema = z
    .object({
      mobNo: indianMobNoSchema,
      password: z.string(),
    })
    .strict(); //ensure that any other, especially isAdmin feild is not provided for preventing unAuthorized access

  const result = userZSchema.safeParse(reqBody);
  // console.log(result);
  return result.success;
}

function UserUpdaterValidator(reqBody) {
  const userZSchema = z
    .object({
      password: z.string().optional(),
      name: nameSchema.optional(),
    })
    .strict(); //ensure that any other, especially isAdmin feild is not provided for preventing unAuthorized access

  const result = userZSchema.safeParse(reqBody);
  return result.success; // Simplified access to success property
}

function MobNoValidator(mobNo) {
  const result = indianMobNoSchema.safeParse(mobNo);
  return result["success"];
}

module.exports = {
  MobNoValidator,
  UserUpdaterValidator,
  userCreateValidator,
  UserLoggingValidator,
};

//test-cases for checking the proper functioning of aboce validators:

// console.log(userCreateValidator({
//     mobNo:"+919225953800",
//     password:"$2a$12$/3691FK5hyFU3FiItl917ujnRNrze.GyQgo4dvq4gVNy3XRrK1oWi"
// }));

// console.log(UserLoggingValidator({
//     mobNo:"+919225953800",
//     password:"$2a$12$/3691FK5hyFU3FiItl917ujnRNrze.GyQgo4dvq4gVNy3XRrK1oWi"
// }));
// console.log(UserUpdaterValidator({
//     password:"$2a$12$/3691FK5hyFU3FiItl917ujnRNrze.GyQgo4dvq4gVNy3XRrK1oWi",
//     name:"ERGergreg"
// }));
// const transactHistorySchema=z.object({
//     ordDate:z.date(),
//     name:z.string().min(3).max(10),
//     quantity:z.number().min(1).max(15)
// });
