$(function(){
    $("#searchbtn").on("click",function(){
    urlJump();
    });
});

function urlJump(){
    schoolName = document.getElementById("schoolName").value;
    courseSubject = document.getElementById("courseSubject").value;
    courseNumber = document.getElementById("courseNumber").value;
    url = "searchresult.html?schoolname="+schoolName+"&coursesubject="+courseSubject+"&coursenumber="+courseNumber;
    window.location.href = url;
}
