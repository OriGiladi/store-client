export const addingProductValidator = ( price: string) => {
    
    const pricePattern:RegExp = /^[0-9]+$/;

    interface Validation {
        price: string;
        image: string
    }
    
    const validationResult = {
        price: "",
    } as Validation;


    if (!(pricePattern.test(price)))
    validationResult.price = `The price is in shekels, insert only the amount`

    else{
        validationResult.price = ""
    }

    return validationResult
}