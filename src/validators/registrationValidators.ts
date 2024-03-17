export const firstNameValidator = (firstName: string) => {
    const namePattern: RegExp = /^[A-Za-z]+$/;
    if(firstName.length < 2 || !(namePattern.test(firstName))){
        return `First name needs to be at least two characters long and shouldnt consist digits`
    }
    else{
        return ""
    }
}
export const lastNameValidator = (lastName: string) => {
    const namePattern: RegExp = /^[A-Za-z]+$/;
    if(lastName.length < 2 || !(namePattern.test(lastName))){
        return `First name needs to be at least two characters long and shouldnt consist digits`
    }
    else{
        return ""
    }
}
export const emailValidator = (email: string) => {
    const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        return 'Please enter a valid email address.';
    }
    else{
        return ""
    }
}
export const passwordValidator = (password: string) => {
    const passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (password.length < 8 || !passwordPattern.test(password)) {
        return 'Password should be at least 8 characters long and contain at least one lowercase and one uppercase letter.';
    }
    else{
        return ""
    }
}