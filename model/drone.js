class Drone {
  constructor({
    id = null,
    model,
    battery = 100,
    status = 'available',
    capacity,
    distance,
    priority = null,
    location_x = 0,
    location_y = 0
  }) {
    this.id = id;
    this.model = model;
    this.battery = battery;
    this.status = status;
    this.capacity = capacity;
    this.distance = distance;
    this.priority = priority;
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
      this.distance,
      this.priority
    ];
  }
}

module.exports = Drone;
