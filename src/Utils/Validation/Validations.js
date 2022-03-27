export const isEmailValid = (value) => {

    const regex = RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return !regex.test(value);
}

export const handleValiDation =(key,value)=>{
    
     switch (key) {
          case "Name":
               return value.length < 3;
          case "Password":
               return value.length < 8;
          case "Email":
               return isEmailValid;           
          case "Phone":
               return value.length < 10;
          case "Address":
               return value.length < 10;
          case "country":
               console.log(value)
               return value.length
          case "message":
               return value.length < 1;                                                      
        default:
            break;
     }
}    