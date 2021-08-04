//declaring Variables
let form=document.getElementById('myForm');
//eventListeners
    form.addEventListener('submit',saveSites);

/******** Functions **********/
//saveSites function
function saveSites(e){
    let siteName=document.getElementById('siteName').value;
    let siteUrl=document.getElementById('siteUrl').value;
    //validations
    if(!validationForm(siteName,siteUrl)){
        return false;
    }  
    //storing in object
    let bookMark={
        name:siteName,
        url:siteUrl    
    }
    //checking if bookmarks is null
    if(localStorage.getItem('bookMarks') === null){
        //Initialize array
        var bookMarks =[];
        //push values
        bookMarks.push(bookMark);
        //setting values
        localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
    }else{
        //get all values;
        var bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
        //add array
            bookMarks.push(bookMark);
        //setting values
        localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
    }
    //fetching BookMarks
        fetchBookmarks();
    //clear form
    form.reset();
    //preventing from default
    e.preventDefault();    
}
//Delete function 
function deleteBookMarks(url){
    //get bookMarks from local storage
    var bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
        for(let i=0;i<bookMarks.length;i++){
            if(bookMarks[i].url == url){
                bookMarks.splice(i,1);
            }   
        }
        //reseting local storage
        localStorage.setItem('bookMarks',JSON.stringify(bookMarks));
        //fetching bookmarks
    fetchBookmarks();
}
//fetchBookmarks function
function fetchBookmarks(){
    var bookMarks = JSON.parse(localStorage.getItem('bookMarks'));
    var bookMarksResult=document.getElementById('bookmarksResult');
    bookMarksResult.innerHTML=" ";
    for(let i=0;i<bookMarks.length;i++){
        var names=bookMarks[i].name;
        var urls=bookMarks[i].url;
        bookMarksResult.innerHTML+='<div class="cards">'+
        '<h3>'+names+
        '<a class="visit" target="_blank" href="'+urls+'">Visit</a>'+
        '<a onClick="deleteBookMarks(\''+urls+'\')" class="delete" href="#">Delete</a>'+
        '</h3></div>';
    }
}
//validationForm function
function validationForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Please enter Name and URL');
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert('Please enter a valid URL');
        return false;
    }
    return true;
}