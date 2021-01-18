console.log("Main Loaded!");

var cube1 = new Cube(100, new Vector(0, 0, 0));
var cube2 = new Cube(25, new Vector(100, 50, 75));
var camera = new Camera(new Vector(0, 0, 250), 500);

var drawVertices = true;
var drawEdges = true;
var drawFaces = true;

var drawVerticesCheckbox = document.getElementById("draw-vertices");
drawVerticesCheckbox.addEventListener("change", (e) => {
    drawVertices = drawVerticesCheckbox.checked;
});

var drawEdgesCheckbox = document.getElementById("draw-edges");
drawEdgesCheckbox.addEventListener("change", (e) => {
    drawEdges = drawEdgesCheckbox.checked;
});

var drawFacesCheckbox = document.getElementById("draw-faces");
drawFacesCheckbox.addEventListener("change", (e) => {
    drawFaces = drawFacesCheckbox.checked;
});

var cameraOffsetSliderX = document.getElementById("camera-offset-x");
cameraOffsetSliderX.addEventListener("input", (e) => {
    camera.position.x = cameraOffsetSliderX.value;
});

var cameraOffsetSliderY = document.getElementById("camera-offset-y");
cameraOffsetSliderY.addEventListener("input", (e) => {
    camera.position.y = cameraOffsetSliderY.value;
});

var cameraOffsetSliderZ = document.getElementById("camera-offset-z");
cameraOffsetSliderZ.addEventListener("input", (e) => {
    camera.position.z = cameraOffsetSliderZ.value;
});

cvsXY = document.getElementById("cvs-xy");
ctxXY = cvsXY.getContext("2d");
ctxXY.fillStyle = "black";
cvsXZ = document.getElementById("cvs-xz");
ctxXZ = cvsXZ.getContext("2d");
ctxXZ.fillStyle = "black";
cvsYZ = document.getElementById("cvs-yz");
ctxYZ = cvsYZ.getContext("2d");
ctxYZ.fillStyle = "black";
cvsP = document.getElementById("cvs-p");
ctxP = cvsP.getContext("2d");
ctxP.fillStyle = "black";


setInterval(update, 1000 / 60);

function update() {
    draw();
    cube1.rotateY(2.5 * Math.PI / 180);
    cube1.rotateX(1 * Math.PI / 180);
    cube1.rotateZ(0.25 * Math.PI / 180);
    cube2.rotateY(0.1 * Math.PI / 180);
    cube2.rotateX(0.5 * Math.PI / 180);
    cube2.rotateZ(3 * Math.PI / 180);
}

function draw() {

    ctxXY.clearRect(0, 0, cvsXY.width, cvsXY.height);
    ctxXZ.clearRect(0, 0, cvsXZ.width, cvsXZ.height);
    ctxYZ.clearRect(0, 0, cvsYZ.width, cvsYZ.height);
    ctxP.clearRect(0, 0, cvsP.width, cvsP.height);

    // draw gradient
    var grd = ctxP.createLinearGradient(0, 0, 0, cvsP.width);
    grd.addColorStop(0.25, "white");
    grd.addColorStop(1, "#505060");
    ctxP.fillStyle = grd;
    ctxP.fillRect(0, 0, cvsP.width, cvsP.height);

    params = {
        "drawVertices": drawVertices,
        "drawEdges": drawEdges,
        "drawFaces": drawFaces
    };

    cube1.drawOrthographic(ctxXY, cvsXY, "x", "y", params);
    cube1.drawOrthographic(ctxXZ, cvsXZ, "x", "z", params);
    cube1.drawOrthographic(ctxYZ, cvsYZ, "z", "y", params);
    cube1.drawPerspective(ctxP, cvsP, camera, "x", "y", params);
    cube2.drawOrthographic(ctxXY, cvsXY, "x", "y", params);
    cube2.drawOrthographic(ctxXZ, cvsXZ, "x", "z", params);
    cube2.drawOrthographic(ctxYZ, cvsYZ, "z", "y", params);
    cube2.drawPerspective(ctxP, cvsP, camera, "x", "y", params);




    //alert("PAUSED");



}
