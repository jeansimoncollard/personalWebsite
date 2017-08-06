var m_w = 7239174321;
var m_z = 987654321;
var mask = 0xffffffff;

function seed(i) {
    m_w = i;
    m_z = 987654321;
}

function random() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + m_w) & mask;
    result /= 4294967296;
    return result + 0.5;
}

seed(119142112);

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

    addElement("fireHydrant-0", 0.5)

    addElement("streetLight-0", 0.5)
    addElement("versatileSoftwareEngineerBanner", 0.5)
    addElement("codeSign", 0.5)
    addElement("databasesSign", 0.5)
    addElement("requirementsAnalysisSign", 0.5)
    addElement("testAutomationSign", 0.5)
    addElement("ironBar-1", 0.5)
    addElement("ironBar-2", 0.5)
    addElement("ironBar-3", 0.5)
    addElement("ironBar-4", 0.5)

    for (i = 1; i < 50; i++) {

        var newFireHydrant = $('#fireHydrant-' + (i - 1)).clone();
        newFireHydrant.attr('id', "fireHydrant-" + i)
        newFireHydrant.appendTo(document.body)
        newFireHydrant.css('left', (newFireHydrant.get(0).getBoundingClientRect().left += Math.random() * 5000 + 1000) + "px");
        addElement("fireHydrant-" + i, 0.5)        

        var newStreeLight = $('#streetLight-' + (i - 1)).clone();
        newStreeLight.attr('id', "streetLight-" + i)
        newStreeLight.appendTo(document.body)
        newStreeLight.css('left', (newStreeLight.get(0).getBoundingClientRect().left += random() * 2000 + 600) + "px");
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

    if(tempX>2550)
    {
        document.getElementById("databasesSign").style.bottom = "75px";
        if (tempX > 2860) {
            document.getElementById("codeSign").style.bottom = "75px";
            if (tempX > 3170) {
                document.getElementById("requirementsAnalysisSign").style.bottom = "0px";
                if (tempX > 3420) {
                    document.getElementById("testAutomationSign").style.bottom = "0px";
                }
            }
        }
    }
}

$(window).scroll(function (event) {
    //First time it is called is just to initialise everything, don't move car
    if (objectsInitialised) {
        document.getElementById("instructions").style.visibility = 'hidden';
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

