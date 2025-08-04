    class Drone{ 
        constructor(
            model,
            battery,
            location,
            status,
            capacity,
            distance) {
            this.model = model;
            this.battery = battery;
            this.location = location;
            this.status = status;
            this.capacity = capacity;
            this.distance = distance;
        }
       canCarry(weight) { 
           return weight <= this.capacity;
       }        
       isAvailable() {
           return this.status === 'available';
       }
       isCharging() {
           return this.status === 'charging';
       }
       startCharging() {
           if (this.isAvailable() && this.battery < 20) {
               this.status = 'charging';
               console.log(`Drone ${this.model} is now charging.`);
           } else {
               console.log(`Drone ${this.model} cannot start charging while ${this.status}.`);
           }
       }
       startDelivery() {
           if (this.isAvailable()) {
               this.status = 'delivering';
               console.log(`Drone ${this.model} has started the delivery.`);
           } else {
               console.log(`Drone ${this.model} is not available for delivery.`);
           }
       }
    }
    module.exports = Drone;