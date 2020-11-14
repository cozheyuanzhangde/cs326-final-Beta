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
document.getElementById('courseprofessor').addEventListener('change',()=>{
  courseinstructor = document.getElementById('courseprofessor').value;
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

async function postAddNewCourse(url = '', courseschoolname, coursesubject, coursenumber, courseinstructor, coursedifficulty, coursetime, courseoverall) {
    await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': "text/json"
      }, 
      body: JSON.stringify({ "schoolname": courseschoolname, "coursesubject": coursesubject, "coursenumber": coursenumber, "instructor": courseinstructor, "difficulty": coursedifficulty, "time": coursetime, "overall": courseoverall})
    });
}

async function postAddNewComment(url = '', courseid, username, coursecomment, coursedifficulty, coursetime, courseoverall) {
  await fetch(url, {
    method: 'POST',  
    headers: {
      'Content-Type': "text/json"
    }, 
    body: JSON.stringify({ "courseid": courseid, "username": username, "textcomment": coursecomment, "difficulty": coursedifficulty, "time": coursetime, "overall": courseoverall})
  });
}

document.getElementById('submit').addEventListener('click',()=>{
    postAddNewCourse('/addnewcourse', courseschoolname, coursesubject, coursenumber, courseinstructor, coursedifficulty, coursetime, courseoverall, coursecomment);
    
    postAddNewComment('/addnewcomment', courseid, username, coursecomment, coursedifficulty, coursetime, courseoverall);
    alert("Well Done! You successfully add a new course with a comment!");
    window.location.href = "./index.html";
});