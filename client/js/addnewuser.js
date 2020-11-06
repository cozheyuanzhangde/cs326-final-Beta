
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
        'Content-Type': "text/json"
      }, 
      body: JSON.stringify({ "useremail": useremail, "userpassword": userpassword })
    });
}

document.getElementById('submit').addEventListener('click',()=>{
    postAddNewUser('/addnewuser', useremail, userpassword);
    alert("Successful! You become a member of FindUrCourse Club!");
    window.location.href = "./index.html";
});