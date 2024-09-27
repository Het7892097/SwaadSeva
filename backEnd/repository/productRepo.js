const jwt = require("jsonwebtoken");
const { Product } = require("../DB");
const {
  ProductCreateValidator,
  productUpdateValidtor,
  productIdValidator,
} = require("../validators/productValidator");
const { mongo } = require("mongoose");
const { secretKey } = require("../utils/KeySettings");

async function nameLister(nameFilter = null) {
  //setting default value to null, so for checking if no input ir provided
  try {
    if (nameFilter === null || nameFilter == "") {
      // return "emptIp";
      return await Product.aggregate([
        { $sample: { size: 15 } }, // returning 15 random products
      ]);
    }
    //else

    return await Product.find({
      name: {
        $regex: nameFilter, //matches document/values based mathcing with filter
        $options: "i", // allows case-insenstivity
      },
    });
  } catch (e) {
    console.error("Error occurred while fetching product-list" + e.message);
    return "FetchError";
  }
}
async function categoryLister(categoryFilter = null) {
  try {
    if (categoryFilter === null || categoryFilter === "") {
      // No category filter, return products grouped by category
      return await Product.aggregate([
        {
          $group: {
            _id: "$category", // Group by category field
            products: { $push: "$$ROOT" }, // Push the entire product into the 'products' array
          },
        },
      ]);
    }

    // If category filter is provided, return filtered products
    return await Product.find({
      category: categoryFilter,
    });
  } catch (e) {
    console.error("Error occurred while fetching product-list: " + e.message);
    return "FetchError";
  }
}

async function creator(reqBody) {
  reqBody.category = parseInt(reqBody.category);
  reqBody.price = parseInt(reqBody.price);
  const result = ProductCreateValidator(reqBody);

  if (!result) {
    return "InvalidProductDetails";
  }
  reqBody.name = reqBody.name.trimStart().toLowerCase();
  //else part
  try {
    const productExistence = await Product.findOne({
      name: reqBody.name,
    });

    if (productExistence) {
      return "ProductAlreadyExists";
    }

    var newProduct = await Product.create({
      name: reqBody.name,
      price: reqBody.price,
      desc: reqBody.desc,
      category: reqBody.category,
      veg: reqBody.veg,
      isAvailable: reqBody.isAvailable,
      imgLink: reqBody.imgLink,
    });

    return "ProductCreationSuccess";
  } catch (e) {
    console.error("Error while creating product " + e.message);
    return "DBCreationFailed";
  }
}

async function updater(reqBody) {
  // console.log(reqBody); //for debugging
  if (reqBody.price) {
    reqBody.price = parseInt(reqBody.price);
  }
  if (reqBody.category) {
    reqBody.category = parseInt(reqBody.category);
  }
  const result = productUpdateValidtor(reqBody);

  if (!result) {
    return "InvalidProductDetails";
  }
  //else part
  const targetProduct = await ProductGetter(reqBody._id);

  if (targetProduct == null) {
    return "ProductNotExists";
  }
  //else part
  try {
    await Product.updateOne({ _id: reqBody._id }, { $set: reqBody }); ///try separating id from body id error occurs while udpating
    return "ProdUpdateSucess";
  } catch (e) {
    console.error("Error while updating product " + e.message);
    return "DBUpdationFailed";
  }
}

async function remover(productId) {
  const targetProduct = await ProductGetter(productId);

  if (targetProduct == null) {
    return "ProductNotExists";
  }
  //else
  try {
    await Product.deleteOne({ _id: productId });
    return "ProductDeleteSuccess";
  } catch (e) {
    console.error("Error while deleting product " + e.message);
    return "DBDeleteFailed";
  }
}

async function ProductGetter(productId) {
  if (productId == null || productId == "") {
    return "InvalidProductId";
  }
  //else part

  try {
    return await Product.findById(productId);
  } catch (e) {
    console.error("Error occurred while getting Product list " + e.message);
    return "ErrorProductFetching";
  }
}

module.exports = {
  nameLister,
  categoryLister,
  creator,
  updater,
  remover,
};
