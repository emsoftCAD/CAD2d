/*
 * 
 * init.js
 * 
 * @author Piotr Majewski EmSoft
 * @e-mail:emplast@wp.pl 
 * 
 * 
 * 
 * 
 * 
 */

 /*
 *----------------------------------------------------------------------------------------
 *
 *                          Zmienne
 *---------------------------------------------------------------------------------------- 
 */









var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
var pozycja = [new THREE.Vector3()];
var segments = 32;
var srednica = 0;
var a = [new THREE.Vector3()];
var dlugosc = [new THREE.Vector3()];
var depth,
    v = [new THREE.Vector3()],
    x_v = [new THREE.Vector3()],
    v_z = 0;
var raycaster = new THREE.Raycaster();
var clickCanvas = 0;
var mouse = new THREE.Vector2();
var lineEnd = false;
var eulerBlock;
var n = 0, nF = 0, nX = 0, nY = 0, nZ = 0;
var nA = 0, nD = 0, nB = 0, nE = 0,nS=0;
var f = 0;
var o = false;
var p = false;
var s = false;
var l = false;
var k = false;
var c = false;
var x = false;
var block = false;
var scale = 1;
var scaleO = scale;
var g_2El = 0;
var startLine= new THREE.Vector3() ;
var endLine = [new THREE.Vector3()];
var endLineK = new THREE.Vector3();
var sizeG = 10000;
var divisionsG = 1000;

var objects = [];
var p_o = [];
var width = window.innerWidth;
var height = window.innerHeight;
var group = new THREE.Group();
var group_1 = new THREE.Group();
var group_2 = new THREE.Group();
var group_3 = new THREE.Group();
var loader = new THREE.FontLoader();
var container;
var scene;
var camera;
var renderer;
var text2;
var icon;
var footer;
var menuScetch

var firsRow,secondRow,thirdRow;
var pushY,pushE,pushH,pushZ,pushA,
pushB,pushC,pushI,pushJ,pushD,pushG,pushF,
pushK,pushL,pushM,pushP,pushR,pushS,pushO,pushT,pushU,pushV;

var menuScetchOK = true;
var quaternionBlock = new THREE.Quaternion();
var date;

function init() {

    container = document.createElement("div");
    document.body.appendChild(container);
    container.setAttribute('id', 'container');
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1500);
    renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    
    scene.background = new THREE.Color(0xedeff2);
    renderer.setSize(width, height);
    renderer.domElement.id = "can";
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    text2 = document.createElement('div');
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
    
    icon = document.createElement('div');
    icon.style.position = 'absolute';
    icon.setAttribute('class', 'col-sm-9');
    icon.style.backgroundColor = 'transparent';
    icon.style.left = 50 + 'px';
    icon.style.top = 20 + 'px';
    document.body.appendChild(icon);
    icon.setAttribute('id', 'icon');
    firsRow=document.createElement('div');
    firsRow.setAttribute('id','firstRow');
    icon.appendChild(firsRow);
    secondRow=document.createElement('div');
    secondRow.setAttribute('id','secondRow');
    icon.appendChild(secondRow);
    thirdRow=document.createElement('div');
    thirdRow.setAttribute('id','thirdRow');
    icon.appendChild(thirdRow);


    pushY=document.createElement('img');
    pushY.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Line.png');
    pushY.setAttribute('id','pushY');
    pushY.setAttribute('width','25');
    pushY.setAttribute('height','25');
    pushY.setAttribute('title','Kreślenie lini pushY');
    pushY.style.margin="10px";
    pushI=document.createElement('img');
    pushI.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Wire.png');
    pushI.setAttribute('id','pushI');
    pushI.setAttribute('width','25');
    pushI.setAttribute('height','25');
    pushI.setAttribute('title','Kreślenie multilini pushI');
    pushI.style.margin="5px";
    pushE=document.createElement('img');
    pushE.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Arc.png');
    pushE.setAttribute('id','pushE');
    pushE.setAttribute('width','25');
    pushE.setAttribute('height','25');
    pushE.setAttribute('title','Kreślenie łuku od środka pushE');
    pushE.style.margin="5px";
    pushH=document.createElement('img');
    pushH.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Arc_3Points.png');
    pushH.setAttribute('id','pushH');
    pushH.setAttribute('width','25');
    pushH.setAttribute('height','25');
    pushH.setAttribute('title','Kreślenie łuku z 3 punktów pushH');
    pushH.style.margin="5px";
    pushZ=document.createElement('img');
    pushZ.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Rectangle.png');
    pushZ.setAttribute('id','pushZ');
    pushZ.setAttribute('width','25');
    pushZ.setAttribute('height','25');
    pushZ.setAttribute('title','Kreślenie kwadratu pushZ');
    pushZ.style.margin="5px";
    pushA=document.createElement('img');
    pushA.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Circle.png');
    pushA.setAttribute('id','pushA');
    pushA.setAttribute('width','25');
    pushA.setAttribute('height','25');
    pushA.setAttribute('title','Kreślenie koła pushA');
    pushA.style.margin="5px";
    pushJ=document.createElement('img');
    pushJ.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Ellipse.png');
    pushJ.setAttribute('id','pushJ');
    pushJ.setAttribute('width','25');
    pushJ.setAttribute('height','25');
    pushJ.setAttribute('title','Kreślenie koła pushA');
    pushJ.style.margin="5px";
    pushB=document.createElement('img');
    pushB.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Polygon.png');
    pushB.setAttribute('id','pushB');
    pushB.setAttribute('width','25');
    pushB.setAttribute('height','25');
    pushB.setAttribute('title','Puste pushB');
    pushB.style.margin="5px";
    pushC=document.createElement('img');
    pushC.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Point.png');
    pushC.setAttribute('id','pushC');
    pushC.setAttribute('width','25');
    pushC.setAttribute('height','25');
    pushC.setAttribute('title','Puste pushC');
    pushC.style.margin="5px";
    pushP=document.createElement('img');
    pushP.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Text.png');
    pushP.setAttribute('id','pushP');
    pushP.setAttribute('width','25');
    pushP.setAttribute('height','25');
    pushP.setAttribute('title','Text pushP');
    pushP.style.margin="5px";
    pushS=document.createElement('img');
    pushS.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/continuous-line.png');
    pushS.setAttribute('id','pushS');
    pushS.setAttribute('width','25');
    pushS.setAttribute('height','25');
    pushS.setAttribute('title','Rodzaj i styl lini pushS');
    pushS.style.margin="5px";

    firsRow.appendChild(pushC);
    firsRow.appendChild(pushY);
    firsRow.appendChild(pushI);
    firsRow.appendChild(pushE);
    firsRow.appendChild(pushH);
    firsRow.appendChild(pushZ);
    firsRow.appendChild(pushB);
    firsRow.appendChild(pushA);
    firsRow.appendChild(pushJ);
    firsRow.appendChild(pushP);
    firsRow.appendChild(pushS);
    
    
    pushD=document.createElement('img');
    pushD.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Grid.png');
    pushD.setAttribute('id','pushD');
    pushD.setAttribute('width','25');
    pushD.setAttribute('height','25');
    pushD.setAttribute('title','Włącz siatkę pushD');
    pushD.style.margin="5px";
    pushF=document.createElement('img');
    pushF.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_SwitchMode.png');
    pushF.setAttribute('id','pushF');
    pushF.setAttribute('width','25');
    pushF.setAttribute('height','25');
    pushF.setAttribute('title','Blokowanie płaszczyzny kreślenia pushF');
    pushF.style.margin="5px";
    pushG=document.createElement('img');
    pushG.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/if_info_blue_40801.png');
    pushG.setAttribute('id','pushG');
    pushG.setAttribute('width','25');
    pushG.setAttribute('height','25');
    pushG.setAttribute('title','Puste pushG');
    pushG.style.margin="5px";
    pushK=document.createElement('img');
    pushK.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Array.png');
    pushK.setAttribute('id','pushK');
    pushK.setAttribute('width','25');
    pushK.setAttribute('height','25');
    pushK.setAttribute('title','Kreślenie prostokątnego szyku pushK');
    pushK.style.margin="5px";
    pushL=document.createElement('img');
    pushL.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_VisGroup.png');
    pushL.setAttribute('id','pushL');
    pushL.setAttribute('width','25');
    pushL.setAttribute('height','25');
    pushL.setAttribute('title','Warstwy pushL');
    pushL.style.margin="5px";
    pushM=document.createElement('img');
    pushM.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_CircularArray.png');
    pushM.setAttribute('id','pushM');
    pushM.setAttribute('width','25');
    pushM.setAttribute('height','25');
    pushM.setAttribute('title','Kreślenie cylindrycznego szyku pushM');
    pushM.style.margin="5px";
    pushO=document.createElement('img');
    pushO.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Snap.png');
    pushO.setAttribute('id','pushO');
    pushO.setAttribute('width','25');
    pushO.setAttribute('height','25');
    pushO.setAttribute('title','Orto snap pushO');
    pushO.style.margin="5px";
    pushR=document.createElement('img');
    pushR.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/drawing-spreadsheet.png');
    pushR.setAttribute('id','pushR');
    pushR.setAttribute('width','25');
    pushR.setAttribute('height','25');
    pushR.setAttribute('title','Rysunek pushR');
    pushR.style.margin="5px";
    pushV=document.createElement('img');
    pushV.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Save.png');
    pushV.setAttribute('id','pushV');
    pushV.setAttribute('width','25');
    pushV.setAttribute('height','25');
    pushV.setAttribute('title','Zapisz projekt pushV');
    pushV.style.margin="5px";
    pushB1=document.createElement('img');
    pushB1.setAttribute('src','http://www.cad2d.emsoft.net.pl/icon/Draft_Mirror.png');
    pushB1.setAttribute('id','pushB1');
    pushB1.setAttribute('width','25');
    pushB1.setAttribute('height','25');
    pushB1.setAttribute('title','Lustro pushB1');
    pushB1.style.margin="5px";
    
    secondRow.appendChild(pushL);
    secondRow.appendChild(pushF);
    secondRow.appendChild(pushO);
    secondRow.appendChild(pushD);
    secondRow.appendChild(pushK);
    secondRow.appendChild(pushM);
    secondRow.appendChild(pushB1);
    secondRow.appendChild(pushR);
    secondRow.appendChild(pushV);
    secondRow.appendChild(pushG);
    
    
   
    footer = document.createElement('div');
    footer.style.position = 'absolute';
    footer.setAttribute('id', 'footer');
    footer.setAttribute('class', 'col-sm-12');
    footer.style.bottom = 0 + 'px';
    footer.style.minWidth = "90%";
    footer.style.padding = "35px";
    document.body.appendChild(footer);
    
    $('#footer').append('<div id="footerInput"></div>');
    $('#footerInput').append('<input type="text" class="form-control" id="text1" disabled ></br>');
    $('#footerInput').append('<input type="text" class="form-control" id="text2"></br>');
    $('#footer').append('<div id="footerInfo" class="col-sm-3"><p id="pLine">Brak obiektów</p><p id="pFooter_1"><p id="x">X:</p><p id="y">Y:</p><p id="z">Z:</p></p></div>')
    $('#footer').append('<div id="footerCopright" class="col-sm-3" style="display:inline-block;float:right;"></div>');
    $('#footerCopright').append('<p id="pFooter"></p>');
    
    menuScetch = document.getElementById("menuScetch");
    date = new Date();
    $('#pFooter').html('\251 ' + date.getFullYear() + ' by EmSoft wszelkie prawa zastrzezone <br/><a href="http://www.emsoft.net.pl" target="_blank"><span style="color:#3016dd;"> www.emsoft.net.pl</span></a> <h4 style="color:red"> Strona w przygotowaniu</h4>');
    $('#text1').val('Zablokuj płaszczyżnę do kreślenia');



    var light = new THREE.DirectionalLight(0xffffff, 2);

    light.position.set(10, 10, 1);


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
    plane6 = new THREE.Mesh(geometryP4, materialP4);
    plane6.name = "XY";
    var geometryP5 = new THREE.PlaneGeometry(250, 250, 250);
    var materialP5 = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide, vertexColors: THREE.FaceColors });
    plane7 = new THREE.Mesh(geometryP5, materialP5);
    plane7.name = "YZ";
    var geometryP6 = new THREE.PlaneGeometry(250, 250, 250);
    var materialP6 = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0, side: THREE.DoubleSide, vertexColors: THREE.FaceColors });
    plane8 = new THREE.Mesh(geometryP6, materialP6);
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

    objects.push(plane, plane1, plane2, plane3, plane4, plane5, cylinder, plane6, plane7, plane8);
    p_o.push(plane6, plane7, plane8);

    scene.add(group, group_1, group_2, group_3);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x93969b, 2));

}
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}
