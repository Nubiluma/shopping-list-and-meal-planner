class shoppingItem {
  constructor(name, quantity, bought) {
    this.name = name;
    this.quantity = quantity;
    this.bought = bought;
  }
}

Vue.createApp({
  data() {
    return {
      shoppingListItems: [],
      newItem: "",
      newItemQuantity: 0,
      quantityMeasurement: "Pieces",
    };
  },
  mounted() {
    const listItems = localStorage.getItem("shoppingListItems");
    if (listItems) {
      this.shoppingListItems = JSON.parse(listItems);
    }
  },
  methods: {
    updateLocalStorage() {
      localStorage.setItem(
        "shoppingListItems",
        JSON.stringify(this.shoppingListItems)
      );
    },
    addNewListItem() {
      if (this.newItem.length > 0) {
        const item = new shoppingItem(
          this.newItem,
          this.newItemQuantity + " " + this.quantityMeasurement,
          false
        );
        this.shoppingListItems.push(item);
        this.newItem = "";
        this.newItemQuantity = 0;
        this.updateLocalStorage();
      } else {
        console.error("Cannot add empty string");
      }
    },
    removeListItem(item) {
      this.shoppingListItems = this.shoppingListItems.filter(
        (element) => element !== item
      );
      this.updateLocalStorage();
    },
    toggleBoughtStatus(item) {
      const itemIndex = this.shoppingListItems.indexOf(item);
      this.shoppingListItems[itemIndex].bought =
        !this.shoppingListItems[itemIndex].bought;

      console.log(this.shoppingListItems[itemIndex]);
      this.updateLocalStorage();
    },
  },
}).mount("#app");
