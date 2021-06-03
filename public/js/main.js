let selectLabel = [];
let selectLabelName = 'hepsi';

var i=0;
var i2 = 0;
var allLabel = [];
var allLabelString;
var boolLabelButton = true;

firebase.auth().onAuthStateChanged((user) =>  {
    if(user) {
        var email = user.email;
        var storageRef = firebase.storage().ref();
        
        storageRef.child('images/'+email+'/').listAll().then(function(result) {
            result.items.forEach(function(imageRef) {
                imageRef.getMetadata()
                .then((metadata) => {
                    do {
                        allLabelString = metadata.customMetadata.label;
                        allLabel[i2] = allLabelString;
                    }
                    while(allLabelString == null);

                    selectLabel = [...new Set(allLabel)];
                    i2=i2+1;
                    displayImage(imageRef, allLabelString);
                }).catch((error) => {
                    
                });
                i++;
            });
        });
    }
    else {
        window.location.href = "../index.html"
    }
});


$('#hicbiri').click(function() {
    $('.label').remove();
    boolLabelButton = true;
});

$('#hepsi').click(function() {
    if(boolLabelButton == true) {
        selectLabel.forEach(element => {
            let new_HTML ='';
            new_HTML += '<button type="button" id="'+element+'" class="btn btn-info label '+element+'">'+element+'</button>';
            $('.metadata').append(new_HTML);
        });
    }    
    boolLabelButton = false;
    selectLabelName = 'hepsi';
    labelClick(selectLabelName);
});


$('button').click(function() {
    
});

$(document).on('click', '.label', function(event) {
    selectLabelName = event.target.id;
    labelClick(selectLabelName);
});

function labelClick(selectLabelName) {
    $('img').each(function(i,e) {
        if(selectLabelName != 'hepsi') {
            if(e.id != '' && e.id != selectLabelName) {
                $(this).css({'display':'none'});
            }
            else {
                $(this).css({'display':'block'});
            }
        }
        else {
            $(this).css({'display':'block'});
        }
    });
}

var sayac = 0;
var i=1;
var sabit = 5;
function displayImage(images, allLabelString) {
    let screenSize = $(window).width();
    if(screenSize <= 576) { sabit = 3; $(".3").removeClass("column"); $(".4").removeClass("column"); }
    else if(screenSize <= 768) { sabit = 4; $(".4").removeClass("column"); }


    images.getDownloadURL().then(function(url) {
        let new_HTML = '';
        new_HTML += '<img id="'+allLabelString+'" src="'+url+'">';
        $('.'+i).append(new_HTML);
        
        i++;
        if(i >= sabit) {
            i = 1;
        }
    });
}

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log("user signout");
    })
})