class Drone {
  constructor({
    id = null,
    model,
    capacity,
    distance,
    location_x = 0,
    location_y = 0
  }) {
    this.id = id;
    this.model = model;
    this.battery = 100;          
    this.status = 'available';    
    this.capacity = capacity;
    this.distance = distance;
    this.location_x = location_x;
    this.location_y = location_y;
  }

  updateLocation(x, y) {
    this.location_x = x;
    this.location_y = y;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  }

  toDatabaseArray() {
    return [
      this.model,
      this.battery,
      this.status,
      this.capacity,
      this.location_x,
      this.location_y,
      this.distance
    ];
  }
}

module.exports = Drone;
