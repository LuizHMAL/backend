    class Drone{ 
        constructor(model, battery, location, status, capacity) {
            this.model = model;
            this.battery = battery;
            this.location = location;
            this.status = status;
            this.capacity = capacity;
        }
        toFly(weight) {
            if (this.battery > 20 && this.status === 'available' && this.capacity > weight) {
                this.status = 'flying';
                console.log(`Drone ${this.model} is now flying.`);
            } else {
                console.log(`Drone ${this.model} cannot fly. Check battery or status.`);
            }
        }

    }
    module.exports = Drone;