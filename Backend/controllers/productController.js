const { lister, creator, remover, updater } = require("../repository/productRepo");

const productLister = async (req, res) => {
    const result = await lister(req.query.filter);

    if (result == "FetchError") {
        return res.status(500).json({
            message: "Error occurred while fetching Product-list"
        });
    }
    else {
        return res.status(200).json({
            message: "Product-list corresponding to filter",
            productList: result
        });
    }
}

const productCreator = async (req, res) => {
    const result = await creator(req.body);

    if (result == "InvalidProductDetails") {
        return res.status(400).json({
            message: "Invalid Product Details"
        });
    }
    else if (result == "ProductAlreadyExists") {
        return res.status(409).json({
            message: "Product already exists, so try changing name or Updating that product-details"
        });
    }
    else if (result == "ProductCreationSuccess") {
        return res.status(200).json({
            message: "Product created Successfully"
        });
    }
    else {
        return res.status(500).json({
            message: "Error occurred while creating Product"
        });
    }
}

const productUpdater = async (req, res) => {
    const result = await updater(req.body);

    if (result == "InvalidProductDetails") {
        return res.status(400).json({
            message: "Invalid Product Details"
        });
    }
    else if (result == "ProductNotExists") {
        return res.status(400).json({
            message: "Product not exists, try adding or changing name"
        });
    }
    else if (result == "ProdUpdateSucess") {
        return res.status(200).json({
            message: "Product updated Successfully"
        });
    }
    else {
        return res.status(500).json({
            message: "Product updation failed"
        });
    }
}

const productRemover = async (req, res) => {
    const result = await remover(req.body["_id"]);
    if (result == "ProductNotExists") {
        return res.status(400).json({
            message: "Product not exists, try adding or changing name"
        });
    }
    else if (result == "ProductDeleteSuccess") {
        return res.status(200).json({
            message: "Product deleted Successfully"
        });
    }
    else {
        return res.status(500).json({
            message: "Product deletion failed"
        });
    }
}

module.exports = {
    productCreator, productLister, productRemover, productUpdater
}