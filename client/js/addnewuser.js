const userEmailInput = document.getElementById("useremail");
const userPwdInput = document.getElementById("userpassword");
const userPwdConfInput = document.getElementById("confirm-userpassword");
const letter = document.getElementById("letter");
const number = document.getElementById("number");
const length = document.getElementById("length");

function focusMethod1() {           
  document.getElementById("useremail").focus();
}

function focusMethod2() {           
  document.getElementById("userpassword").focus();
}

function focusMethod3() {           
  document.getElementById("confirm-userpassword").focus();
}

userEmailInput.addEventListener(onclick, focusMethod1);
userPwdInput.addEventListener(onclick, focusMethod2);
userPwdConfInput.addEventListener(onclick, focusMethod3);

// When the user clicks on the password field, show the message box
userPwdInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
};

// When the user clicks outside of the password field, hide the message box
userPwdInput.onblur = function() {
  document.getElementById("message").style.display = "none";
};

function checkEmail(){
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(userEmailInput.value.match(mailformat)){
    userEmailInput.classList.remove("wrong");
  }else{
    if(!userEmailInput.classList.contains("wrong")){
      userEmailInput.classList.add("wrong");
    }
  }
};

// When the user starts to type something inside the password field
userPwdInput.onkeyup = function() {
  // Validate letters
  const letters = /[a-zA-Z]/g;
  if(userPwdInput.value.match(letters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate numbers
  const numbers = /[0-9]/g;
  if(userPwdInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(userPwdInput.value.length >= 6) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};

userPwdConfInput.onkeyup = function() {
  if(userPwdConfInput.value.match(userPwdInput.value)){
    userPwdConfInput.classList.remove("wrong");
  }else{
    if(!userPwdConfInput.classList.contains("wrong")){
      userPwdConfInput.classList.add("wrong");
    }
  }
};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

