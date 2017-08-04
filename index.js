disableScroll();
var objectsInitialised = false
$(this).scrollTop(0);

var objectArray = new Array();

fillObjectArray();

var tempX = 0;
var tempY = 0;

function fillObjectArray() {
    addElement("roadLines", 0.5)
    addElement("sky", 0.05)
    addElement("programmingLanguageBanner", 0.5)

    addElement("streetLight-0", 0.5)
    addElement("fireHydrant-0", 0.5)
    for (i = 1; i < 50; i++) {

        var newFireHydrant = $('#fireHydrant-' + (i - 1)).clone();
        newFireHydrant.attr('id', "fireHydrant-" + i)
        newFireHydrant.appendTo(document.body)
        newFireHydrant.css('left', (newFireHydrant.get(0).getBoundingClientRect().left += Math.random() * 5000 + 1000) + "px");
        addElement("fireHydrant-" + i, 0.5)

        var newFireHydrant = $('#streetLight-' + (i - 1)).clone();
        newFireHydrant.attr('id', "streetLight-" + i)
        newFireHydrant.appendTo(document.body)
        newFireHydrant.css('left', (newFireHydrant.get(0).getBoundingClientRect().left += Math.random() * 2000 + 600) + "px");
        addElement("streetLight-" + i, 0.5)
    }

} 

function addElement(id, factor) {
    var divToAdd = document.getElementById(id);
    var xPosition = divToAdd.getBoundingClientRect().left;
    var arrayToAdd = new Array();
    arrayToAdd.push(divToAdd, xPosition, factor);
    objectArray.push(arrayToAdd);
}

function moveDivs(tempX) {
    for (var i = 0; i < objectArray.length; i++) {
        var yourDivPositionX = objectArray[i][1] - objectArray[i][2] * tempX;
        objectArray[i][0].style.left = yourDivPositionX + "px";
    }

    document.getElementById("leftWheel").style.transform = "rotate(" + tempX / 2 + "deg)";
    document.getElementById("rightWheel").style.transform = "rotate(" + tempX / 2 + "deg)";

    if (Math.random() < 0.04) {
        document.getElementById("leftWheel").style.bottom = Math.random() * 5 + "px";
        setTimeout(function () {
            document.getElementById("leftWheel").style.bottom = "0px";
        }, 100);
    }
    if (Math.random() < 0.04) {
        document.getElementById("rightWheel").style.bottom = Math.random() * 5 + "px";
        setTimeout(function () {
            document.getElementById("rightWheel").style.bottom = "0px";
        }, 100);
    }
}

$(window).scroll(function (event) {
    //First time it is called is just to initialise everything, don't move car
    if (objectsInitialised) {
        document.getElementById("instructions").style.visibility = 'hidden';
        setTimeout(function () {
            document.getElementById("resumeTitle").style.top = '0px';
        }, 500);
        document.getElementById("carSmoke").style.opacity = '1';
        setTimeout(function () {
            document.getElementById("carSmoke").style.opacity = "0";
        }, 500);
    }
    else {
        objectsInitialised = true;
        resizeEventHandler();
    }

    moveDivs($(window).scrollTop());
});

window.onresize = resizeEventHandler;

function resizeEventHandler() {
    //adapt css on window resize for divs that can't be handled with simple css usage

    var pos = $("#car").position();

    var width = $("#car").outerWidth();

    $("#carSmoke").css({
        position: "fixed",
        bottom: (pos.bottom + 25) + "px",
        left: (pos.left - 25) + "px"
    }).show();
}

document.getElementById('resumeTitleText').onclick = function () {    
    $('.loader').fadeOut();
    enableScroll();
}

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}