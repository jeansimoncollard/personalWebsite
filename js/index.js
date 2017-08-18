// Global variables
var m_w = 7239174321;
var m_z = 987654321;
var mask = 0xffffffff;
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
var tempX = 0; // unused?
var tempY = 0; // unused?
var objectArray = [];
var hammerGuyAnimationStarted = false
var lastTempX = 0

$(document).ready(function () {
    seed(6);

    disableScroll();
    var objectsInitialised = false;
    $(this).scrollTop(0);

    fillObjectArray();

    $(window).scroll(function (event) {
        //First time it is called is just to initialise everything, doesn't move car
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

    $('#resumeTitleText').click(function () {
        $('.loader').fadeOut();
        enableScroll();
    });
});

/**
 * Function description missing
 * @param {type} description of param {type} description of param i
 */
function seed(i) {
    m_w = i;
    m_z = 987654321;
}

/**
 * Function description missing
 * @returns {number}
 */
function random() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + m_w) & mask;
    result /= 4294967296;
    return result + 0.5;
}

/**
 * Function description missing
 */
function fillObjectArray(options) {
    var smallFactor = options && options.smallFactor ? options.smallfactor : 0.5;
    var bigFactor = options && options.bigFactor ? options.bigfactor : 1;

    var objects = [
        { id: "hammerGuy", factor: smallFactor },
        { id: "cobolSign", factor: smallFactor },
		{ id: "roadLines", factor: smallFactor },
		{ id: "sky", factor: smallFactor },
		{ id: "fireHydrant-0", factor: smallFactor },
		{ id: "streetLight-0", factor: smallFactor },
		{ id: "circulationLight-0", factor: smallFactor },
		{ id: "versatileSoftwareEngineerBanner", factor: smallFactor },
		{ id: "codeSign", factor: smallFactor },
		{ id: "databasesSign", factor: smallFactor },
		{ id: "requirementsAnalysisSign", factor: smallFactor },
		{ id: "testAutomationSign", factor: smallFactor },
		{ id: "cookingSign", factor: smallFactor },
		{ id: "ironBar-1", factor: smallFactor },
		{ id: "ironBar-2", factor: smallFactor },
		{ id: "ironBar-3", factor: smallFactor },
		{ id: "ironBar-4", factor: smallFactor },
		{ id: "expert", factor: smallFactor },
		{ id: "advanced", factor: smallFactor },
		{ id: "intermediate", factor: smallFactor },
		{ id: "beginner", factor: smallFactor },
		{ id: "tallguy", factor: smallFactor },
		{ id: "tallText", factor: smallFactor },
		{ id: "openSwimText", factor: smallFactor },
		{ id: "openSwimSign", factor: smallFactor },
		{ id: "kayakerText", factor: smallFactor },
		{ id: "kayakerSign", factor: smallFactor },
		{ id: "programmingLanguageBanner", factor: smallFactor },
		{ id: "ironBar-5", factor: smallFactor },
		{ id: "ironBar-6", factor: smallFactor },
		{ id: "ironBar-7", factor: smallFactor },
		{ id: "ironBar-8", factor: smallFactor },
		{ id: "expert-2", factor: smallFactor },
		{ id: "advanced-2", factor: smallFactor },
		{ id: "intermediate-2", factor: smallFactor },
		{ id: "beginner-2", factor: smallFactor },
		{ id: "CSharpSign", factor: smallFactor },
		{ id: "SQLSign", factor: smallFactor },
		{ id: "vbnetSign", factor: smallFactor },
		{ id: "javaSign", factor: smallFactor },
		{ id: "javascriptsign", factor: smallFactor },
		{ id: "ccplusplusSign", factor: smallFactor },
        { id: "workExperienceBanner", factor: smallFactor },
		{ id: "truck", factor: bigFactor },
		{ id: "udesConsultat", factor: bigFactor },
		{ id: "truck-2", factor: bigFactor },
		{ id: "databaseLoader", factor: bigFactor },
		{ id: "truck-3", factor: bigFactor },
		{ id: "smusInternship", factor: bigFactor },
		{ id: "truck-4", factor: bigFactor },
		{ id: "desjardinsInternship", factor: bigFactor },
		{ id: "finishLine", factor: smallFactor },
		{ id: "finishLinePole", factor: smallFactor },
	    { id: "socialIcons", factor: smallFactor }
    ];
    _.each(objects, function (object) {
        addElement(object.id, object.factor);
    });
    newFireHydrants(50);
    newStreetLights(50);
    newCirculationLight(50);
}

/**
 * Function description missing
 * @param {type} description of param
 */
function newFireHydrants(amount) {
    for (var i = 1; i <= amount; i++) {
        var newFireHydrant = $('#fireHydrant-' + (i - 1)).clone();
        newFireHydrant.attr('id', "fireHydrant-" + i);
        newFireHydrant.appendTo($('.content'));
        newFireHydrant.css('left', (parseInt((newFireHydrant.css('left'))) + Math.random() * 5000 + 1000) + "px");
        addElement("fireHydrant-" + i, 0.5);
    }
}

/**
 * Function description missing
 * @param {type} description of param
 */
function newStreetLights(amount) {
    for (var i = 1; i <= amount; i++) {
        var newstreetLight = $('#streetLight-' + (i - 1)).clone();
        newstreetLight.attr('id', "streetLight-" + i);
        newstreetLight.appendTo($('.content'));
        newstreetLight.css('left', (parseInt((newstreetLight.css('left'))) + random() * 2000 + 600) + "px");
        addElement("streetLight-" + i, 0.5);
    }
}

/**
 * Function description missing
 * @param {type} description of param
 */
function newCirculationLight(amount) {
    for (var i = 1; i <= amount; i++) {
        var newcirculationLight = $('#circulationLight-' + (i - 1)).clone();
        newcirculationLight.attr('id', "circulationLight-" + i);
        newcirculationLight.appendTo($('.content'));
        newcirculationLight.css('left', (parseInt((newcirculationLight.css('left'))) + random() * 4000 + 5000) + "px");
        addElement("circulationLight-" + i, 0.5);
    }
}

/**
 * Function description missing
 * @param {type} description of param {type} description of param id
 * @param {type} description of param {type} description of param factor
 */
function addElement(id, factor) {
    var divToAdd = document.getElementById(id);
    var xPosition = parseInt($(divToAdd).css('left'));
    var arrayToAdd = new Array();
    arrayToAdd.push(divToAdd, xPosition, factor);
    objectArray.push(arrayToAdd);
}

/**
 * Function description missing
 * @param {type} description of param {type} description of param tempX
 */
function moveDivs(tempX) {
    lastTempX = tempX;
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

    if (tempX > 1900) {
        document.getElementById("databasesSign").style.bottom = "82px";
        if (tempX > 2610) {
            document.getElementById("codeSign").style.bottom = "82px";
            if (tempX > 3120) {
                document.getElementById("requirementsAnalysisSign").style.bottom = "30px";
                if (tempX > 3680) {
                    document.getElementById("testAutomationSign").style.bottom = "30px";
                    if (tempX > 4100) {
                        document.getElementById("cookingSign").style.bottom = "-280px";
                        if (tempX > 4490) {
                            if (!hammerGuyAnimationStarted) {
                                document.getElementById("cobolSign").style.bottom = "-180px";
                                recursiveHammerGuyAnimation();
                                hammerGuyAnimationStarted = true;
                            }
                        }
                    }
                }
            }
        }
    }

    if (tempX > 12550) {
        document.getElementById("CSharpSign").style.bottom = "82px";
        if (tempX > 13010) {
            document.getElementById("SQLSign").style.bottom = "82px";
            if (tempX > 13450) {
                document.getElementById("vbnetSign").style.bottom = "82px";
                if (tempX > 13880) {
                    document.getElementById("javaSign").style.bottom = "30px";
                    if (tempX > 14420) {
                        document.getElementById("javascriptsign").style.bottom = "30px";
                        if (tempX > 14880) {
                            document.getElementById("ccplusplusSign").style.bottom = "30px";
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
        document.getElementById("tallguy").style.bottom = "63px";

    }
    if (tempX > 9300) {
        document.getElementById("kayakerSign").style.bottom = "-275px";
    }

    if (tempX > 17850) {
        document.getElementById("carSmoke").style.bottom = "70px";
        document.getElementById("car").style.bottom = "30px";
        document.getElementById("carShadow").style.bottom = "-40px";
    }
    else {
        document.getElementById("carSmoke").style.bottom = "120px";
        document.getElementById("car").style.bottom = "80px";
        document.getElementById("carShadow").style.bottom = "10px";
    }
}

//Could not use conventional css transition on jquery animate with this kind of project
function recursiveHammerGuyAnimation() {
    if (objectArray[0][1] > objectArray[1][1] + 65) { //Element at index 0 of objectArray is hammerGuy and at index 1 is cobolsign
        setTimeout(function () {
            objectArray[0][1] = objectArray[0][1] - 15;
            var yourDivPositionX = objectArray[0][1] - objectArray[0][2] * lastTempX;;
            objectArray[0][0].style.left = yourDivPositionX + "px";
            recursiveHammerGuyAnimation();
        }, 25);
    }
    else {
        document.getElementById("cobolSign").style.transition = "bottom .05s linear";
        setTimeout(function () {
            document.getElementById("cobolSign").style.bottom = (parseInt($("#cobolSign").css('bottom')) - 35) + "px";
            setTimeout(function () {
                document.getElementById("cobolSign").style.bottom = (parseInt($("#cobolSign").css('bottom')) - 35) + "px";
                setTimeout(function () {
                    setTimeout(function () {
                        document.getElementById("cobolSign").style.bottom = (parseInt($("#cobolSign").css('bottom')) - 35) + "px";
                    }, 1700);
                    document.getElementById("cobolSign").style.transition = "bottom .3s linear";
                    document.getElementById("cobolSign").style.bottom = (parseInt($("#cobolSign").css('bottom')) - 240) + "px";
                    setTimeout(function () {
                        recursiveHammerGuyAnimationSecondPart();
                    }, 1000);                    
                }, 1700);
            }, 1700);
        }, 300);
    }
}

function recursiveHammerGuyAnimationSecondPart() {
    if (objectArray[0][1] > -600) { //Element at index 0 of objectArray is hammerGuy and at index 1 is cobolsign
        setTimeout(function () {
            objectArray[0][1] = objectArray[0][1] - 15;
            var yourDivPositionX = objectArray[0][1] - objectArray[0][2] * lastTempX;;
            objectArray[0][0].style.left = yourDivPositionX + "px";
            recursiveHammerGuyAnimationSecondPart();
        }, 25);
    }
}

/**
 * Function description missing
 */
function resizeEventHandler() {
    //adapt css on window resize for divs that can't be handled with simple css usage

    var pos = $("#car").position();

    var width = $("#car").outerWidth();

    $("#carSmoke").css({
        position: "fixed",
        bottom: (pos.bottom + 25) + "px"
    }).show();
}

/**
 * Function description missing
 * @param {type} description of param {type} description of param e
 */
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.returnValue = false;
}

/**
 * Function description missing
 * @param {type} description of param {type} description of param e
 * @returns {boolean}
 */
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

/**
 * Function description missing
 */
function disableScroll() {
    if (window.addEventListener) // older FF
    {
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    }
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

/**
 * Function description missing
 */
function enableScroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
