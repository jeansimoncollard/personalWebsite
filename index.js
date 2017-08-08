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

seed(6);

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

    addElement("fireHydrant-0", 0.5)
    addElement("streetLight-0", 0.5)
    addElement("circulationLight-0", 0.5)

    addElement("versatileSoftwareEngineerBanner", 0.5)
    addElement("codeSign", 0.5)
    addElement("databasesSign", 0.5)
    addElement("requirementsAnalysisSign", 0.5)
    addElement("testAutomationSign", 0.5)
    addElement("ironBar-1", 0.5)
    addElement("ironBar-2", 0.5)
    addElement("ironBar-3", 0.5)
    addElement("ironBar-4", 0.5)
    addElement("expert", 0.5)
    addElement("advanced", 0.5)
    addElement("intermediate", 0.5)
    addElement("beginner", 0.5)
    addElement("tallguy", 0.5)
    addElement("tallText", 0.5)
    addElement("openSwimText", 0.5)
    addElement("openSwimSign", 0.5)
    addElement("kayakerText", 0.5)
    addElement("kayakerSign", 0.5)

    addElement("programmingLanguageBanner", 0.5)
    addElement("ironBar-5", 0.5)
    addElement("ironBar-6", 0.5)
    addElement("ironBar-7", 0.5)
    addElement("ironBar-8", 0.5)
    addElement("expert-2", 0.5)
    addElement("advanced-2", 0.5)
    addElement("intermediate-2", 0.5)
    addElement("beginner-2", 0.5)
    addElement("CSharpSign", 0.5)
    addElement("SQLSign", 0.5)
    addElement("vbnetSign", 0.5)
    addElement("javaSign", 0.5)
    addElement("javascriptsign", 0.5)
    addElement("ccplusplusSign", 0.5)

    for (i = 1; i < 50; i++) {

        var newFireHydrant = $('#fireHydrant-' + (i - 1)).clone();
        newFireHydrant.attr('id', "fireHydrant-" + i)
        newFireHydrant.appendTo(document.body)
        newFireHydrant.css('left', (newFireHydrant.get(0).getBoundingClientRect().left += Math.random() * 5000 + 1000) + "px");
        addElement("fireHydrant-" + i, 0.5)        

        var newstreetLight = $('#streetLight-' + (i - 1)).clone();
        newstreetLight.attr('id', "streetLight-" + i)
        newstreetLight.appendTo(document.body)
        newstreetLight.css('left', (newstreetLight.get(0).getBoundingClientRect().left += random() * 2000 + 600) + "px");
        addElement("streetLight-" + i, 0.5)


        var newcirculationLight = $('#circulationLight-' + (i - 1)).clone();
        newcirculationLight.attr('id', "circulationLight-" + i)
        newcirculationLight.appendTo(document.body)
        newcirculationLight.css('left', (newcirculationLight.get(0).getBoundingClientRect().left += random() * 4000 + 5000) + "px");
        addElement("circulationLight-" + i, 0.5)
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

    if(tempX>2500)
    {
        document.getElementById("databasesSign").style.bottom = "57px";
        if (tempX > 2810) {
            document.getElementById("codeSign").style.bottom = "57px";
            if (tempX > 3120) {
                document.getElementById("requirementsAnalysisSign").style.bottom = "0px";
                if (tempX > 3380) {
                    document.getElementById("testAutomationSign").style.bottom = "0px";
                }
            }
        }
    }

    if (tempX > 12950) {
        document.getElementById("CSharpSign").style.bottom = "57px";
        if (tempX > 13260) {
            document.getElementById("SQLSign").style.bottom = "57px";
            if (tempX > 13570) {
                document.getElementById("vbnetSign").style.bottom = "57px";
                if (tempX > 13880) {
                    document.getElementById("javaSign").style.bottom = "0px";
                    if (tempX > 14190) {
                        document.getElementById("javascriptsign").style.bottom = "0px";
                        if (tempX > 14500) {
                            document.getElementById("ccplusplusSign").style.bottom = "0px";
                        }
                    }
                }
            }
        }
    }
    if (tempX > 6900) {
        document.getElementById("openSwimSign").style.bottom = "-275px";

    }
    if (tempX > 8100) {
        document.getElementById("tallguy").style.bottom = "64px";

    }
    if (tempX > 8900) {
        document.getElementById("kayakerSign").style.bottom = "-275px";

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
