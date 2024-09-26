const { z } = require("zod");

const idSchema = z.string().length(24, { message: "ID must be exactly 24 characters long." });

const nameSchema = z.string()
  .min(3, { message: "Name must be at least 3 characters long." })
  .max(25, { message: "Name must not exceed 25 characters." });

const priceSchema = z.number()
  .min(5, { message: "Price must be at least 5." })
  .max(2000, { message: "Price must not exceed 2000." });

const descSchema = z.string()
  .min(5, { message: "Description must be at least 5 characters long." })
  .max(50, { message: "Description must not exceed 50 characters." });

const categorySchema = z.number()
  .min(1, { message: "Category must be between 1 and 8." })
  .max(8, { message: "Category must be between 1 and 8." });

const boolSchema = z.boolean().refine(val => val === true, {
  message: "This field must be true."
});

const urlSchema = z.string().url({ message: "Please provide a valid URL." });

function ProductCreateValidator(reqBody) {
    const productZSchema = z.object({
        name: nameSchema,
        price: priceSchema,
        desc: descSchema,
        category: categorySchema,
        veg: boolSchema,
        isAvailable: boolSchema,
        imgLink: urlSchema
    });

    const result = productZSchema.safeParse(reqBody);

    // Log the validation result
    if (!result.success) {
        console.error("Validation failed with the following errors:");
        result.error.errors.forEach((error) => {
            console.error(`Field: ${error.path.join('.')} - ${error.message}`);
        });
    } else {
        console.log("Validation successful!");
    }

    return result.success; // Return success status
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
// console.log(userOrderValidator([{"name":"Orange Juice","quantity":4,"price":60}]));
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