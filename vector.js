console.log("Vector Loaded!");

class Vector {

    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }



    copy() {
        return new Vector(this.x, this.y, this.z);
    }

    // Basic math

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    multiply(k) {
        return new Vector(this.x * k, this.y * k, this.z * k);
    }

    divide(k) {
        return new Vector(this.x / k, this.y / k, this.z / k);
    }

    // Vector math

    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2))
    }

    norm() {
        let m = this.magnitude();
        return new Vector(this.x / m, this.y / m, this.z / m);
    }

    cross(v) {
        let result = new Vector();
        result.x = this.y * v.z - this.z * v.y;
        result.y = this.z * v.x - this.x * v.z;
        result.z = this.x * v.y - this.y * v.x;
        return result;
    }

    rotateY (theta) {
        let newX = Math.cos(theta) * this.x + Math.sin(theta) * this.z;
        let newZ = -Math.sin(theta) * this.x + Math.cos(theta) * this.z;
        return new Vector(newX, this.y, newZ);
    }

    rotateX (theta) {
        let newY = Math.cos(theta) * this.y - Math.sin(theta) * this.z;
        let newZ = Math.sin(theta) * this.y + Math.cos(theta) * this.z;
        return new Vector(this.x, newY, newZ);
    }

    rotateZ (theta) {
        let newX = Math.cos(theta) * this.x - Math.sin(theta) * this.y;
        let newY = Math.sin(theta) * this.x + Math.cos(theta) * this.y;
        return new Vector(newX, newY, this.z);
    }


}