firebase.auth().onAuthStateChanged((user) =>  {
    if(user) {
        var email = user.email;
        var i=0;
        var storageRef = firebase.storage().ref();

        storageRef.child('images/'+email+'/').listAll().then(function(result) {
            result.items.forEach(function(imageRef) {
                displayImage(imageRef);
                i++;
            });
        });
    }
    else {
        window.location.href = "../index.html"
    }
});

var i=1;
var sabit = 5;
function displayImage(images) {
    let screenSize = $(window).width();

    if(screenSize <= 576) { sabit = 3; $(".3").removeClass("column"); $(".4").removeClass("column"); }
    else if(screenSize <= 768) { sabit = 4; $(".4").removeClass("column"); }
        
    images.getDownloadURL().then(function(url) {
        let new_HTML = '';
        new_HTML += '<img src="'+url+'">';
        $('.'+i).append(new_HTML);
        i++;
        if(i >= sabit)
            i = 1;
    });
}

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("user signout");
    })
})