let courseschoolname = '';
document.getElementById('courseschoolname').addEventListener('change',()=>{
  courseschoolname = document.getElementById('courseschoolname').value;
});

let coursesubject = '';
document.getElementById('coursesubject').addEventListener('change',()=>{
  coursesubject = document.getElementById('coursesubject').value;
});

let coursenumber = '';
document.getElementById('coursenumber').addEventListener('change',()=>{
  coursenumber = document.getElementById('coursenumber').value;
});

let courseinstructor = '';
document.getElementById('courseinstructor').addEventListener('change',()=>{
  courseinstructor = document.getElementById('courseinstructor').value;
});

let coursedifficulty = '';
document.getElementById('coursedifficulty').addEventListener('change',()=>{
  coursedifficulty = document.getElementById('coursedifficulty').value;
});

let coursetime = '';
document.getElementById('coursetime').addEventListener('change',()=>{
  coursetime = document.getElementById('coursetime').value;
});

let courseoverall = '';
document.getElementById('courseoverall').addEventListener('change',()=>{
  courseoverall = document.getElementById('courseoverall').value;
});

let coursecomment = '';
document.getElementById('coursecomment').addEventListener('change',()=>{
  coursecomment = document.getElementById('coursecomment').value;
});


async function postAddNewCourse(url = '', courseschoolname, coursesubject, coursenumber, courseinstructor, coursedifficulty, coursetime, courseoverall, username, textcomment) {
  await fetch(url, {
    method: 'POST',  
    headers: {
      'Content-Type': "application/json"
    }, 
    body: JSON.stringify({ "schoolname": courseschoolname, "coursesubject": coursesubject, "coursenumber": coursenumber, "instructor": courseinstructor, "difficulty": coursedifficulty, "time": coursetime, "overall": courseoverall, "username": username, "textcomment": textcomment})
  });
}
window.addEventListener("load", async function (){
  let thissession;
  let sessionEmail;
  try{
      const res_session = await fetch(`/getsession`,{
      method: "GET"
      });
      if (!res_session.ok) {
      console.log(res_session.error);
      return;
      }else{
      thissession = await res_session.json();
      sessionEmail = thissession.passport.user;
      console.log(sessionEmail);
      }
      const res_user = await fetch(`/loaduserinfobyemail?email=${sessionEmail}`,{
          method: "GET"
      });
      if (!res_user.ok) {
          console.log(res_user.error);
          return;
      }
      const user = await res_user.json();
      console.log(user);
      const username = user[0].username;
      document.getElementById('submit').addEventListener('click', async () => {
        if((courseschoolname.length>0)&&(coursesubject.length>0)&&(coursenumber.length>0)&&(courseinstructor.length>0)&&(coursedifficulty.length>0)&&(courseoverall.length>0)&&(coursecomment.length>0)){
          postAddNewCourse('/addnewcourse', courseschoolname, coursesubject, coursenumber, courseinstructor, coursedifficulty, coursetime, courseoverall, username, coursecomment);
          alert("Well Done! You successfully add a new course with a comment!");
          window.location.href = "./index.html";
        }else{
          alert("Sorry, you need to enter all fields to add a new course!");
        }
      });
  }catch(error){
      alert("Please Login first and then add a new course! If you don't have an account, register one!");
      window.location.href="./login.html";
  }
});
