
let useremail = '';
document.getElementById('useremail').addEventListener('change',()=>{
  useremail = document.getElementById('useremail').value;
});

let userpassword = '';
document.getElementById('userpassword').addEventListener('change',()=>{
    userpassword = document.getElementById('userpassword').value;
});

async function postAddNewUser(url = '', useremail, userpassword) {
    await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': "application/json"
      }, 
      body: JSON.stringify({ "email": useremail, "password": userpassword, "username": "Anonymous",  "schoolname": "", "gender": "", "major": ""})
    });
}

function focusMethodE() {           
  document.getElementById("useremail").focus();
}

function focusMethodP() {           
  document.getElementById("userpassword").focus();
}

function focusMethodP2() {           
  document.getElementById("confirm-userpassword").focus();
}

let pswID = document.getElementById('userpassword');


document.getElementById('submit').addEventListener('click',()=>{
    if(useremail === ''){
      alert("Sorry, you should enter email, please try again!");
    }
    else if(userpassword === ''){
      alert("Sorry, you should enter password, please try again!");
    }
    else if(document.getElementById("confirm-userpassword").value === ''){
      alert("Sorry, you should confirm password, please try again!");
    }
    else{
      postAddNewUser('/addnewuser', useremail, userpassword);
      alert("Successful! You become a member of FindUrCourse Club!");
      window.location.href = "./index.html";
    }
});