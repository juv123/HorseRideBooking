export const validateData=(email,phone,name) => {
    const isEmailValid=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const isPhoneNumberValid=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
    const isNameValid=/^[a-zA-Z ]*$/.test(name);
    if(!isNameValid)
    return "Name is not valid";
    if(!isEmailValid)
    return "Email ID is not valid";
     if(!isPhoneNumberValid)
     return "Phone number is not valid";
        
     return null;
   
}