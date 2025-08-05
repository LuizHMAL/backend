class Location {
  constructor(name, cartesian_x, cartesian_y) {
    this.id = Math.floor(Math.random() * 100000);
    this.name = name;
    this.cartesian_x = cartesian_x;
    this.cartesian_y = cartesian_y;
  }

  getCoordinates() {
    return { x: this.cartesian_x, y: this.cartesian_y };
  }

  setCoordinates(cartesian_x, cartesian_y) {
    this.cartesian_x = cartesian_x;
    this.cartesian_y = cartesian_y;
  }

  toDatabaseArray() {
    return [this.name, this.cartesian_x, this.cartesian_y];
  }
}

module.exports = Location;
