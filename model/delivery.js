class Delivery {
  constructor({ 
    id = null,
    droneId, 
    destinationId,

    originLocationX,
    originLocationY,
    destinationCartesianX,
    destinationCartesianY,

    distance = 0, 
    price = 0, 
    priority = null,
    createdAt = new Date(), 
    finishedAt = null 
  }) {
    this.id = id;
    this.droneId = droneId;
    this.destinationId = destinationId;

    this.originLocationX = originLocationX;
    this.originLocationY = originLocationY;
    this.destinationCartesianX = destinationCartesianX;
    this.destinationCartesianY = destinationCartesianY;

    this.distance = distance;
    this.price = price;
    this.priority = priority;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
  }

  toDatabaseArray() {
    return [
      this.droneId,
      this.destinationId,
      this.originLocationX,
      this.originLocationY,
      this.destinationCartesianX,
      this.destinationCartesianY,
      this.distance,
      this.price,
      this.priority
    ];
  }
}
module.exports = Delivery;