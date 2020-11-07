function getURLParam(paramName) {
    const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) {return unescape(r[2]);} return null;
}

const schoolName = getURLParam("schoolname");
const courseSubject = getURLParam("coursesubject");
const courseNumber = getURLParam("coursenumber");

function starRating(n,element){
    const div = document.createElement('div');
    let count = 0;
    for(let i = 0; i < 5; i++){
        const node = document.createElement('span');
        if(count < n){
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


function coursedetailURLJump(para_courseSubject, para_courseNumber, para_courseSchoolName, para_courseName, para_professor, para_difficulty, para_time, para_overall){
    const courseSubject = para_courseSubject;
    const courseNumber = para_courseNumber;
    const courseSchoolName = para_courseSchoolName;
    const courseName = para_courseName;
    const professor = para_professor;
    const difficulty = para_difficulty;
    const time = para_time;
    const overall = para_overall;
    const url = "coursedetail.html?schoolname="+courseSchoolName+"&coursesubject="+courseSubject+"&coursenumber="+courseNumber+"&coursename="+courseName+"&professor="+professor+"&difficulty="+difficulty+"&time="+time+"&overall="+overall;
    window.location.href = url;
}

function createDiv(courseSubject, courseNumber, courseSchoolName, courseName, professor, difficulty, time, overall){
    const bigDiv = document.createElement('div');
    bigDiv.classList.add('row');
    const node1 = document.createElement('div');
    node1.innerHTML = courseName;
    const a = document.createElement('a');
    a.addEventListener("click", () => coursedetailURLJump(courseSubject, courseNumber, courseSchoolName, courseName, professor, difficulty, time, overall));
    a.setAttribute('style','cursor:pointer');
    a.appendChild(node1);
    a.classList.add('col-sm');
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
    bigDiv.appendChild(a);
    bigDiv.appendChild(node2);
    bigDiv.appendChild(node3);
    bigDiv.appendChild(node4);
    bigDiv.appendChild(node5);
    return bigDiv;
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
            theDiv.appendChild(createDiv(obj.coursesubject, obj.coursenumber, obj.courseschoolname, coursename, obj.courseprofessor, obj.coursedifficulty, obj.coursetime, obj.courseoverall));
            const node = document.createElement('br');
            theDiv.appendChild(node);
        }  
    });
});