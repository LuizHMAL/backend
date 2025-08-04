class Location{
    constructor(
        name,
        latitude,
        longitude,
        obstacle_x,
        obstacle_y) {
        this.id = Math.floor(Math.random() * 100000); 
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.obstacle_x = obstacle_x;
        this.obstacle_y = obstacle_y;
    }

    getCoordinates() {
        return { latitude: this.latitude, longitude: this.longitude };
    }

    setCoordinates(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
    module.exports = Location;