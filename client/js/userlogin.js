
let useremail = '';
document.getElementById('useremail').addEventListener('change',()=>{
  useremail = document.getElementById('useremail').value;
});

let userpassword = '';
document.getElementById('userpassword').addEventListener('change',()=>{
    userpassword = document.getElementById('userpassword').value;
});

// function validateEmail(inputText){
//     var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//     if(inputText.value.match(mailformat)){
//         return true;
//     }
//     else{
//         return false;
//     }
// }

// function validatePassword(inputText) { //6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
//     var pwd=  /^[A-Za-z]\w{7,14}$/;
//     if(inputText.value.match(pwd)){ 
//         return true;
//     }
//     else{ 
//         return false;
//     }
// }

function focusMethodE() {           
    document.getElementById("useremail").focus();
}

function focusMethodP() {           
    document.getElementById("userpassword").focus();
}


document.getElementById('loginid').addEventListener('click', ()=>{
    if(useremail === ''){
        alert("Sorry, you should enter email, please try again!");
    }
    else if(userpassword === ''){
        alert("Sorry, you should enter password, please try again!");
    }
    else if(!validateEmail(useremail)){
        alert("You have entered an invalid email address! Please try again!");
    }
    else if(!validatePassword(userpassword)){
        alert("You have entered an invalid password! Please try again!");
    }
    else if(validateEmail(useremail) && validatePassword(userpassword)){
        alert("Login Success, jump back to main page.");
        window.location.href = "./index.html";
    }
});