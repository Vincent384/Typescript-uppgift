

export function registerValidate(form:RegisterForm,setError:React.Dispatch<React.SetStateAction<RegisterForm>>):boolean{

    let emailError = ''
    let passwordError = ''
    let userNameError = ''

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!emailRegex.test(form.email)) {
      emailError = 'Please enter a valid email address'
    }
  


    if (!passwordRegex.test(form.password)) {
      passwordError = 'Password must be at least 8 characters long, contain at least one letter, one number, and one special character'
    }
    
    if(form.userName.trim() === ''){
        userNameError = 'Must write a user name'
    }

    if(form.userName.length <= 2){
        userNameError = 'Your user name must at least have 3 or more characters'
    }
    
    if(emailError || passwordError || userNameError){
        setError({
            email:emailError,
            password:passwordError,
            userName:userNameError
        })
        return false
    }
     return true
    }