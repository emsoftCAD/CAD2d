/*
 * 
 * function.js
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
*
*-------------------------------------------------------------------------------------------
*
*                  Events
* 
*------------------------------------------------------------------------------------------ 
* 
*/
init();
renderer.domElement.addEventListener("mousedown", onMouseDown);
renderer.domElement.addEventListener("mousemove", onMouseMove, false);
renderer.domElement.addEventListener("mouseup", onMouseUp);
menuScetch.addEventListener("mouseup", onMouseUp);
document.addEventListener("keydown", onKeyDown);
document.addEventListener("wheel", onMouseWheel);
renderer.domElement.addEventListener('contextmenu', contextmenu, false);

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
document.getElementById("pushD").onclick = function () {
    var grid = siatka();
    nD++;
    if (nD == 1) {
        s = true;
        document.getElementById("pushD").style.backgroundColor = "red";
        if (!x)
            group_3.add(grid);
        else if (x)
            grid.setRotationFromEuler(new THREE.Euler(eulerBlock._x - toRadians(90), eulerBlock._y, eulerBlock._z, "ZYX"));
        group_3.add(grid);

    } else {
        s = false;
        document.getElementById("pushD").style.backgroundColor = "transparent";
        clickCanvas = 0;
        nD = 0;
        group_3.remove(group_3.children[0]);
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
    if (nF == 1) {
        x = true;
        document.getElementById("pushF").style.backgroundColor = "red";
        eulerBlock = new THREE.Euler(-group_1.rotation._x, -group_1.rotation._y, -group_1.rotation._z, "ZYX");

    } else {
        x = false;
        document.getElementById("pushF").style.backgroundColor = "transparent";
        clickCanvas = 0;
        nF = 0;
    }
    render();
}
document.getElementById('pushS').onclick=function(){
    var menu = document.getElementById('menuLine');
    if(nS=="0"){
        menu.style.display="block";
    }else{
        menu.style.display="none";
        nS=-1;
    }
    nS++;
    
}
document.getElementsByClassName("menu-item").onclick=function(){
    var menu=document.getElementById("menuScetch");
    var menu1=document.getElementById("menuLine");
    menu.style.display="none";
    menu1.style.display="none";
    nS=0;
    
}



function onMouseDown(e) {
    var menu = document.getElementById('menuLine');
    var menu1 = document.getElementById('menuScetch');
    e.preventDefault();
    if (e.button == 0) {
        planeColor(e);
        raycasterClik();
        menu.style.display="none";
        menu1.style.display="none";
        nS=0;
        menuScetchOK=true;
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
    document.getElementById("x").innerHTML = "X:" + (mouse.x).toFixed(2);
    document.getElementById("y").innerHTML = "Y:" + (mouse.y).toFixed(2);
    document.getElementById("z").innerHTML = "Z:" + (group.position.z / scale).toFixed(2);
}

function mousePosition(e) {
    var mouse = new THREE.Vector2();
    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;
    document.getElementById("x").innerHTML = "X:" + (mouse.x).toFixed(2);
    document.getElementById("y").innerHTML = "Y:" + (mouse.y).toFixed(2);
    document.getElementById("z").innerHTML = "Z:" + (group.position.z / scale).toFixed(2);


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
        document.getElementById("pLine").innerHTML = "Brak zaznaczonych obiektow.";
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
    render();

}

/*
*
*------------------------------------------------------------------------------------------------------
*
*                                       Items
*
*
*-------------------------------------------------------------------------------------------------------
*
*/

function linia(e) {

    mouse.x = (e.clientX - document.getElementById("can").width / 2) / scale;
    mouse.y = (-(e.clientY - document.getElementById("can").height / 2)) / scale;


    var geometryLine = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({
        color: 0x050505
    });
    if (!x) {


        switch (clickCanvas) {
            case 0:
                startLine = new THREE.Vector3(mouse.x, mouse.y, 0);
                break;
            case 1:
                endLine.push(new THREE.Vector3(mouse.x, mouse.y, 0));
                geometryLine.vertices.push(startLine, endLine[clickCanvas]);
                var line = new THREE.Line(geometryLine, material);
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
                if (clickCanvas > 1) {


                    endLine.push(new THREE.Vector3(mouse.x, mouse.y, 0));
                    geometryLine.vertices.push(endLine[clickCanvas - 1], endLine[clickCanvas]);
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
                }
                break;
        }
        clickCanvas++;
        objects.splice(7, objects.length);
        for (var i = 0; i < group_2.children.length; i++) {
            objects.push(group_2.children[i]);
        }
    } else {
        var euler= new THREE.Euler(eulerBlock._x,eulerBlock._y,eulerBlock._z,"ZYX");
        switch (clickCanvas) {
            case 0:
                startLine = intersectBlockPlane(mouse.x, mouse.y);
                break;
            case 1:
                endLineK = intersectBlockPlane(mouse.x, mouse.y);
                endLine.push(endLineK.clone());
                geometryLine.vertices.push(startLine.clone().applyEuler(euler), endLine[clickCanvas].clone().applyEuler(euler));
                var line = new THREE.Line(geometryLine, material);
                line.name = 'lineProba_' + (clickCanvas - 1);
                // line.setRotationFromEuler(eulerBlock)
                // line.rotateZ(-group_1.rotation._z);
                // line.rotateY(-group_1.rotation._y);
                // line.rotateX(-group_1.rotation._x);
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
                if (clickCanvas > 1) {

                    endLineK = intersectBlockPlane(mouse.x, mouse.y);
                    endLine.push(endLineK);
                    geometryLine.vertices.push(endLine[clickCanvas - 1].clone().applyEuler(euler), endLine[clickCanvas].clone().applyEuler(euler));
                    var line = new THREE.Line(geometryLine, material);
                    line.boundingSphere = null;
                    line.name = 'lineProba_' + (clickCanvas - 1);
                    // line.rotateZ(-group_1.rotation._z);
                    // line.rotateY(-group_1.rotation._y);
                    // line.rotateX(-group_1.rotation._x);
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
                }
                break;
        }
        clickCanvas++;
        objects.splice(7, objects.length);
        for (var i = 0; i < group_2.children.length; i++) {
            objects.push(group_2.children[i]);
        }
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
        var euler = new THREE.Euler(eulerBlock._x, eulerBlock._y, eulerBlock._z, "ZYX");

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
    if (!x) {
        switch (clickCanvas) {
            case 1:
                endLineK = new THREE.Vector3(mouse.x, mouse.y, 0);
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
                if (clickCanvas > 1) {
                    endLineK = new THREE.Vector3(mouse.x, mouse.y, 0);
                    geometry.vertices.push(endLine[clickCanvas - 1], endLineK);
                    var line = new THREE.Line(geometry, material);
                    line.rotateZ(-group_1.rotation._z);
                    line.rotateY(-group_1.rotation._y);
                    line.rotateX(-group_1.rotation._x);
                    if (!lineEnd) {
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

                }
                break;
        }
    } else {
        var euler= new THREE.Euler(eulerBlock._x,eulerBlock._y,eulerBlock._z,"ZYX");
        switch (clickCanvas) {
            case 1:
                endLineK = intersectBlockPlane(mouse.x,mouse.y);
                geometry.vertices.push(startLine.clone().applyEuler(euler), endLineK.clone().applyEuler(euler));
                var line = new THREE.Line(geometry, material);
                // line.rotateZ(-group_1.rotation._z);
                // line.rotateY(-group_1.rotation._y);
                // line.rotateX(-group_1.rotation._x);
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
                if (clickCanvas > 1) {
                    endLineK =intersectBlockPlane(mouse.x,mouse.y);
                    geometry.vertices.push(endLine[clickCanvas - 1].clone().applyEuler(euler), endLineK.clone().applyEuler(euler));
                    var line = new THREE.Line(geometry, material);
                    // line.rotateZ(-group_1.rotation._z);
                    // line.rotateY(-group_1.rotation._y);
                    // line.rotateX(-group_1.rotation._x);
                    if (!lineEnd) {
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

                }
                break;
        }
    }
    render();
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

        var euler = new THREE.Euler(eulerBlock._x, eulerBlock._y, eulerBlock._z, "ZYX");

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


        var euler = new THREE.Euler(eulerBlock._x, eulerBlock._y, eulerBlock._z, "ZYX");
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


function siatka() {

    var gridHelper = new THREE.GridHelper(sizeG, divisionsG);
    return gridHelper;
}




/*
*
*------------------------------------------------------------------------------------------------------
*
*                                           Others
*   
*
*------------------------------------------------------------------------------------------------------
*
*/








function intersectBlockPlane(x, y) {
    var euler = new THREE.Euler(eulerBlock._x, eulerBlock._y, eulerBlock._z, "ZYX");
    var m = new THREE.Matrix4().makeRotationFromEuler(euler);
    var m_i = new THREE.Matrix4().getInverse(m);

    var p0 = new THREE.Vector3(x, y, 1000).applyEuler(new THREE.Euler(-group_1.rotation._x, -group_1.rotation._y, -group_1.rotation._z, "ZYX")).applyMatrix4(m_i);
    var p1 = new THREE.Vector3(x, y, -1000).applyEuler(new THREE.Euler(-group_1.rotation._x, -group_1.rotation._y, -group_1.rotation._z, "ZYX")).applyMatrix4(m_i);
    var line = new THREE.Line3(p0, p1);
    var plane = new THREE.Plane().setFromCoplanarPoints(
        new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0)
    );
    return plane.intersectLine(line);
}



function render() {


    renderer.render(scene, camera);
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

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



animate();




