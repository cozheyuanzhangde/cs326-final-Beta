const schoolName = getURLParam("schoolname");
const courseSubject = getURLParam("coursesubject");
const courseNumber = getURLParam("coursenumber");
console.log(schoolName);
console.log(courseSubject);
console.log(courseNumber);

window.addEventListener('load',createCourse);
window.addEventListener('load',createComments);

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
    node1.innerHTML = courseName;
    const node2 = document.createElement('div');
    node2.classList.add('col-sm');
    node2.innerHTML = professor;
    const node3 = document.createElement('div');
    node3.classList.add('col-sm');
    starRating(difficulty,node3);
    const node4 = document.createElement('div');
    node4.classList.add('col-sm');
    starRating(time,node4);
    const node5 = document.createElement('div');
    node5.classList.add('col-sm');
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

function createComments(){
    const theDiv = document.getElementById('comments');
    for(let i = 0; i < 5; i++){
        theDiv.appendChild(createDiv('Jenny',"This is a great course, recommend to take it!", 3, 3, 4));
    }
}

function getURLParam(paramName) {
    const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) {return unescape(r[2]);} return null;
}

window.addEventListener("load", async function () {
    const res_courses = await fetch("/loadcourses",{
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

    const theDiv = document.getElementById('searchDetail');
    
    courses.forEach(function (obj) {
        if((obj.courseschoolname.toLowerCase() === schoolName.toLowerCase())&&(obj.coursesubject.toLowerCase() === courseSubject.toLowerCase())&&(obj.coursenumber.toLowerCase() === courseNumber.toLowerCase())){
            const coursename = obj.coursesubject + " " + obj.coursenumber + " (" + obj.courseschoolname + ")";
            theDiv.appendChild(createDiv(coursename, obj.courseprofessor, obj.coursedifficulty, obj.coursetime, obj.courseoverall));
            const node = document.createElement('br');
            theDiv.appendChild(node);
        }  
    });
});
