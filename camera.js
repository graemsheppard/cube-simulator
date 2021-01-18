class Camera {
    constructor (p, d) {

        this.position = p;

        // The z-distance from the cameras position to where the resolution is reached
        this.distance = d; 
        this.width = 1024;
        this.height = 576;
    }

    getPerspectivePoint(point) {
        let ratio = this.distance / (this.position.z - point.z);
        let result = point.subtract(this.position).multiply(ratio);
        result.z = point.z;
        return result;
    }
}