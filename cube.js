class Cube {
    constructor (w, p) {


        this.rotationY = 0;
        this.position = p;
        this.width = w;
        this.validDistance = Math.sqrt(3 * Math.pow(this.width / 2, 2));
        this.forward = new Vector(0, 0, 1);
        this.up = new Vector(0, 1, 0);
        this.left = new Vector(1, 0, 0); // relative to forward


    }

    rotateY (theta) {
        this.forward = this.forward.rotateY(theta).norm();
        this.up = this.up.rotateY(theta).norm();
        this.left = this.left.rotateY(theta).norm();
    }

    rotateX (theta) {
        this.forward = this.forward.rotateX(theta).norm();
        this.up = this.up.rotateX(theta).norm();
        this.left = this.left.rotateX(theta).norm();
    }

    rotateZ (theta) {
        this.forward = this.forward.rotateZ(theta).norm();
        this.up = this.up.rotateZ(theta).norm();
        this.left = this.left.rotateZ(theta).norm();
    }

    _getPoints () {
        let points = [
            // front points
            this.position.add(this.forward.multiply(this.width/2))
                         .add(this.left.multiply(-this.width/2))
                         .add(this.up.multiply(-this.width/2)),
            this.position.add(this.forward.multiply(this.width/2))
                         .add(this.left.multiply(this.width/2))
                         .add(this.up.multiply(-this.width/2)),
            this.position.add(this.forward.multiply(this.width/2))
                         .add(this.left.multiply(-this.width/2))
                         .add(this.up.multiply(this.width/2)),
            this.position.add(this.forward.multiply(this.width/2))
                         .add(this.left.multiply(this.width/2))
                         .add(this.up.multiply(this.width/2)),

            // back points
            this.position.add(this.forward.multiply(-this.width/2))
                         .add(this.left.multiply(-this.width/2))
                         .add(this.up.multiply(-this.width/2)),
            this.position.add(this.forward.multiply(-this.width/2))
                         .add(this.left.multiply(this.width/2))
                         .add(this.up.multiply(-this.width/2)),
            this.position.add(this.forward.multiply(-this.width/2))
                         .add(this.left.multiply(-this.width/2))
                         .add(this.up.multiply(this.width/2)),
            this.position.add(this.forward.multiply(-this.width/2))
                         .add(this.left.multiply(this.width/2))
                         .add(this.up.multiply(this.width/2)),
        ];
        return points;
    }

    // takes 4 corners and return the normal to the contained surface
    _getFaceNorm(points) {
       let v1 = points[2].subtract(points[0]);
       let v2 = points[1].subtract(points[0]);
       let n = v2.cross(v1);
       return n.norm();

    }

    drawOrthographic(ctx, cvs, axisA, axisB, params) {
        let points = this._getPoints();
        if (params.drawVertices)
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(cvs.width / 2 + point[axisA], cvs.height / 2 + point[axisB], 4, 0, 2 * Math.PI);
            ctx.fill();
        });

        if (params.drawEdges) {
            ctx.beginPath();
            ctx.moveTo(cvs.width / 2 + points[0][axisA], cvs.height / 2 + points[0][axisB]);
            ctx.lineTo(cvs.width / 2 + points[1][axisA], cvs.height / 2 + points[1][axisB]);
            ctx.lineTo(cvs.width / 2 + points[3][axisA], cvs.height / 2 + points[3][axisB]);
            ctx.lineTo(cvs.width / 2 + points[2][axisA], cvs.height / 2 + points[2][axisB]);
            ctx.lineTo(cvs.width / 2 + points[0][axisA], cvs.height / 2 + points[0][axisB]);
            ctx.lineTo(cvs.width / 2 + points[4][axisA], cvs.height / 2 + points[4][axisB]);
            ctx.lineTo(cvs.width / 2 + points[5][axisA], cvs.height / 2 + points[5][axisB]);
            ctx.lineTo(cvs.width / 2 + points[7][axisA], cvs.height / 2 + points[7][axisB]);
            ctx.lineTo(cvs.width / 2 + points[6][axisA], cvs.height / 2 + points[6][axisB]);
            ctx.lineTo(cvs.width / 2 + points[4][axisA], cvs.height / 2 + points[4][axisB]);
            ctx.moveTo(cvs.width / 2 + points[5][axisA], cvs.height / 2 + points[5][axisB]);
            ctx.lineTo(cvs.width / 2 + points[1][axisA], cvs.height / 2 + points[1][axisB]);
            ctx.moveTo(cvs.width / 2 + points[6][axisA], cvs.height / 2 + points[6][axisB]);
            ctx.lineTo(cvs.width / 2 + points[2][axisA], cvs.height / 2 + points[2][axisB]);
            ctx.moveTo(cvs.width / 2 + points[7][axisA], cvs.height / 2 + points[7][axisB]);
            ctx.lineTo(cvs.width / 2 + points[3][axisA], cvs.height / 2 + points[3][axisB]);
            ctx.stroke();

            
        }

        if (params.drawFaces) {


            let faceFront = [points[0], points[1], points[3], points[2]];
            let faceBack = [points[5], points[4], points[6], points[7]];
            let faceLeft = [points[4], points[0], points[2], points[6]];
            let faceRight = [points[1], points[5], points[7], points[3]];
            let faceTop = [points[0], points[4], points[5], points[1]];
            let faceBottom = [points[2], points[3], points[7], points[6]];

            let axes = ["x", "y", "z"];
            var axisC = axes.filter(function(e) { return e !== axisA && e !== axisB})[0];

            ctx.globalAlpha = 0.8;

            if (this._getFaceNorm(faceFront)[axisC] > 0) {
                // front face
                
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + points[0][axisA], cvs.height / 2 + points[0][axisB]);
                ctx.lineTo(cvs.width / 2 + points[1][axisA], cvs.height / 2 + points[1][axisB]);
                ctx.lineTo(cvs.width / 2 + points[3][axisA], cvs.height / 2 + points[3][axisB]);
                ctx.lineTo(cvs.width / 2 + points[2][axisA], cvs.height / 2 + points[2][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceLeft)[axisC] > 0) {
                // left face
                ctx.fillStyle = "yellow";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + points[0][axisA], cvs.height / 2 + points[0][axisB]);
                ctx.lineTo(cvs.width / 2 + points[4][axisA], cvs.height / 2 + points[4][axisB]);
                ctx.lineTo(cvs.width / 2 + points[6][axisA], cvs.height / 2 + points[6][axisB]);
                ctx.lineTo(cvs.width / 2 + points[2][axisA], cvs.height / 2 + points[2][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceTop)[axisC] > 0) {
                // top face
                ctx.fillStyle = "blue";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + points[0][axisA], cvs.height / 2 + points[0][axisB]);
                ctx.lineTo(cvs.width / 2 + points[1][axisA], cvs.height / 2 + points[1][axisB]);
                ctx.lineTo(cvs.width / 2 + points[5][axisA], cvs.height / 2 + points[5][axisB]);
                ctx.lineTo(cvs.width / 2 + points[4][axisA], cvs.height / 2 + points[4][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceRight)[axisC] > 0) {
                // right face
                ctx.fillStyle = "purple";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + points[1][axisA], cvs.height / 2 + points[1][axisB]);
                ctx.lineTo(cvs.width / 2 + points[3][axisA], cvs.height / 2 + points[3][axisB]);
                ctx.lineTo(cvs.width / 2 + points[7][axisA], cvs.height / 2 + points[7][axisB]);
                ctx.lineTo(cvs.width / 2 + points[5][axisA], cvs.height / 2 + points[5][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceBottom)[axisC] > 0) {
                // bottom face
                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + points[2][axisA], cvs.height / 2 + points[2][axisB]);
                ctx.lineTo(cvs.width / 2 + points[3][axisA], cvs.height / 2 + points[3][axisB]);
                ctx.lineTo(cvs.width / 2 + points[7][axisA], cvs.height / 2 + points[7][axisB]);
                ctx.lineTo(cvs.width / 2 + points[6][axisA], cvs.height / 2 + points[6][axisB]);
                ctx.fill();
            }

            if (this._getFaceNorm(faceBack)[axisC] > 0) {
                // back face
                ctx.fillStyle = "green";
                ctx.beginPath();
                ctx.moveTo(cvs.width / 2 + points[4][axisA], cvs.height / 2 + points[4][axisB]);
                ctx.lineTo(cvs.width / 2 + points[5][axisA], cvs.height / 2 + points[5][axisB]);
                ctx.lineTo(cvs.width / 2 + points[7][axisA], cvs.height / 2 + points[7][axisB]);
                ctx.lineTo(cvs.width / 2 + points[6][axisA], cvs.height / 2 + points[6][axisB]);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.fillStyle = "black";
        }
        
        



    }

    drawPerspective(ctx, cvs, camera, axisA, axisB, params) {

        
        ctx.fillStyle = "black";

        let perspectivePoints = [];
        this._getPoints().forEach((point, key) => {
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