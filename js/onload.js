function starRating(n,element){
    let div = document.createElement('div');
    let count = 0;
    for(let i = 0; i < 5; i++){
        let node = document.createElement('span');
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


function createDiv(courseName, professor, easy, time, overall){
    // for(let i = 0; i < num; i++){
    let bigDiv = document.createElement('div');
    bigDiv.classList.add('row');
    let node1 = document.createElement('div');
    node1.classList.add('col-sm');
    node1.innerHTML = courseName;
    let a = document.createElement('a');
    a.setAttribute('href',"./courseDetail.html");
    a.appendChild(node1);
    // node1.setAttribute('href',"./courseDetail.html");
    let node2 = document.createElement('div');
    node2.classList.add('col-sm');
    node2.innerHTML = professor;
    let node3 = document.createElement('div');
    node3.classList.add('col-sm');
    starRating(easy,node3);
    let node4 = document.createElement('div');
    node4.classList.add('col-sm');
    starRating(time,node4);
    let node5 = document.createElement('div');
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
        let node = document.createElement('br');
        theDiv.appendChild(node);
    }
}

window.onload = doIt;