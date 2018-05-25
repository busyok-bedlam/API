const { v4 } = require("node-uuid");
const food = [
  {
    title: "potato",
    quantity: 41,
    quality: 9
  },
  {
    title: "apple",
    quantity: 13,
    quality: 5
  },
  {
    title: "meet",
    quantity: 32,
    quality: 8
  },
  {
    title: "eggs",
    quantity: 15,
    quality: 7
  },
  {
    title: "oil",
    quantity: 61,
    quality: 10
  },
  {
    title: "bread",
    quantity: 11,
    quality: 9
  }

]
const initialState = {
  food: food.map( item => ({ ...item, id: v4()}))
}

module.exports = initialState;
