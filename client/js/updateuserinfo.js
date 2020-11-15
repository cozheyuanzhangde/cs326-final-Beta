let useremail = '';
useremail = document.getElementById('useremail').value;

let userpassword = '';
userpassword = document.getElementById('userpassword').value;


let username = '';
username = document.getElementById('username').value;

let userschoolname = '';
userschoolname = document.getElementById('userschoolname').value;

let usergender = '';
usergender = document.getElementById('usergender').value;

let usermajor = '';
usermajor = document.getElementById('usermajor').value;

const userid = 1; //For Testing Purpose

console.log(useremail);

async function updateUserInfo(url = '', userid, useremail, userpassword, username, userschoolname, usergender, usermajor) {
    await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': "application/json"
      }, 
      body: JSON.stringify({ "userid": userid, "email": useremail, "password": userpassword, "username": username,  "schoolname": userschoolname, "gender": usergender, "major": usermajor})
    });
}

async function updateUserInfoNoPWDChange(url = '', userid, useremail, username, userschoolname, usergender, usermajor) {
    await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': "application/json"
      }, 
      body: JSON.stringify({ "userid": userid, "email": useremail, "username": username,  "schoolname": userschoolname, "gender": usergender, "major": usermajor})
    });
}

document.getElementById('submit').addEventListener('click',()=>{
    if (userpassword === ""){
        updateUserInfoNoPWDChange('/updateuserinfonopwdchange', userid, useremail, username, userschoolname, usergender, usermajor);
    }else{
        updateUserInfo('/updateuserinfo', userid, useremail, userpassword, username, userschoolname, usergender, usermajor);
    }
    alert("You have successfully changed your user profile!");
    location.reload();
});