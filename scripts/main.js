console.log("Main Loaded!");
var cube = new Cube(100, new Vector(0, 0, 0));
var perspectiveCube = new Cube(100, new Vector(0,0,0));
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
    cube.rotateY(0.25 * Math.PI / 180);
    cube.rotateX(0.25 * Math.PI / 180);
    cube.rotateZ(0.25 * Math.PI / 180);
}

function draw() {

    ctxXY.clearRect(0, 0, cvsXY.width, cvsXY.height);
    ctxXZ.clearRect(0, 0, cvsXZ.width, cvsXZ.height);
    ctxYZ.clearRect(0, 0, cvsYZ.width, cvsYZ.height);
    ctxP.clearRect(0, 0, cvsP.width, cvsP.height);
    
    
    cube.points.forEach(point => {
        
    });

    params = {
        "drawVertices": drawVertices,
        "drawEdges": drawEdges,
        "drawFaces": drawFaces
    };

    cube.drawOrthographic(ctxXY, cvsXY, "x", "y", params);
    cube.drawOrthographic(ctxXZ, cvsXZ, "x", "z", params);
    cube.drawOrthographic(ctxYZ, cvsYZ, "z", "y", params);

    cube.drawPerspective(ctxP, cvsP, camera, "x", "y", params);



    //alert("PAUSED");



}
