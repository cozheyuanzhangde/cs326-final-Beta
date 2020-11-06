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

let courseprofessor = '';
document.getElementById('courseprofessor').addEventListener('change',()=>{
  courseprofessor = document.getElementById('courseprofessor').value;
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

async function postAddNewCourse(url = '', courseschoolname, coursesubject, coursenumber, courseprofessor, coursedifficulty, coursetime, courseoverall, coursecomment) {
    await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': "text/json"
      }, 
      body: JSON.stringify({ "courseschoolname": courseschoolname, "coursesubject": coursesubject, "coursenumber": coursenumber, "courseprofessor": courseprofessor, "coursedifficulty": coursedifficulty, "coursetime": coursetime, "courseoverall": courseoverall, "coursecomment": coursecomment })
    });
}

document.getElementById('submit').addEventListener('click',()=>{
    postAddNewCourse('/addnewcourse', courseschoolname, coursesubject, coursenumber, courseprofessor, coursedifficulty, coursetime, courseoverall, coursecomment);
    alert("Well Done! You successfully add a new course with a comment!");
    window.location.href = "./index.html";
});