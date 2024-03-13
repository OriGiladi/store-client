export interface productProperties {
    name: string;
    price: string;
    description: string;
    image: string
}
export const productValidator = ( insertedProduct: productProperties) => {
    
    const pricePattern:RegExp = /^[0-9]+$/; 
    const validationResult = {
        name: "",
        price: "",
        description: "",
        image: ""
    } as productProperties;

    if(insertedProduct.name === ""){
        validationResult.name = `Please enter a product name`
    }
    if(insertedProduct.price === ""){
        validationResult.price = `Please enter a product price`
    }
    else if (!(pricePattern.test(insertedProduct.price))){
        validationResult.price = `The price is in shekels, insert only the amount`
    }
    if(insertedProduct.description === ""){
        validationResult.description = `Please enter a product description`
    }
    if(insertedProduct.image === ""){
        validationResult.image = `Please enter a product image URL`
    }
    return validationResult
}

export const isProductValidated = ( insertedProduct: productProperties) => {
    return insertedProduct.name === "" && insertedProduct.price === "" && insertedProduct.description === "" && insertedProduct.image === "";
}