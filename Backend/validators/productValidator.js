const { z } = require("zod");

const idSchema=z.string().length(24)
const nameSchema = z.string().min(3).max(15);
const priceSchema= z.number().min(5).max(2000);
const descSchema=z.string().min(5).max(50);
const categorySchema=z.number().min(1).max(8);
const boolSchema= z.boolean();
const urlSchema=z.string().url();
//An Validator for checking the fields while adding an Product
function ProductCreateValidator(reqBody) {
    const productZSchema = z.object({
        _id:idSchema.optional(),
        name: nameSchema,
        price: priceSchema,
        desc:descSchema ,
        category: categorySchema,
        veg:boolSchema,
        isAvailable:boolSchema ,
        imgLink: urlSchema
    });

    const result = productZSchema.safeParse(reqBody);
    return result["success"];
}
function productUpdateValidtor(reqBody) {
    const productZSchema = z.object({
        _id:idSchema,
        name: nameSchema.optional(),
        price:priceSchema.optional(),
        desc:descSchema.optional() ,
        category: categorySchema.optional(),
        veg: boolSchema.optional(),
        isAvailable: boolSchema.optional(),
        imgLink:urlSchema.optional()
    });

    const result = productZSchema.safeParse(reqBody);
    return result["success"];
}
//single orderSchema
const orderSchema = z.object({
    name: nameSchema,
    quantity: z.number().min(1).max(15)
})

//schema for multiple orders=orderlLst
function userOrderValidator(userOrder) {
    const productOrderSchema = z.array(orderSchema);
    const result = productOrderSchema.safeParse(userOrder);
    return result["success"];
}

function productIdValidator(inputId){
    const productIdSchema = idSchema;
    const result = productIdSchema.safeParse(inputId);
    return result["success"];
}
// console.log(userOrderValidator([
//     {
//         name: "coke",
//         quantity: 2
//     },
//     {
//         name: "Mung Daal",
//         quantity: 5
//     }
// ]));
// console.log(ProductCreateValidator({
//     name: "Chole Bhature",
//     price: 120,
//     desc: "Spicy chickpeas served with deep-fried bread",
//     category: 3,
//     veg: true,
//     isAvailable: true,
//     imgLink: "https://foodsandflavorsbyshilpi.com/wp-content/uploads/2016/09/FB-Thumnails-website-old-2-300x300.jpg"
// }
// ));
// console.log(productIdValidator("66ee5ae9c030b20a03800811"));
module.exports = {
    ProductCreateValidator, userOrderValidator,productUpdateValidtor,productIdValidator
}