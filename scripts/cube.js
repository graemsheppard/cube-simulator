class Cube {
    constructor (w, p) {


        this.rotationY = 0;
        this.position = p;
        this.width = w;
        this.validDistance = Math.sqrt(3 * Math.pow(this.width / 2, 2));

        this.points = [
            // front points
            new Vector (p.x - w/2, p.y - w/2,  p.z + w/2),  // bottom left
            new Vector (p.x + w/2, p.y - w/2,  p.z + w/2),  // bottom right
            new Vector (p.x - w/2, p.y + w/2,  p.z + w/2),  // top left
            new Vector (p.x + w/2, p.y + w/2,  p.z + w/2),  // top right
            // back points
            new Vector (p.x - w/2, p.y - w/2,  p.z - w/2),  // bottom left
            new Vector (p.x + w/2, p.y - w/2,  p.z - w/2),  // bottom right
            new Vector (p.x - w/2, p.y + w/2,  p.z - w/2),  // top left
            new Vector (p.x + w/2, p.y + w/2,  p.z - w/2)  // top right
        ]

    }

    rotateY (theta) {
        //this.rotationY += theta;
        this.points.forEach((point, key) => {
            point = point.subtract(this.position);
            point.x = Math.cos(theta) * point.x + Math.sin(theta) * point.z;
            point.z = -Math.sin(theta) * point.x + Math.cos(theta) * point.z;
            point = point.add(this.position);
            this.points[key] = point;
        });
        this._validatePoints();
    }

    rotateX (theta) {
        //this.rotationY += theta;
        this.points.forEach((point, key) => {
            point = point.subtract(this.position);
            point.y = Math.cos(theta) * point.y - Math.sin(theta) * point.z;
            point.z = Math.sin(theta) * point.y + Math.cos(theta) * point.z;
            point = point.add(this.position);
            this.points[key] = point;
        });
        this._validatePoints();
    }

    rotateZ (theta) {
        //this.rotationY += theta;
        this.points.forEach((point, key) => {
            point = point.subtract(this.position);
            point.x = Math.cos(theta) * point.x - Math.sin(theta) * point.y;
            point.y = Math.sin(theta) * point.x + Math.cos(theta) * point.y;
            point = point.add(this.position);
            this.points[key] = point;
        });
        this._validatePoints();
    }

    _validatePoints() {
        this.points.forEach((point, key) => {
            let norm = point.subtract(this.position).norm();
            point = norm.multiply(this.validDistance);
            this.points[key] = point;

        });
    }

    // takes 4 corners and return the normal to the contained surface
    _getFaceNorm(points) {
        /*
        let total = new Vector(0,0,0);
        points.forEach((point) => {
            total = total.add(point);
        });
        let direction = total.subtract(this.position);
        return direction.norm();
        */
       let v1 = points[2].subtract(points[0]);
       let v2 = points[1].subtract(points[0]);

       let n = v2.cross(v1);

       return n.norm();

    }

    drawOrthographic(ctx, cvs, axisA, axisB, params) {

        if (params.drawVertices)
        this.points.forEach(point => {
            ctx.beginPath();
            ctx.arc(cvs.width / 2 + point[axisA], cvs.height / 2 + point[axisB], 4, 0, 2 * Math.PI);
            ctx.fill();
        });

        if (params.drawEdges) {
            ctx.beginPath();
            ctx.moveTo(cvs.width / 2 + this.points[0][axisA], cvs.height / 2 + this.points[0][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[1][axisA], cvs.height / 2 + this.points[1][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[3][axisA], cvs.height / 2 + this.points[3][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[2][axisA], cvs.height / 2 + this.points[2][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[0][axisA], cvs.height / 2 + this.points[0][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[4][axisA], cvs.height / 2 + this.points[4][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[5][axisA], cvs.height / 2 + this.points[5][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[7][axisA], cvs.height / 2 + this.points[7][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[6][axisA], cvs.height / 2 + this.points[6][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[4][axisA], cvs.height / 2 + this.points[4][axisB]);
            ctx.moveTo(cvs.width / 2 + this.points[5][axisA], cvs.height / 2 + this.points[5][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[1][axisA], cvs.height / 2 + this.points[1][axisB]);
            ctx.moveTo(cvs.width / 2 + this.points[6][axisA], cvs.height / 2 + this.points[6][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[2][axisA], cvs.height / 2 + this.points[2][axisB]);
            ctx.moveTo(cvs.width / 2 + this.points[7][axisA], cvs.height / 2 + this.points[7][axisB]);
            ctx.lineTo(cvs.width / 2 + this.points[3][axisA], cvs.height / 2 + this.points[3][axisB]);
            ctx.stroke();

            
        }

        if (params.drawFaces) {


            let faceFront = [this.points[0], this.points[1], this.points[3], this.points[2]];
            let faceBack = [this.points[5], this.points[4], this.points[6], this.points[7]];
            let faceLeft = [this.points[4], this.points[0], this.points[2], this.points[6]];
            let faceRight = [this.points[1], this.points[5], this.points[7], this.points[3]];
            let faceTop = [this.points[0], this.points[4], this.points[5], this.points[1]];
            let faceBottom = [this.points[2], this.points[3], this.points[7], this.points[6]];

            let axes = ["x", "y", "z"];
            var axisC = axes.filter(function(e) { return e !== axisA && e !== axisB})[0];

            ctx.globalAlpha = 0.8;

            if (this._getFaceNorm(faceFront)[axisC] > 0) {
                // front face
                
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + this.points[0][axisA], cvs.height / 2 + this.points[0][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[1][axisA], cvs.height / 2 + this.points[1][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[3][axisA], cvs.height / 2 + this.points[3][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[2][axisA], cvs.height / 2 + this.points[2][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceLeft)[axisC] > 0) {
                // left face
                ctx.fillStyle = "yellow";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + this.points[0][axisA], cvs.height / 2 + this.points[0][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[4][axisA], cvs.height / 2 + this.points[4][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[6][axisA], cvs.height / 2 + this.points[6][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[2][axisA], cvs.height / 2 + this.points[2][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceTop)[axisC] > 0) {
                // top face
                ctx.fillStyle = "blue";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + this.points[0][axisA], cvs.height / 2 + this.points[0][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[1][axisA], cvs.height / 2 + this.points[1][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[5][axisA], cvs.height / 2 + this.points[5][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[4][axisA], cvs.height / 2 + this.points[4][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceRight)[axisC] > 0) {
                // right face
                ctx.fillStyle = "purple";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + this.points[1][axisA], cvs.height / 2 + this.points[1][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[3][axisA], cvs.height / 2 + this.points[3][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[7][axisA], cvs.height / 2 + this.points[7][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[5][axisA], cvs.height / 2 + this.points[5][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceBottom)[axisC] > 0) {
                // bottom face
                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + this.points[2][axisA], cvs.height / 2 + this.points[2][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[3][axisA], cvs.height / 2 + this.points[3][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[7][axisA], cvs.height / 2 + this.points[7][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[6][axisA], cvs.height / 2 + this.points[6][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceBack)[axisC] > 0) {
                // back face
                ctx.fillStyle = "green";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + this.points[4][axisA], cvs.height / 2 + this.points[4][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[5][axisA], cvs.height / 2 + this.points[5][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[7][axisA], cvs.height / 2 + this.points[7][axisB]);
                ctx.lineTo(cvs.width / 2 + this.points[6][axisA], cvs.height / 2 + this.points[6][axisB]);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.fillStyle = "black";
        }
        
        



    }

    drawPerspective(ctx, cvs, camera, axisA, axisB, params) {

        var grd = ctx.createLinearGradient(0, 0, 0, cvs.width);

        grd.addColorStop(0.25, "white");
        grd.addColorStop(1, "#505060");

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.fillStyle = "black";

        let perspectivePoints = [];
        this.points.forEach((point, key) => {
            perspectivePoints[key] = camera.getPerspectivePoint(point);
        });

        if (params.drawVertices) {
            perspectivePoints.forEach(point => {
                ctx.beginPath();
                ctx.arc(cvs.width / 2 + point[axisA], cvs.height / 2 + point[axisB], 4, 0, 2 * Math.PI);
                ctx.fill();
            });
        }



        if (params.drawEdges) {
            ctx.beginPath();
            ctx.moveTo(cvs.width / 2 + perspectivePoints[0][axisA], cvs.height / 2 + perspectivePoints[0][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[1][axisA], cvs.height / 2 + perspectivePoints[1][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[3][axisA], cvs.height / 2 + perspectivePoints[3][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[2][axisA], cvs.height / 2 + perspectivePoints[2][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[0][axisA], cvs.height / 2 + perspectivePoints[0][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[4][axisA], cvs.height / 2 + perspectivePoints[4][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[5][axisA], cvs.height / 2 + perspectivePoints[5][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[7][axisA], cvs.height / 2 + perspectivePoints[7][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[6][axisA], cvs.height / 2 + perspectivePoints[6][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[4][axisA], cvs.height / 2 + perspectivePoints[4][axisB]);
            ctx.moveTo(cvs.width / 2 + perspectivePoints[5][axisA], cvs.height / 2 + perspectivePoints[5][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[1][axisA], cvs.height / 2 + perspectivePoints[1][axisB]);
            ctx.moveTo(cvs.width / 2 + perspectivePoints[6][axisA], cvs.height / 2 + perspectivePoints[6][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[2][axisA], cvs.height / 2 + perspectivePoints[2][axisB]);
            ctx.moveTo(cvs.width / 2 + perspectivePoints[7][axisA], cvs.height / 2 + perspectivePoints[7][axisB]);
            ctx.lineTo(cvs.width / 2 + perspectivePoints[3][axisA], cvs.height / 2 + perspectivePoints[3][axisB]);
            ctx.stroke();
        }
        
        if (params.drawFaces) {
            ctx.globalAlpha = 0.8;

            let faceFront = [perspectivePoints[0], perspectivePoints[1], perspectivePoints[3], perspectivePoints[2]];
            let faceBack = [perspectivePoints[5], perspectivePoints[4], perspectivePoints[6], perspectivePoints[7]];
            let faceLeft = [perspectivePoints[4], perspectivePoints[0], perspectivePoints[2], perspectivePoints[6]];
            let faceRight = [perspectivePoints[1], perspectivePoints[5], perspectivePoints[7], perspectivePoints[3]];
            let faceTop = [perspectivePoints[0], perspectivePoints[4], perspectivePoints[5], perspectivePoints[1]];
            let faceBottom = [perspectivePoints[2], perspectivePoints[3], perspectivePoints[7], perspectivePoints[6]];

            let axes = ["x", "y", "z"];
            var axisC = axes.filter(function(e) { return e !== axisA && e !== axisB})[0];

            if (this._getFaceNorm(faceFront)[axisC] > 0) {
                // front face
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + perspectivePoints[0][axisA], cvs.height / 2 + perspectivePoints[0][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[1][axisA], cvs.height / 2 + perspectivePoints[1][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[3][axisA], cvs.height / 2 + perspectivePoints[3][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[2][axisA], cvs.height / 2 + perspectivePoints[2][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceLeft)[axisC] > 0) {
                // left face
                ctx.fillStyle = "yellow";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + perspectivePoints[0][axisA], cvs.height / 2 + perspectivePoints[0][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[4][axisA], cvs.height / 2 + perspectivePoints[4][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[6][axisA], cvs.height / 2 + perspectivePoints[6][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[2][axisA], cvs.height / 2 + perspectivePoints[2][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceTop)[axisC] > 0) {
                // top face
                ctx.fillStyle = "blue";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + perspectivePoints[0][axisA], cvs.height / 2 + perspectivePoints[0][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[1][axisA], cvs.height / 2 + perspectivePoints[1][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[5][axisA], cvs.height / 2 + perspectivePoints[5][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[4][axisA], cvs.height / 2 + perspectivePoints[4][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceRight)[axisC] > 0) { 
                // right face
                ctx.fillStyle = "purple";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + perspectivePoints[1][axisA], cvs.height / 2 + perspectivePoints[1][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[3][axisA], cvs.height / 2 + perspectivePoints[3][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[7][axisA], cvs.height / 2 + perspectivePoints[7][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[5][axisA], cvs.height / 2 + perspectivePoints[5][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceBottom)[axisC] > 0) {
                // bottom face
                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + perspectivePoints[2][axisA], cvs.height / 2 + perspectivePoints[2][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[3][axisA], cvs.height / 2 + perspectivePoints[3][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[7][axisA], cvs.height / 2 + perspectivePoints[7][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[6][axisA], cvs.height / 2 + perspectivePoints[6][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceBack)[axisC] > 0) {
                // back face
                ctx.fillStyle = "green";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + perspectivePoints[4][axisA], cvs.height / 2 + perspectivePoints[4][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[5][axisA], cvs.height / 2 + perspectivePoints[5][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[7][axisA], cvs.height / 2 + perspectivePoints[7][axisB]);
                ctx.lineTo(cvs.width / 2 + perspectivePoints[6][axisA], cvs.height / 2 + perspectivePoints[6][axisB]);
                ctx.fill();
            }

            ctx.fillStyle = "black";
            ctx.globalAlpha = 1;
        }

        

        

    }
}