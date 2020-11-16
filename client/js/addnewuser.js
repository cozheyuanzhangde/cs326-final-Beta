
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