class CounterCardViewModel {
  constructor() {
    this.counterHeader = "Good Dog Walks Inc."
    this.footerText = ko.observable("Have a tail wagging day!");
    this.firstName = ko.observable("Fred");
    this.count = ko.observable(0);
    this.dogStatus = this.computeDogStatus()
  }

  computeDogStatus() {
    return ko.computed(() => {
      const walkCount = this.count();

      if (walkCount === 1) return "UNDERWHELMED";
      if (walkCount === 2) return "LISTENING...";
      if (walkCount >= 3) return "EXCITED";
      return "UPSET";
    })
  }

  increase = () => {
    const currentValue = this.count();
    this.count(currentValue + 1);
  }

  decrease = () => {
    const currentValue = this.count();
    if (currentValue > 0) {
      this.count(currentValue - 1);
    }
  }
}

class ToyInventoryViewModel {

  static iconTypes = [
    { icon: "icon-bone", text: "Bone" },
    { icon: "icon-ball", text: "Ball" },
    { icon: "icon-circle", text: "Circle" },
    { icon: "icon-rabbit", text: "Rabbit" },
  ];

  constructor() {
    this.inventoryHeader = ko.observable("Good Dog Walks Inc.");
    this.footerText = ko.observable("Have a tail wagging day!");
    this.inventory = ko.observableArray([]);
  }

  addItem() {
    const index = Math.floor(Math.random() * this.iconTypes.length);
    this.inventory.push(this.iconTypes[index]);
  }

  removeItem(data, event) {
    const indexToRemove = event.target.getAttribute("item-index");
    this.inventory.splice(indexToRemove, 1);
  }

  get iconTypes() {
    return ToyInventoryViewModel.iconTypes;
  }
}


class FormViewModel {
  constructor() {
    this.formHeader = ko.observable("Good Dog Walks Inc.");
    this.footerText = ko.observable("Have a tail wagging day!");
    this.firstName = ko.observable("").extend({
      required: true,
      minLength: 2,
      maxLength: 20,
      // validation: {
      //   message: "Please enter at least 2 characters",
      //   validator: (value) => {
      //     return value.length > 1;
      //   }
      // }
    });
    this.firstName.subscribe((newValue => {
      console.log('new value: ', newValue);
    }));
    this.emailAddress = ko.observable("").extend({
      required: true,
      email: true,
    });
    this.subscriptionType = ko.observable("standard");
    this.hasBeenSubmitted = ko.observable(false);
  }

  handleSubmit() {
    const errors = ko.validation.group(this);
    if (errors().length > 0) {
      console.log('there are errors');
      errors.showAllMessages();
      return;
    }

    console.log("Submitting the form")
    const payload = {
      firstName: this.firstName(),
      emailAddress: this.emailAddress(),
      subscriptionType: this.subscriptionType(),
    }
    console.log(payload);
    this.hasBeenSubmitted(true);
  }


}

document.addEventListener('DOMContentLoaded', (event) => {
  const counterElement = document.querySelector("#counter-card");
  const inventoryElement = document.querySelector("#toy-inventory-card")
  const formElement = document.querySelector("#form-card")

  ko.applyBindings(new CounterCardViewModel(), counterElement);
  ko.applyBindings(new ToyInventoryViewModel(), inventoryElement);
  ko.applyBindings(new FormViewModel(), formElement);
});

