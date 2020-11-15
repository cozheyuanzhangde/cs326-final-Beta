
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
    postAddNewUser('/addnewuser', useremail, userpassword);
    alert("Successful! You become a member of FindUrCourse Club!");
    window.location.href = "./index.html";
});