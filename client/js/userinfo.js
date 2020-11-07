//Below: For loading user default info
/*window.addEventListener("load", async function () {
    const res_comments = await fetch("/loadcoursesdetail",{
        method: "GET"
    });
    if (!res_comments.ok) {
        console.log(res_comments.error);
        return;
    }
    let comments = await res_comments.json();

    if(comments === undefined){
        comments = [];
    }
    console.log(comments);
    const theDiv = document.getElementById('comments');
    
    comments.forEach(function (obj) {
        if((obj.detailschoolname.toLowerCase()===this_courseSchoolName.toLowerCase())&&(obj.detailsubject.toLowerCase()===this_courseSubject.toLowerCase())&&(obj.detailnumber.toLowerCase()===this_courseNumber.toLowerCase())&&(obj.detailprofessor.toLowerCase()===this_courseProfessor.toLowerCase())){
            theDiv.appendChild(createDiv(obj.detailusername,obj.detailcomment, obj.detaildifficulty, obj.detailtime, obj.detailoverall));
        }
    });
});*/