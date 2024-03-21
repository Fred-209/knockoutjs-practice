function CounterCardViewModel() {
  const self = this;

  self.counterHeader = "Good Dog Walks Inc."
  self.footerText = ko.observable("Have a tail wagging day!");
  self.firstName = ko.observable("Fred");
  self.count = ko.observable(0);

  self.increase = () => {
    const currentValue = self.count();
    self.count(currentValue + 1);
  }

  self.decrease = () => {
    const currentValue = self.count();
    if (currentValue > 0) {
      self.count(currentValue - 1);
    }
  }

  self.dogStatus = ko.computed(() => {
    const walkCount = self.count();

    if (walkCount === 1) return "UNDERWHELMED";
    if (walkCount === 2) return "LISTENING...";
    if (walkCount >= 3) return "EXCITED";
    return "UPSET";
  })
}

function ToyInventoryViewModel() {
  this.inventoryHeader = ko.observable("Good Dog Walks Inc.");
  this.footerText = ko.observable("Have a tail wagging day!");

  const iconTypes = [
    { icon: "icon-bone", text: "Bone" },
    { icon: "icon-ball", text: "Ball" },
    { icon: "icon-circle", text: "Circle" },
    { icon: "icon-rabbit", text: "Rabbit" },
  ]

  this.inventory = ko.observableArray([

  ]);

  this.addItem = () => {
    const index = Math.floor(Math.random() * iconTypes.length);
    this.inventory.push(iconTypes[index]);
  }

  this.removeItem = (data, event) => {
    const indexToRemove = event.target.getAttribute("item-index");
    this.inventory.splice(indexToRemove, 1);
  }
}
document.addEventListener('DOMContentLoaded', (event) => {
  const counterElement = document.querySelector("#counter-card");
  const inventoryElement = document.querySelector("#toy-inventory-card")
  ko.applyBindings(new CounterCardViewModel(), counterElement);
  ko.applyBindings(new ToyInventoryViewModel(), inventoryElement);
});

