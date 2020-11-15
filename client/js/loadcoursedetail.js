function getURLParam(paramName) {
    const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) {return unescape(r[2]);} return null;
}

const this_courseId = getURLParam("courseid");
const this_courseSchoolName = getURLParam("schoolname");
const this_courseSubject = getURLParam("coursesubject");
const this_courseNumber = getURLParam("coursenumber");
const this_courseName = getURLParam("coursename");
const this_courseInstructor = getURLParam("instructor");
const this_courseDifficulty = getURLParam("difficulty");
const this_courseTime = getURLParam("time");
const this_courseOverall = getURLParam("overall");


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

function createDiv(courseName, instructor, difficulty, time, overall){
    const bigDiv = document.createElement('div');
    bigDiv.classList.add('row');
    const node1 = document.createElement('div');
    node1.classList.add('col-sm');
    node1.setAttribute('id','cd-courseName');
    node1.innerHTML = courseName;
    const node2 = document.createElement('div');
    node2.classList.add('col-sm');
    node2.setAttribute('id','cd-instructor');
    node2.innerHTML = instructor;
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



//"Create course label, not create course itself!"
async function createCourse(){
    const res_course = await fetch(`/loadCoursesBySchoolSubjectNumber?courseid=${this_courseId}`,{
        method: "GET"
    });
    if (!res_course.ok) {
        console.log(res_course.error);
        return;
    }
    let thiscourse = await res_course.json();

    console.log(thiscourse);

    if(thiscourse === undefined){
        thiscourse = {};
    }

    const theDiv = document.getElementById('courseInfo');
    const coursename = thiscourse.coursesubject + " " + thiscourse.coursenumber + " (" + thiscourse.schoolname + ")";
    theDiv.appendChild(createDiv(coursename, thiscourse.instructor, thiscourse.difficulty, thiscourse.time, thiscourse.overall));
}

window.addEventListener('load', async () =>createCourse());

window.addEventListener("load", async function () {
    const res_comments = await fetch(`/loadcoursecommentsbycourseid?courseid=${this_courseId}`,{
        method: "GET"
    });
    if (!res_comments.ok) {
        console.log(res_comments.error);
        return;
    }
    let comments = await res_comments.json();
    console.log(comments);

    if(comments === undefined){
        comments = [];
    }
    const theDiv = document.getElementById('comments');
    
    comments.forEach(function (obj) {
        theDiv.appendChild(createDiv(obj.username,obj.textcomment, obj.difficulty, obj.time, obj.overall));
    });
});

let post_comment = '';
document.getElementById('postnewcomment').addEventListener('change',()=>{
    post_comment = document.getElementById('postnewcomment').value;
});

let post_coursedifficulty = '';
document.getElementById('postdifficulty').addEventListener('change',()=>{
    post_coursedifficulty = document.getElementById('postdifficulty').value;
});
if (post_coursedifficulty === ''){
    post_coursedifficulty = '1';
}

let post_coursetime = '';
document.getElementById('posttime').addEventListener('change',()=>{
    post_coursetime = document.getElementById('posttime').value;
});
if (post_coursetime === ''){
    post_coursetime = '1';
}

let post_courseoverall = '';
document.getElementById('postoverall').addEventListener('change',()=>{
    post_courseoverall = document.getElementById('postoverall').value;
});
if (post_courseoverall === ''){
    post_courseoverall = '1';
}

async function postNewComment(url = '', courseid, username, textcomment, difficulty, time, overall) {
    await fetch(url, {
      method: 'POST',  
      headers: {
        'Content-Type': "application/json"
      }, 
      body: JSON.stringify({ "courseid": courseid, "username": username, "textcomment": textcomment, "difficulty": difficulty, "time": time, "overall": overall})
    });
}

async function updateCourseInfo(url = '', courseid){
    await fetch(url, {
        method: 'POST',  
        headers: {
          'Content-Type': "application/json"
        }, 
        body: JSON.stringify({ "courseid": courseid})
    });
}

document.getElementById('cd-submit').addEventListener('click', () => {
    postNewComment('/addnewcomment', this_courseId, 'Anonymous', post_comment, post_coursedifficulty, post_coursetime, post_courseoverall);
    updateCourseInfo('/updatecourseinfo', this_courseId);
    alert("You successfully add a new comment!");
    location.reload();
});