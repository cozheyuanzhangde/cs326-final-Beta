

let coursename = document.getElementById('coursename').value;
let courseprofessor = document.getElementById('professor').value;
let subject = document.getElementById('majorCourse').value;
let coursedifficulty = document.getElementById('easyLevel').value;
let coursetimeconsumption = document.getElementById('timeLevel').value;
let courseoverall = document.getElementById('overall').value;

async function postCreateCourse(url = '',courseName,courseProfessor,subject, courseDifficulty, courseTimeConsumption, courseOverall, comment) {
    await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': "text/json"
      }, 
      body: JSON.stringify({ courseName : courseName, courseProfessor: courseProfessor,subject : subject, courseDifficulty: courseDifficulty, courseTimeConsumption: courseTimeConsumption, courseOverall: courseOverall, comment: comment })
    });
}

document.getElementById('submit').addEventListener('click',()=>{
    postCreateCourse('/createNewCourse', coursename, courseprofessor, subject, coursedifficulty, coursetimeconsumption, courseoverall);
});