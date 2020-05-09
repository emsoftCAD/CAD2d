/*
 * 
 * @type THREE JS
 * 
 * @author Piotr Majewski EmSoft
 * @e-mail:emplast@wp.pl 
 * 
 * 
 * 
 * 
 * 
 */



var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
var raycaster = new THREE.Raycaster();
var clickCanvas = 0;
var objects = [];
var p_o = [];
var mouse = new THREE.Vector2();
var width = window.innerWidth;
var height = window.innerHeight;
var group = new THREE.Group();
var group_1 = new THREE.Group();
var group_2 = new THREE.Group();
var group_3 = new THREE.Group();
var loader = new THREE.FontLoader();
var lineEnd = false;
var eulerBlock;
var n = 0, nF = 0, nX = 0, nY = 0, nZ = 0;
var nA = 0, nD = 0, nA = 0, nB = 0, nE = 0;
var f = 0;
var o = false;
var p = false;
var l = false;
var k = false;
var c = false;
var x = false;
var block = false;
var scale = 1;
var scaleO = scale;
var g_2El = 0;
var startLine = new THREE.Vector3();
var endLine = [new THREE.Vector3()];
var endLineK = new THREE.Vector3();
var menuScetch = document.getElementById("menuScetch");
var menuScetchOK = true;
var quaternionBlock = new THREE.Quaternion();
var container = document.createElement("div");
document.body.appendChild(container);
container.setAttribute('id', 'container');
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1500);
var renderer = new THREE.WebGLRenderer({
    alpha: true
});
var three = THREE;
scene.background = new three.Color(0xedeff2);
renderer.setSize(width, height);
renderer.domElement.id = "can";
renderer.setClearColor(0x000000, 0);
container.appendChild(renderer.domElement);
//$('#can').addClass('col-sm-12');
var text2 = document.createElement('div');
text2.style.position = 'absolute';
text2.style.width = '150px';
text2.style.height = 'auto';
text2.setAttribute('id', 'text');
text2.innerHTML = 'Część nr 1';
text2.style.backgroundColor = "transparent";
text2.style.color = "blue";
text2.style.left = 100 + 'px';
text2.style.top = 150 + 'px';
document.body.appendChild(text2);
var icon = document.createElement('div');
icon.style.position = 'absolute';
icon.setAttribute('class', 'col-sm-9');
icon.style.backgroundColor = 'transparent';
icon.style.left = 50 + 'px';
icon.style.top = 20 + 'px';
document.body.appendChild(icon);
icon.setAttribute('id', 'icon');
$('#icon').append('<img  id="pushY" title="Kreślenie lini pushY" src="http://www.cad.emsoft.net.pl/icon/Part_Line_Parametric.png" style="float:left;margin-left: 10px;border:0.5px solid #edeff2;" width="25"height="25">');
$('#icon').append('<img height="25" id="pushZ" title="Kreślenie kwadratu pushZ" src="http://www.cad.emsoft.net.pl/icon/Draft_Rectangle.png" style="float:left;margin-left: 10px;border:0.5px solid #edeff2" width="25">');
$('#icon').append('<img height="25" id="pushA" title="Kreślenie koła pushA" src="http://www.cad.emsoft.net.pl/icon/Part_Circle_Parametric.png" style="float:left;margin-left: 10px;border:0.5px solid #edeff2" width="25">')
$('#icon').append('<img height="25" id="pushB" title="Puste pushB" src="http://www.cad.emsoft.net.pl/icon/Draft_Polygon.png" style="float:left;margin-left: 10px;border:0.5px solid #edeff2" width="25">');
$('#icon').append('<img height="25" id="pushC" title="Puste pushC" src="http://www.cad.emsoft.net.pl/icon/Draft_Point.png" style="float:left;margin-left: 10px;border:0.5px solid #edeff2" width="25"></br></br>');
$('#icon').append('<img height="25" id="pushF" title="Blokowanie płaszczyzny kreślenia pushF" src="http://www.cad.emsoft.net.pl/icon/Part_Mirror.png" style="float:left;margin-left: 10px;border:0.5px solid #edeff2" width="25">');
$('#icon').append('<img height="25" id="pushG" title="Puste pushG" src="http://www.cad.emsoft.net.pl/icon/if_info_blue_40801.png" style="float:left;margin-left: 10px;border:0.5px solid #edeff2" width="25">');
var footer = document.createElement('div');
footer.style.position = 'absolute';
footer.setAttribute('id', 'footer');
footer.setAttribute('class', 'col-sm-12');
footer.style.bottom = 0 + 'px';
footer.style.minWidth="90%";
footer.style.padding="35px";
document.body.appendChild(footer);

$('#footer').append('<div id="footerInput"></div>');
$('#footerInput').append('<input type="text" class="form-control" id="text1" disabled ></br>');
$('#footerInput').append('<input type="text" class="form-control" id="text2"></br>');
$('#footer').append('<div id="footerInfo" class="col-sm-3"><p id="pLine">Brak obiektów</p><p id="pFooter_1"><p id="x">X:</p><p id="y">Y:</p><p id="z">Z:</p></p></div>')
$('#footer').append('<div id="footerCopright" class="col-sm-3" style="display:inline-block;float:right;"></div>');
$('#footerCopright').append('<p id="pFooter"></p>');


var light = new THREE.DirectionalLight(0xffffff, 2);

light.position.set(10, 10, 1);
scene.add(light);
scene.add(new THREE.AmbientLight(0x93969b, 2));

var geometry = new THREE.CylinderGeometry(1, 1, 20, 32);
var material = new THREE.MeshBasicMaterial({
    color: 0x144c13
});
var cylinder = new THREE.Mesh(geometry, material);
var geometry = new THREE.CylinderGeometry(0, 1.5, 5, 32);
var stozek = new THREE.Mesh(geometry, material);
var geometryY = new THREE.CylinderGeometry(1, 1, 20, 32);
var materialY = new THREE.MeshBasicMaterial({
    color: 0xfc0a02
});
var cylinderY = new THREE.Mesh(geometryY, materialY);
var geometryY = new THREE.CylinderGeometry(0, 1.5, 5, 32);
var stozekY = new THREE.Mesh(geometryY, materialY);
var geometryZ = new THREE.CylinderGeometry(1, 1, 20, 32);
var materialZ = new THREE.MeshBasicMaterial({
    color: 0x0b0be5
});
var cylinderZ = new THREE.Mesh(geometryZ, materialZ);
var geometryZ = new THREE.CylinderGeometry(0, 1.5, 5, 32);
var stozekZ = new THREE.Mesh(geometryZ, materialZ);
var geometry = new THREE.SphereGeometry(3, 32, 32);
var material = new THREE.MeshBasicMaterial({
    color: 0xe88f0b
});
var kula = new THREE.Mesh(geometry, material);
/* front */
var geometryP1 = new THREE.PlaneGeometry(40, 40, 32);
var materialPlane1 = new THREE.MeshBasicMaterial({
    color: 0xd83c2b
});
var plane = new THREE.Mesh(geometryP1, materialPlane1);
plane.name = 'front';
/* back  */
var geometryP1 = new THREE.PlaneGeometry(40, 40, 32);
var plane1 = new THREE.Mesh(geometryP1, materialPlane1);
plane1.name = 'back';
/* left */
var geometryP2 = new THREE.PlaneGeometry(40, 40, 32);
var materialPlane12 = new THREE.MeshBasicMaterial({
    color: 0x039625
});
var plane2 = new THREE.Mesh(geometryP2, materialPlane12);
plane2.name = 'left';
/* right */
var geometryP2 = new THREE.PlaneGeometry(40, 40, 32);
var plane3 = new THREE.Mesh(geometryP2, materialPlane12);
plane3.name = 'right';
/* bottom */
var geometryP3 = new THREE.PlaneGeometry(40, 40, 32);
var materialPlane13 = new THREE.MeshBasicMaterial({
    color: 0x1262a8
});
var plane4 = new THREE.Mesh(geometryP3, materialPlane13);
plane4.name = 'bottom';
/* top */
var geometryP3 = new THREE.PlaneGeometry(40, 40, 32);
var plane5 = new THREE.Mesh(geometryP3, materialPlane13);
plane5.name = 'top';
var material1 = new THREE.LineBasicMaterial({
    color: 0x050505
});
// color: 0xedeff2,
//płaszczyzny czarne
var geometryP4 = new THREE.PlaneGeometry(250, 250, 250);
var materialP4 = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide, vertexColors: THREE.FaceColors });
var plane6 = new THREE.Mesh(geometryP4, materialP4);
plane6.name = "XY";
var geometryP5 = new THREE.PlaneGeometry(250, 250, 250);
var materialP5 = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide, vertexColors: THREE.FaceColors });
var plane7 = new THREE.Mesh(geometryP5, materialP5);
plane7.name = "YZ";
var geometryP6 = new THREE.PlaneGeometry(250, 250, 250);
var materialP6 = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide, vertexColors: THREE.FaceColors });
var plane8 = new THREE.Mesh(geometryP6, materialP6);
plane8.name = "XZ";

var geometry1 = new THREE.Geometry();
geometry1.vertices.push(new THREE.Vector3(-20, -20, -20), new THREE.Vector3(20, -20, -20), new THREE.Vector3(20, 20, -20), new THREE.Vector3(-20, 20, -20), new THREE.Vector3(-20, -20, -20), new THREE.Vector3(-20, -20, 20), new THREE.Vector3(-20, 20, 20), new THREE.Vector3(-20, 20, -20), new THREE.Vector3(20, 20, -20), new THREE.Vector3(20, -20, -20), new THREE.Vector3(20, -20, 20), new THREE.Vector3(20, 20, 20), new THREE.Vector3(20, 20, -20), new THREE.Vector3(20, 20, 20), new THREE.Vector3(20, -20, 20), new THREE.Vector3(-20, -20, 20), new THREE.Vector3(-20, 20, 20), new THREE.Vector3(20, 20, 20));
geometry1.computeBoundingSphere();
var line = new THREE.Line(geometry1, material1);
stozekZ.translateY(22.5);
cylinderZ.translateY(10);
cylinderY.rotateZ(toRadians(-90));
stozekY.rotateZ(toRadians(-90));
cylinderY.translateY(10);
stozekY.translateY(22.5);
cylinder.rotateX(toRadians(-90));
stozek.rotateX(toRadians(-90));
cylinder.translateY(10);
stozek.translateY(22.5);
plane.translateZ(20);
plane1.translateZ(-20);
plane1.rotateY(toRadians(180));
plane2.rotateY(toRadians(-90));
plane2.translateZ(20);
plane3.rotateY(toRadians(90));
plane3.translateZ(20);
plane4.rotateX(toRadians(90));
plane4.translateZ(20);
plane5.rotateX(toRadians(-90));
plane5.translateZ(20);
plane7.rotateY(toRadians(90));
plane8.rotateX(toRadians(90));

group.quaternion.setFromEuler(new THREE.Euler(toRadians(30), toRadians(-30), 0, "XYZ"));
group_1.quaternion.setFromEuler(new THREE.Euler(toRadians(30), toRadians(-30), 0, "XYZ"));
group_2.quaternion.setFromEuler(new THREE.Euler(toRadians(30), toRadians(-30), 0, "XYZ"));
group_3.quaternion.setFromEuler(new THREE.Euler(toRadians(30), toRadians(-30), 0, "XYZ"));
group.quaternion.normalize();
group_1.quaternion.normalize();
group_2.quaternion.normalize();
group_3.quaternion.normalize();


group.add(cylinder);
group.add(cylinderY);
group.add(cylinderZ);
group.add(stozek);
group.add(stozekY);
group.add(stozekZ);
group.add(kula);
//plaszczyzny czarne;
group.add(plane6);
group.add(plane7);
group.add(plane8);

group_1.add(line);
group.position.set(0, 0, -150);
group_1.position.set($('#can').width() / 2 - 100, $('#can').height() / 2 - 100, -150);
group_1.add(plane); //front
group_1.add(plane1); //back
group_1.add(plane2); //left
group_1.add(plane3); //right
group_1.add(plane4); //top
group_1.add(plane5); //bottom


camera.position.set(0, 0, 800);


var pozycja = [new THREE.Vector3()];
var radius_1, segments = 32,
    srednica = 0;
var a = [new THREE.Vector3()];
var dlugosc = [new THREE.Vector3()];
var depth,
    v = [new THREE.Vector3()],
    x_v = [new THREE.Vector3()],
    v_z = 0;

loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
    var xMid, text;
    var textShape = new THREE.BufferGeometry();
    var textShapeR = new THREE.BufferGeometry();
    var textShapeL = new THREE.BufferGeometry();
    var textShapeT = new THREE.BufferGeometry();
    var textShapeD = new THREE.BufferGeometry();
    var textShapeB = new THREE.BufferGeometry();
    var color = 0xf9fafc;
    var matLite = new THREE.MeshBasicMaterial({
        color: color
    });
    var message = "Front";
    var shapes = font.generateShapes(message, 8, 2);
    var geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    textShape.fromGeometry(geometry);
    text = new THREE.Mesh(textShape, matLite);
    var messageR = "Right";
    var shapesR = font.generateShapes(messageR, 8, 2);
    var geometryR = new THREE.ShapeGeometry(shapesR);
    geometryR.computeBoundingBox();
    xMidR = -0.5 * (geometryR.boundingBox.max.x - geometryR.boundingBox.min.x);
    geometryR.translate(xMidR, 0, 0);
    textShapeR.fromGeometry(geometryR);
    textR = new THREE.Mesh(textShapeR, matLite);
    var messageL = "Left";
    var shapesL = font.generateShapes(messageL, 8, 2);
    var geometryL = new THREE.ShapeGeometry(shapesL);
    geometryL.computeBoundingBox();
    xMidL = -0.5 * (geometryL.boundingBox.max.x - geometryL.boundingBox.min.x);
    geometryL.translate(xMidL, 0, 0);
    textShapeL.fromGeometry(geometryL);
    textL = new THREE.Mesh(textShapeL, matLite);
    var messageT = "Top";
    var shapesT = font.generateShapes(messageT, 8, 2);
    var geometryT = new THREE.ShapeGeometry(shapesT);
    geometryT.computeBoundingBox();
    xMidT = -0.5 * (geometryT.boundingBox.max.x - geometryT.boundingBox.min.x);
    geometryT.translate(xMidT, 0, 0);
    textShapeT.fromGeometry(geometryT);
    textT = new THREE.Mesh(textShapeT, matLite);
    var messageD = "Down";
    var shapesD = font.generateShapes(messageD, 8, 2);
    var geometryD = new THREE.ShapeGeometry(shapesD);
    geometryD.computeBoundingBox();
    xMidD = -0.5 * (geometryD.boundingBox.max.x - geometryD.boundingBox.min.x);
    geometryD.translate(xMidD, 0, 0);
    textShapeD.fromGeometry(geometryD);
    textD = new THREE.Mesh(textShapeD, matLite);
    var messageB = "Back";
    var shapesB = font.generateShapes(messageB, 8, 2);
    var geometryB = new THREE.ShapeGeometry(shapesB);
    geometryB.computeBoundingBox();
    xMidB = -0.5 * (geometryB.boundingBox.max.x - geometryB.boundingBox.min.x);
    geometryB.translate(xMidB, 0, 0);
    textShapeB.fromGeometry(geometryB);
    textB = new THREE.Mesh(textShapeB, matLite);
    group_1.add(text);
    group_1.add(textR);
    group_1.add(textL);
    group_1.add(textT);
    group_1.add(textD);
    group_1.add(textB);
    text.translateZ(20);
    textR.rotateY(toRadians(90));
    textR.translateZ(21);
    textL.rotateY(toRadians(-90));
    textL.translateZ(21);
    textT.rotateX(toRadians(-90));
    textT.translateZ(21);
    textD.rotateX(toRadians(90));
    textD.translateZ(21);
    textB.rotateY(toRadians(180));
    textB.translateZ(21);
});
scene.add(group, group_1, group_2, group_3);
objects.push(plane, plane1, plane2, plane3, plane4, plane5, cylinder, plane6, plane7, plane8);
p_o.push(plane6, plane7, plane8);

function init() {

}


function onMouseDown(e) {
    e.preventDefault();
    if (e.button == 0) {
        planeColor(e);
        raycasterClik();
    }

    isDragging = true;
    leftButtoMouse(e);


    if (l) {
        block = true;
        linia(e);
    }
    if (k) {
        block = true;
        kwadrat(e);
    }
    if (c) {
        block = true;
        okreg(e);
    }
    


}


function onMouseMove(e) {
    e.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycasterMove(mouse);
    draging(e);
    mousePosition(e);

    if (l)
        liniaM(e);
    if (k)
        kwadratM(e);
    if (c)
        okregM(e);
   
}

function onMouseUp(e) {
    isDragging = false;

}

function onKeyDown(e) {
    escDelete(e);

}

function onMouseWheel(e) {

    scaleCanvas(e);
    // console.log(e.deltaY);
}

function contextmenu(e) {

    if (this.enabled === false) return;

    e.preventDefault();

}


/*
*
*
*  EVENTY
*
*
*
*
*/
var qutOut = new THREE.Quaternion();
renderer.domElement.addEventListener("mousedown", onMouseDown);
renderer.domElement.addEventListener("mousemove", onMouseMove, false);
renderer.domElement.addEventListener("mouseup", onMouseUp);
menuScetch.addEventListener("mouseup", onMouseUp);
document.addEventListener("keydown", onKeyDown);
document.addEventListener("wheel", onMouseWheel);
renderer.domElement.addEventListener('contextmenu', contextmenu, false);

//PRZYCISKI

document.getElementById("pushY").onclick = function () {
    nY++;
    if (nY % 2 != 0) {
        l = true;
        if (group_2.children.length > 0) {
            lineEnd = true;
        } else {
            lineEnd = false;
            block = false;
        }
        document.getElementById("pushY").style.backgroundColor = "red";
    } else {
        l = false;
        block = false;
        document.getElementById("pushY").style.backgroundColor = "transparent";
        group_2.remove(group_2.children[group_2.children.length - 1]);
        lineEnd = false;
        clickCanvas = 0;
        endLine.splice(1, endLine.length);
        nY = 0;
    }
}
document.getElementById("pushZ").onclick = function () {
    nZ++;
    if (nZ == 1) {
        k = true;
        document.getElementById("pushZ").style.backgroundColor = "red";
    } else {
        k = false;
        block = false;
        document.getElementById("pushZ").style.backgroundColor = "transparent";
        clickCanvas = 0;
        nZ = 0;
    }
}
document.getElementById("pushA").onclick = function () {
    nA++;
    if (nA == 1) {
        c = true;
        document.getElementById("pushA").style.backgroundColor = "red";
    } else {
        c = false;
        block = false;
        document.getElementById("pushA").style.backgroundColor = "transparent";
        clickCanvas = 0;
        nA = 0;
    }
}
document.getElementById("pushG").onclick = function () {
    alert("Kliknełeś na #pushG");
}
document.getElementById("pushC").onclick = function () {
    alert("Kliknełeś na #pushC");
}
document.getElementById("pushF").onclick = function () {
    nF++;
    var geometry = new THREE.PlaneGeometry(250, 250, 250);
    var material = new THREE.MeshBasicMaterial({ color: 0x616263, transparent: true, opacity: 0.25, side: THREE.DoubleSide, vertexColors: THREE.FaceColors });
    var plane9 = new THREE.Mesh(geometry, material);
    plane9.name = "planeBlock";
    if (nF == 1) {
        x = true;
        document.getElementById("pushF").style.backgroundColor = "red";
        eulerBlock = new THREE.Euler(-group_1.rotation._x,-group_1.rotation._y,-group_1.rotation._z, "ZYX");
        plane9.setRotationFromEuler(new THREE.Euler(eulerBlock._x,eulerBlock._y,eulerBlock._z,"ZYX"));
        qutOut=group_3.quaternion;
        group_3.add(plane9);

    } else {
        x = false;
        document.getElementById("pushF").style.backgroundColor = "transparent";
        clickCanvas = 0;
        nF = 0;
        group_3.remove(group_3.children[0]);

    }
    render();
}



//FUNKCJE POZOSTAŁE


function planeColor(e) {

    mouse.x = ((e.clientX) / document.getElementById("can").width) * 2 - 1;
    mouse.y = -((e.clientY) / document.getElementById("can").height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var inter = raycaster.intersectObjects(p_o);
    if (inter.length > 0) {

        if (!block) {


            inter[0].object.material.color.set(0xff0000);
            inter[0].object.geometry.colorsNeedUpdate = true;
            block = true;
            toRotate(inter, false);
        }


    } else if (!block) {

        plane6.material.color.set(0x272828);
        plane7.material.color.set(0x272828);
        plane8.material.color.set(0x272828);

        block = false;
        plane6.geometry.colorsNeedUpdate = true;
        plane7.geometry.colorsNeedUpdate = true;
        plane8.geometry.colorsNeedUpdate = true;
    }

    render();
}

function draging(e) {
    var deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y
    };
    if (isDragging && !block) {
        var eu = new THREE.Euler(toRadians(deltaMove.y * 0.3), toRadians(deltaMove.x * 0.3), 0, 'XYZ');
        var deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(eu);
        group.quaternion.multiplyQuaternions(deltaRotationQuaternion, group.quaternion);
        group_1.quaternion.multiplyQuaternions(deltaRotationQuaternion, group_1.quaternion);
        group_2.quaternion.multiplyQuaternions(deltaRotationQuaternion, group_2.quaternion);
        group_3.quaternion.multiplyQuaternions(deltaRotationQuaternion, group_3.quaternion);
    }
    previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
    };
}

function leftButtoMouse(e) {
    if (e.button == 2) {
        if (l == true) {
            $('canvas').oncontextmenu = function () {
                return false;
            };
            $('#pushY').click();
        }
        if (k == true) {
            $('#pushZ').click();
        }
        if (c == true) {
            $('#pushA').click();
        }
        if (o == true) {
            $('#pushD').click();
        }
        if (p == true) {
            $('#pushE').click();
        }

        if (!menuScetchOK) {
            menuScetch.addEventListener("contextmenu", function (e) { e.preventDefault() }, false);
            menuScetch.style.display = "inline-block"
            menuScetch.style.marginLeft = e.clientX + "px";
            menuScetch.style.marginTop = e.clientY + "px";
        }
    }
    if (e.button == 0) {
        block = false;
        planeColor(e);
    }
}

function escDelete(e) {
    //Esc
    if (e.which == 27) {
        if (l == true) {
            $('#pushY').click();
        }
        if (k == true) {
            $('#pushZ').click();
        }
        if (c == true) {
            $('#pushA').click();
        }
        if (o == true) {
            $('#pushD').click();
        }
        if (p == true) {
            $('#pushE').click();
        }
        planeColor(e);
    }
    // Delete
    if (e.which == 13) {
        if ($('#text_z1').val() != "") {
            $('#pushX1').click();
        }
    }
}

function scaleCanvas(e) {
    if (e.deltaY < 0) {
        scale = scale + 0.01;
        if (scaleO < 1.6) {
            scaleO = scale;
        } else {
            scaleO = 1.6;
        }
        group_3.scale.set(scale, scale, scale);
        group_2.scale.set(scale, scale, scale);
        group.scale.set(scaleO, scaleO, scaleO);
    } else {
        if (scale > 0.0001) {
            scale = scale - 0.01;
            scaleO = scale;
        } else {
            scale = 0.0001;
            scaleO = scale;
        }
        if (scaleO < 1.6) {
            scaleO = scale;
        } else {
            scaleO = 1.6;
        }
        group_3.scale.set(scale, scale, scale);
        group_2.scale.set(scale, scale, scale);
        group.scale.set(scaleO, scaleO, scaleO);

    }
    var mouse = new THREE.Vector2();
    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;
    document.getElementById("x").innerHTML ="X:"+(mouse.x).toFixed(2);
    document.getElementById("y").innerHTML ="Y:"+(mouse.y).toFixed(2);
    document.getElementById("z").innerHTML ="Z:"+(group.position.z / scale).toFixed(2);
}

function mousePosition(e) {
    var mouse = new THREE.Vector2();
    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;
    document.getElementById("x").innerHTML ="X:"+(mouse.x).toFixed(2);
    document.getElementById("y").innerHTML ="Y:"+(mouse.y).toFixed(2);
    document.getElementById("z").innerHTML ="Z:"+(group.position.z / scale).toFixed(2);
        

}

function intersectBlockPlane(x, y) {
    var euler = new THREE.Euler(eulerBlock._x,eulerBlock._y,eulerBlock._z, "ZYX");
    var m = new THREE.Matrix4().makeRotationFromEuler(euler);
    var m_i = new THREE.Matrix4().getInverse(m);
  
    var p0 = new THREE.Vector3(x, y, 1000).applyEuler(new THREE.Euler(-group_1.rotation._x,-group_1.rotation._y,-group_1.rotation._z,"ZYX")).applyMatrix4(m_i);
    var p1 = new THREE.Vector3(x, y, -1000).applyEuler(new THREE.Euler(-group_1.rotation._x,-group_1.rotation._y,-group_1.rotation._z,"ZYX")).applyMatrix4(m_i);
    var line = new THREE.Line3(p0, p1);
    var plane = new THREE.Plane().setFromCoplanarPoints(
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)
    );
    return plane.intersectLine(line);
  }

function linia(e) {

    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;


    var geometryLine = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({
        color: 0x050505
    });
    switch (clickCanvas) {
        case 0:
            startLine.x = mouse.x;
            startLine.y = mouse.y;
            startLine.z = 0;
            break;
        case 1:
            endLine.push(new THREE.Vector3(mouse.x, mouse.y, 0));
            geometryLine.vertices.push(startLine);
            geometryLine.vertices.push(endLine[clickCanvas]);
            geometryLine.computeBoundingBox();
            var line = new THREE.Line(geometryLine, material);
            line.boundingSphere = null;
            line.name = 'lineProba_' + (clickCanvas - 1);
            line.rotateZ(-group_1.rotation._z);
            line.rotateY(-group_1.rotation._y);
            line.rotateX(-group_1.rotation._x);
            if (lineEnd == false) {
                for (var i = 0; i < group_2.children.length; i++) {
                    group_2.remove(group_2.children[i]);
                }
                group_2.add(line);
                objects.push(line);
            } else {
                for (var i = g_2El; i < group_2.children.length; i++) {
                    group_2.remove(group_2.children[i]);
                }
            }
            g_2El = group_2.children.length;
            break;
        default:
            endLine.push(new THREE.Vector3(mouse.x, mouse.y, 0));
            geometryLine.vertices.push(endLine[clickCanvas - 1]);
            geometryLine.vertices.push(endLine[clickCanvas]);
            geometryLine.computeBoundingBox();
            var line = new THREE.Line(geometryLine, material);
            line.boundingSphere = null;
            line.name = 'lineProba_' + (clickCanvas - 1);
            line.rotateZ(-group_1.rotation._z);
            line.rotateY(-group_1.rotation._y);
            line.rotateX(-group_1.rotation._x);
            if (lineEnd == false) {
                for (var i = clickCanvas - 1; i < group_2.children.length; i++) {
                    group_2.remove(group_2.children[i]);
                }
                group_2.add(line);
                objects.push(line);
            } else {
                for (var i = clickCanvas - 1 + g_2El; i < group_2.children.length; i++) {
                    group_2.remove(group_2.children[i]);
                }
                group_2.add(line);
                objects.push(line);
            }
            g_2El = group_2.children.length;
            break;
    }
    clickCanvas++;
    objects.splice(7, objects.length);
    for (var i = 0; i < group_2.children.length; i++) {
        objects.push(group_2.children[i]);
    }
}

function kwadrat(e) {

    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;
    if (!x) {
      switch (clickCanvas) {
        case 0:
          a[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          break;
        default:
          a[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          break;
      }
  
    } else {
  
      
  
      switch (clickCanvas) {
        case 0:
          // a[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          a[1] = intersectBlockPlane(mouse.x, mouse.y);
          // a[1].applyEuler(euler);
          console.log(a[1]);
          break;
        case 1:
          // console.log("EULER: ");
          // console.log(euler);
          break;
        default:
          // a[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          a[1] = intersectBlockPlane(mouse.x, mouse.y);
          // a[1].applyEuler(euler);
          break;
      }
  
    }
  
    clickCanvas++;
    objects.splice(7 + g_2El, objects.length);
    for (var i = 0 + g_2El; i < group_2.children.length; i++) {
      objects.push(group_2.children[i]);
    }
    g_2El = group_2.children.length;
  }


function okreg(e) {

    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;
  
    if (!x) {
  
  
      switch (clickCanvas) {
        case 0:
          pozycja[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          pozycja[1].applyEuler(new THREE.Euler(-group_1.rotation._x, -group_1.rotation._y, -group_1.rotation._z, "ZYX"));
          break;
        default:
          pozycja[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          pozycja[1].applyEuler(new THREE.Euler(-group_1.rotation._x, -group_1.rotation._y, -group_1.rotation._z, "ZYX"));
          break;
      }
  
  
  
    } else {
  
      // var euler = euler0();
      var euler = new THREE.Euler(eulerBlock._x,eulerBlock._y,eulerBlock._z, "ZYX");
  
      switch (clickCanvas) {
        case 0:
          pozycja[1] = intersectBlockPlane(mouse.x, mouse.y); //new THREE.Vector3(mouse.x, mouse.y, 0);
  
          pozycja[1].applyEuler(euler);
          break;
        default:
          pozycja[1] = intersectBlockPlane(mouse.x, mouse.y); //new THREE.Vector3(mouse.x, mouse.y, 0);
          pozycja[1].applyEuler(euler);
          break;
      }
    }
    clickCanvas++;
    objects.splice(7 + g_2El, objects.length);
    for (var i = 0 + g_2El; i < group_2.children.length; i++) {
      objects.push(group_2.children[i]);
    }
    g_2El = group_2.children.length;
    render();
  }



function liniaM(e) {

    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;

    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({
        color: 0x050505
    });
    switch (clickCanvas) {
        case 0:
            break;
        case 1:
            endLineK.x = mouse.x;
            endLineK.y = mouse.y;
            endLineK.z = 0;
            geometry.vertices.push(startLine, endLineK);
            var line = new THREE.Line(geometry, material);
            line.rotateZ(-group_1.rotation._z);
            line.rotateY(-group_1.rotation._y);
            line.rotateX(-group_1.rotation._x);
            if (lineEnd == false) {
                for (var i = 0; i < group_2.children.length; i++) {
                    group_2.remove(group_2.children[i]);
                }
                group_2.add(line);
            } else {
                for (var i = g_2El; i < group_2.children.length; i++) {
                    group_2.remove(group_2.children[i]);
                }
                group_2.add(line);
            }
            break;
        default:
            endLineK.x = mouse.x;
            endLineK.y = mouse.y;
            endLineK.z = 0;
            geometry.vertices.push(endLine[clickCanvas - 1], endLineK);
            var line = new THREE.Line(geometry, material);
            line.rotateZ(-group_1.rotation._z);
            line.rotateY(-group_1.rotation._y);
            line.rotateX(-group_1.rotation._x);
            if (lineEnd == false) {
                for (var i = clickCanvas - 1; i < group_2.children.length; i++) {
                    group_2.remove(group_2.children[i]);
                }
                group_2.add(line);
            } else {
                for (var i = clickCanvas - 1 + g_2El; i < group_2.children.length; i++) {
                    group_2.remove(group_2.children[i]);
                }
                group_2.add(line);
            }
            break;
    }
}

function kwadratM(e) {

    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;
  
    var material = new THREE.LineBasicMaterial({
      color: 0x050505
    });
    var geometry = new THREE.Geometry();
    if (!x) {
      switch (clickCanvas) {
  
        case 1:
          a[3] = new THREE.Vector3(mouse.x, mouse.y, 0);
          a[2] = new THREE.Vector3(a[1].x, a[3].y, 0);
          a[4] = new THREE.Vector3(a[3].x, a[1].y, 0);
          a[5] = new THREE.Vector3(a[1].x, a[1].y, 0);
          geometry.vertices.push(a[1], a[2], a[3], a[4], a[5]);
          var box = new THREE.Line(geometry, material);
          box.setRotationFromEuler(new THREE.Euler(-group_1.rotation._x, -group_1.rotation._y, -group_1.rotation._z, "ZYX"));
          // box.rotateZ(-group_1.rotation._z);
          // box.rotateY(-group_1.rotation._y);
          // box.rotateX(-group_1.rotation._x);
          for (var i = 0 + g_2El; i < group_2.children.length; i++) {
            group_2.remove(group_2.children[i])
          }
          group_2.add(box);
          break;
        default:
          a[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          clickCanvas = 0;
          break;
      }
    } else {
  
      var euler = new THREE.Euler(eulerBlock._x,eulerBlock._y,eulerBlock._z, "ZYX");
      
      switch (clickCanvas) {
  
        case 1:
  
          a[3] = intersectBlockPlane(mouse.x, mouse.y);
  
          a[2] = new THREE.Vector3(a[1].x, a[3].y, 0);
          // 
          a[4] = new THREE.Vector3(a[3].x, a[1].y, 0);
          // 
          a[5] = new THREE.Vector3(a[1].x, a[1].y, 0);
  
          for (var i = 2; i < 6; i++) {
            a[i].applyEuler(euler);
          }
  
          // a[1].applyEuler(euler);
          // a[2].applyEuler(euler);
  
          // a[4].applyEuler(euler);
          // a[5].applyEuler(euler);
  
  
          geometry.vertices.push(a[1].clone().applyEuler(euler), a[2], a[3], a[4], a[5]);
          var box = new THREE.Line(geometry, material);
          // box.setRotationFromEuler(euler);
          // box.rotateZ(-eulerBlock._z);
          // box.rotateY(-eulerBlock._y);
          // box.rotateX(-eulerBlock._x);
          // box.quaternion.setFromEuler(euler);
          for (var i = 0 + g_2El; i < group_2.children.length; i++) {
            group_2.remove(group_2.children[i])
          }
          group_2.add(box);
          break;
        default:
          a[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          a[1].applyEuler(euler);
          clickCanvas = 0;
          break;
      }
    }
    render();
  }

  function okregM(e) {

    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;
  
    if (!x) {
      switch (clickCanvas) {
        case 0:
          break;
        case 1:
          var radius,
            segments = 32,
            material = new THREE.LineBasicMaterial({
              color: 0x050505
            }),
            srednica = new THREE.Vector3(mouse.x, mouse.y, 0);
          srednica.applyEuler(new THREE.Euler(-group_1.rotation._x, -group_1.rotation._y, -group_1.rotation._z, "ZYX"));
          radius = srednica.distanceTo(pozycja[1]);
          geometry = new THREE.CircleGeometry(radius, segments, 0, (Math.PI * 2).toFixed(2)),
            geometry.vertices.shift();
          circle = new THREE.Line(geometry, material);
          circle.rotateZ(-group_1.rotation._z);
          circle.rotateY(-group_1.rotation._y);
          circle.rotateX(-group_1.rotation._x);
          circle.position.set(pozycja[1].x, pozycja[1].y, pozycja[1].z);
          for (var i = 0 + g_2El; i < group_2.children.length; i++) {
            group_2.remove(group_2.children[i])
          }
          group_2.add(circle);
          break;
        default:
          p[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          pozycja[1].applyEuler(new THREE.Euler(-group_1.rotation._x, -group_1.rotation._y, -group_1.rotation._z, "ZYX"));
          clickCanvas = 0;
          break;
      }
    } else {
  
  
      var euler = new THREE.Euler(eulerBlock._x,eulerBlock._y,eulerBlock._z, "ZYX");
      // var euler = euler0();
      switch (clickCanvas) {
        case 0:
          break;
        case 1:
          var radius,
            segments = 32,
            material = new THREE.LineBasicMaterial({
              color: 0x050505
            }),
            srednica = intersectBlockPlane(mouse.x, mouse.y); // new THREE.Vector3(mouse.x, mouse.y, 0);
          srednica.applyEuler(euler);
          radius = srednica.distanceTo(pozycja[1]);
          geometry = new THREE.CircleGeometry(radius, segments, 0, (Math.PI * 2).toFixed(2)),
            geometry.vertices.shift();
          circle = new THREE.Line(geometry, material);
          circle.setRotationFromEuler(euler);
          circle.position.set(pozycja[1].x, pozycja[1].y, pozycja[1].z);
          for (var i = 0 + g_2El; i < group_2.children.length; i++) {
            group_2.remove(group_2.children[i])
          }
          group_2.add(circle);
          break;
        default:
          p[1] = new THREE.Vector3(mouse.x, mouse.y, 0);
          pozycja[1].applyEuler(euler);
          clickCanvas = 0;
          break;
      }
  
    }
    render();
  }



function isRoot(euler) {

    // var deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(euler);
    var deltaRotationQuaternion = euler;
    // group.quaternion.multiplyQuaternions(group.quaternion,euler);
    // group_1.quaternion.multiplyQuaternions(group_1.quaternion,euler);
    // group_2.setRotationFromQuaternion(group.children[7].getWorldQuaternion(new THREE.Quaternion()));
    group.setRotationFromEuler(new THREE.Euler(Math.PI * 2, Math.PI * 2, 0, "XYZ"));
    group_1.setRotationFromEuler(new THREE.Euler(Math.PI * 2, Math.PI * 2, 0, "XYZ"));
    group_2.setRotationFromEuler(new THREE.Euler(Math.PI * 2, Math.PI * 2, 0, "XYZ"));
    // group.applyQuaternion(euler);
    // group_1.applyQuaternion(euler);
    // var quq= new THREE.Quaternion().setFromEuler(new THREE.Euler(toRadians(90),0,0,"XYZ"));

    // for(var rec = 0; rec<group_2.children.length;rec++){
    //     group_2.children[rec].quaternion.multiplyQuaternions(quq,group_2.children[rec].quaternion);
    // }

    // group_2.setRotationFromQuaternion(euler);
    // group_2.quaternion.setFromAxisAngle(new THREE.Vector3(1,0,0),toRadians(-90));
    // console.log(group.quaternion.multiplyQuaternions(euler,group.quaternion));

}

function render() {


    renderer.render(scene, camera);
}

function raycasterClik() {
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);
    raycaster.linePrecision = 3;
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        toRotate(intersects, block);
        document.getElementById("pLine").innerHTML = 'Objekt o nazwie: ' + intersects[0].object.name;
        document.getElementById("pLine").style.color = "red";
    } else {
        document.getElementById("pLine").innerHTML = "Brak zaznaczonych obiektow." ;
        document.getElementById("pLine").style.color = "black";
    }
}



function raycasterMove() {

    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);
    raycaster.linePrecision = 3;
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        
        document.getElementById("pLine").innerHTML = 'Objekt o nazwie: ' + intersects[0].object.name;
        document.getElementById("pLine").style.color = "red";
        // document.onKeyDown = function (e) {
        //     if (e.which == 46) {
        //         group_2.remove(intersects[0].object);
        //         objects.splice(7, objects.length);
        //         for (var i = 0; i < group_2.children.length; i++) {
        //             if (group_2.children[i] != objects[i + 7]) {
        //                 objects.push(group_2.children[i]);
        //             };
        //         };
        //     };
        // };
        if (intersects[0].object.name == "XY") {
            intersects[0].object.material.color.set(0x272828);
            intersects[0].object.material.opacity = "0.25";
            intersects[0].object.geometry.colorsNeedUpdate = true;
            menuScetchOK = false;
            // plane7.material.color.set(0xedeff2);
            // plane8.material.color.set(0xedeff2);
            plane7.material.opacity = "0";
            plane8.material.opacity = "0";
        } else if (intersects[0].object.name == "YZ") {
            intersects[0].object.material.color.set(0x272828);
            intersects[0].object.material.opacity = "0.25";
            intersects[0].object.geometry.colorsNeedUpdate = true;
            menuScetchOK = false;
            // plane6.material.color.set(0xedeff2);
            // plane8.material.color.set(0xedeff2);
            plane6.material.opacity = "0";
            plane8.material.opacity = "0";
        } else if (intersects[0].object.name == "XZ") {
            intersects[0].object.material.color.set(0x272828);
            intersects[0].object.material.opacity = "0.25";
            intersects[0].object.geometry.colorsNeedUpdate = true;
            menuScetchOK = false;
            // plane6.material.color.set(0xedeff2);
            // plane7.material.color.set(0xedeff2);
            plane6.material.opacity = "0";
            plane7.material.opacity = "0";
        }
    } else {
        document.getElementById("pLine").innerHTML = "Brak zaznaczonych obiektow.";
        document.getElementById("pLine").style.color = "black";
        // materialP6.color="0xedeff2";
        // plane6.material.color.set(0xedeff2);
        // plane7.material.color.set(0xedeff2);
        // plane8.material.color.set(0xedeff2);
        plane6.material.opacity = "0";
        plane7.material.opacity = "0";
        plane8.material.opacity = "0";
        menuScetch.style.display = "none";
        menuScetchOK = true;
    }
    // render();

}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}
animate();


function toRotate(intersects, block) {
    var qua = new THREE.Quaternion();
    if (intersects[0].object.name == 'front' && block == false ||
        intersects[0].object.name == 'XY' && block == false) {
        qua.setFromEuler(new THREE.Euler(0, 0, 0));
        if (group_1.quaternion != qua) {
            group_3.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_2.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_1.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            // isRoot(qua);

        }

    }
    if (intersects[0].object.name == 'right' && block == false) {
        qua.setFromEuler(new THREE.Euler(0, -Math.PI / 2, 0));
        if (group_1.quaternion != qua) {
            group_3.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_2.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_1.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group.quaternion.set(qua._x, qua._y, qua._z, qua._w);
        }
    }
    if (intersects[0].object.name == 'back' && block == false) {
        qua.setFromEuler(new THREE.Euler(Math.PI * 2, Math.PI * 3, Math.PI * 2));
        if (group_1.quaternion != qua) {
            group_3.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_2.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_1.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group.quaternion.set(qua._x, qua._y, qua._z, qua._w);
        }

    }
    if (intersects[0].object.name == 'left' && block == false ||
        intersects[0].object.name == 'YZ' && block == false) {
        qua.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0));
        if (group_1.quaternion != qua) {
            group_3.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_2.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_1.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group.quaternion.set(qua._x, qua._y, qua._z, qua._w);

        }
    }
    if (intersects[0].object.name == 'top' && block == false ||
        intersects[0].object.name == 'XZ' && block == false) {
        qua.setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));
        if (group_1.quaternion != qua) {
            group_3.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_2.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_1.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            // isRoot(qua);
        }
    }
    if (intersects[0].object.name == 'bottom' && block == false) {
        qua.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
        if (group_1.quaternion != qua) {
            group_3.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_2.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group_1.quaternion.set(qua._x, qua._y, qua._z, qua._w);
            group.quaternion.set(qua._x, qua._y, qua._z, qua._w);
        }
    }

}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
$(function () {
    var date = new Date();
    $('#pFooter').html('\251 ' + date.getFullYear() + ' by EmSoft wszelkie prawa zastrzezone <br/><a href="http://www.emsoft.net.pl" target="_blank"><span style="color:#3016dd;"> www.emsoft.net.pl</span></a> <h4 style="color:red"> Strona w przygotowaniu</h4>');
});
$('#text1').val('Zablokuj płaszczyżnę do kreślenia');





