const schoolName = getURLParam("schoolname");
const courseSubject = getURLParam("coursesubject");
const courseNumber = getURLParam("coursenumber");
console.log(schoolName);
console.log(courseSubject);
console.log(courseNumber);


let comment = '';
document.getElementById('newcomment').addEventListener('change',()=>{
    comment = document.getElementById('newcomment').value;
});

let coursedifficulty = '';
document.getElementById('easyLevel').addEventListener('change',()=>{
    coursedifficulty = document.getElementById('easyLevel').value;
});

let coursetimeconsumption = '';
document.getElementById('timeLevel').addEventListener('change',()=>{
    coursetimeconsumption = document.getElementById('timeLevel').value;
});

let courseoverall = '';
document.getElementById('overall').addEventListener('change',()=>{
    courseoverall = document.getElementById('overall').value;
});

async function postCourseDetail(url = '',courseschoolname,coursesubject,coursenumber,courseprofessor,studentname,comment,coursedifficulty,coursetimeconsumption,courseoverall) {
    await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': "text/json"
      }, 
      body: JSON.stringify({ 'courseschoolname' : courseschoolname, 'coursesubject':coursesubject,'coursenumber':coursenumber,'courseprofessor': courseprofessor,'studentname' : studentname, 'comment': comment, 'coursedifficulty': coursedifficulty, 'coursetimeconsumption': coursetimeconsumption, 'courseoverall': courseoverall })
    });
}

// window.addEventListener('load',createCourse);
// window.addEventListener('load',createComments);
// window.addEventListener('load',()=>{
document.getElementById('cd-submit').addEventListener('click',()=>{
    postCourseDetail('/coursedetail','umass','cs','326', 'emery', 'Jenny', comment,coursedifficulty,coursetimeconsumption,courseoverall);
})
// });

function starRating(n,element){
    const div = document.createElement('div');
    let count = 0;
    for(let i = 0; i < 5; i++){
        const node = document.createElement('span');
        if(count < n){
            // node.classList.add('fa fa-star full');
            node.setAttribute('class','fa fa-star full');
            count ++;
        }
        else{
            node.setAttribute('class','fa fa-star');
        }
        div.appendChild(node);
    }
    element.appendChild(div);
}

function createDiv(courseName, professor, difficulty, time, overall){
    // for(let i = 0; i < num; i++){
    const bigDiv = document.createElement('div');
    bigDiv.classList.add('row');
    const node1 = document.createElement('div');
    node1.classList.add('col-sm');
    node1.setAttribute('id','cd-courseName');
    node1.innerHTML = courseName;
    const node2 = document.createElement('div');
    node2.classList.add('col-sm');
    node2.setAttribute('id','cd-professor');
    node2.innerHTML = professor;
    const node3 = document.createElement('div');
    node3.classList.add('col-sm');
    node3.setAttribute('id','cd-difficulty');
    starRating(difficulty,node3);
    const node4 = document.createElement('div');
    node4.classList.add('col-sm');
    node4.setAttribute('id','cd-timeConsumption');
    starRating(time,node4);
    const node5 = document.createElement('div');
    node5.classList.add('col-sm');
    node5.setAttribute('id','cd-overall');
    starRating(overall,node5);
    bigDiv.appendChild(node1);
    bigDiv.appendChild(node2);
    bigDiv.appendChild(node3);
    bigDiv.appendChild(node4);
    bigDiv.appendChild(node5);
    return bigDiv;

}


function createCourse(){
    const theDiv = document.getElementById('courseInfo');
    theDiv.appendChild(createDiv('cs 326','emery', 3, 3, 4));
}


window.addEventListener("load", async function () {
    const res_courses = await fetch("/loadcoursesdetail",{
        method: "GET"
    });
    if (!res_courses.ok) {
        console.log(res_courses.error);
        return;
    }
    let courses = await res_courses.json();

    if(courses === undefined){
        courses = [];
    }

    const theDiv = document.getElementById('comments');
    
    courses.forEach(function (obj) {
        if((obj.courseschoolname.toLowerCase() === schoolName.toLowerCase())&&(obj.coursesubject.toLowerCase() === courseSubject.toLowerCase())&&(obj.coursenumber.toLowerCase() === courseNumber.toLowerCase())){
            const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.courseschoolname + ")";
            theDiv.appendChild(createDiv(coursename, obj.courseprofessor, obj.coursedifficulty, obj.coursetime, obj.courseoverall));
            const node = document.createElement('br');
            theDiv.appendChild(node);
        }  
    });
});


// function createComments(){
//     const theDiv = document.getElementById('comments');
//     for(let i = 0; i < 5; i++){
//         theDiv.appendChild(createDiv('Jenny',"This is a great course, recommend to take it!", 3, 3, 4));
//     }
// }

function getURLParam(paramName) {
    const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) {return unescape(r[2]);} return null;
}

// window.addEventListener("load", async function () {
//     const res_courses = await fetch('/coursedetail',{
//         method: "GET"
//     });
//     if (!res_courses.ok) {
//         console.log(res_courses.error);
//         return;
//     }
//     let courses = await res_courses.json();

    // if(courses === undefined){
    //     courses = [];
    // }

    // const theDiv = document.getElementById('searchDetail');
    
    // courses.forEach(function (obj) {
    //     if((obj.courseschoolname.toLowerCase() === schoolName.toLowerCase())&&(obj.coursesubject.toLowerCase() === courseSubject.toLowerCase())&&(obj.coursenumber.toLowerCase() === courseNumber.toLowerCase())){
    //         const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.courseschoolname + ")";
    //         theDiv.appendChild(createDiv(coursename, obj.courseprofessor, obj.coursedifficulty, obj.coursetime, obj.courseoverall));
    //         const node = document.createElement('br');
    //         theDiv.appendChild(node);
    //     }  
    // });
// });
window.addEventListener('load',createCourse);
// window.addEventListener('load',createComments);