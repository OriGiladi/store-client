export const registrationValidators = (firstName: string, lastName: string, email: string, password: string) => {

    const namePattern: RegExp = /^[A-Za-z]+$/;
    
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    interface Validation {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
    
    const validationResult= {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    } as Validation;

    if(firstName.length < 2 || !(namePattern.test(firstName)))
        validationResult.firstName = `First name needs to be at least two characters long and shouldnt consist digits`

    else{
        validationResult.firstName = ""
    }
    if(lastName.length < 2 || !(namePattern.test(lastName)))
        validationResult.lastName = `First name needs to be at least two characters long and shouldnt consist digits`
    
    if (!emailPattern.test(email)) {
        validationResult.email = 'Please enter a valid email address.';
    }

    if (password.length < 8 || !passwordPattern.test(password)) {
        validationResult.password = 'Password should be at least 8 characters long and contain at least one lowercase and one uppercase letter.';
    }
    return validationResult;
}