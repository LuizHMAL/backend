class Delivery {
  constructor({ 
    id = null,
    droneId, 
    originId, 
    destinationId, 
    distance = 0, 
    price = 0, 
    createdAt = new Date(), 
    finishedAt = null 
  }) {
    this.id = id;
    this.droneId = droneId;
    this.originId = originId;
    this.destinationId = destinationId;
    this.distance = distance;
    this.price = price;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
  }

  finish() {
    this.finishedAt = new Date();
  }

  updateDistance(distance) {
    this.distance = distance;
  }

  updatePrice(price) {
    this.price = price;
  }
}

module.exports = Delivery;
