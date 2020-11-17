
let useremail = '';
document.getElementById('useremail').addEventListener('change',()=>{
  useremail = document.getElementById('useremail').value;
});

let userpassword = '';
document.getElementById('userpassword').addEventListener('change',()=>{
    userpassword = document.getElementById('userpassword').value;
});

function ValidateEmail(inputText){
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(inputText.value.match(mailformat)){
        alert("Valid email address!");
        document.form1.text1.focus();
        return true;
    }
    else{
        alert("You have entered an invalid email address!");
        document.form1.text1.focus();
        return false;
    }
}

document.getElementById('submit').addEventListener('click', ()=>{

});