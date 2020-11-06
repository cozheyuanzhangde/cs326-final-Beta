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

function getURLParam(paramName) {
    const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {return unescape(r[2]);} return null;
}

function coursedetailURLJump(){
    const schoolName = getURLParam("schoolname");
    const courseSubject = getURLParam("coursesubject");
    const courseNumber = getURLParam("coursenumber");
    url = "coursedetail.html?schoolname="+schoolName+"&coursesubject="+courseSubject+"&coursenumber="+courseNumber;
    window.location.href = url;
}

function createDiv(courseName, professor, easy, time, overall){
    // for(let i = 0; i < num; i++){
    const bigDiv = document.createElement('div');
    bigDiv.classList.add('row');
    const node1 = document.createElement('div');
    // node1.classList.add('col-sm');
    node1.innerHTML = courseName;
    const a = document.createElement('a');
    a.addEventListener("click", coursedetailURLJump);
    a.setAttribute('style','cursor:pointer');
    a.appendChild(node1);
    a.classList.add('col-sm');
    // node1.setAttribute('href',"./coursedetail.html");
    const node2 = document.createElement('div');
    node2.classList.add('col-sm');
    node2.innerHTML = professor;
    const node3 = document.createElement('div');
    node3.classList.add('col-sm');
    starRating(easy,node3);
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
    // }
}

function doIt(){
    const theDiv = document.getElementById('searchDetail');
    for(let i = 0; i < 6; i++){
        theDiv.appendChild(createDiv('cs 326','emery', 3, 3, 4));
        const node = document.createElement('br');
        theDiv.appendChild(node);
    }
}

window.onload = doIt;

const schoolName = getURLParam("schoolname");
const courseSubject = getURLParam("coursesubject");
const courseNumber = getURLParam("coursenumber");
console.log(schoolName);
console.log(courseSubject);
console.log(courseNumber);