async function nameLister(nameFilter = null,categoryFilter=null) { //setting default value to null, so for checking if no input ir provided
    if(nameFilter == ""){
        nameFilter=null;
    }
    if(categoryFilter==""){
        categoryFilter=null;
    }
    try {
        if( (nameFilter === null ) && (categoryFilter === null || categoryFilter == "")) {
            // return "emptIp";
            return await Product.aggregate([
                { $sample: { size: 15 } } // returning 15 random products
            ]);

        }
        //else

        else if(ca) {return await Product.find({
            name: {
                "$regex": nameFilter, //matches document/values based mathcing with filter
                "$options": "i" // allows case-insenstivity
            }
        })}
    }
    catch (e) { 
        console.error("Error occurred while fetching product-list"+e.message);
        return "FetchError";
    }
}