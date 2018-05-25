const { v4 } = require('node-uuid');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const initialState = require("./db/initial");
const getPath = () => path.join(__dirname,"db","index.json");

const createJson = () => {
  fs.writeFile(getPath(),JSON.stringify(initialState,null,4),"utf-8", () => {
    console.log("Create initial file");
  })
}

// API
var app = express();
// MIDDLEWARES
app.use(bodyParser.json());;
app.use(bodyParser.urlencoded( {extended: true}));

app.get("/", (req,res) => {
  createJson();
  res.send("HELLO");
  res.end();
})
// GET ALL ELEMS
app.get("/food", (req,res) => {
  fs.readFile(getPath(), (err,data) => {
    const result = JSON.parse(data);
    res.send(result);
  });
})
// GET ELEM BY ID
app.get("/food/:id", (req,res) => {
  const id = req.params.id;
  fs.readFile(getPath(), (err,data) => {
    const food = (JSON.parse(data)).food;
    const item = food.find( item => item.id === id);
    res.send(item)
  })
})
// ADD ELEMENT
app.post("/food", (req,res) => {
  const item = req.body;
  fs.readFile(getPath(), (err,data) => {
    const obj = JSON.parse(data);
    const result = {
      ...obj,
      food: [
        ...obj.food,
        {...item, id: v4()}
      ]
    }
    const json = JSON.stringify(result,null,4);
    fs.writeFile(getPath(), json, 'utf-8', () => {
      res.send(result)
    })
  });
})

// DELETE ELEMENT
app.delete("/food/:id", (req,res) => {
  const id = req.params.id;
  fs.readFile(getPath(), (err,data) => {
    const food = (JSON.parse(data)).food;
    const item = food.find( item => item.id === id );
    const itemIndex = food.indexOf(item);
    const result = {
      food: [
        ...food.slice(0,itemIndex),
        ...food.slice(itemIndex + 1)
      ]
    }
    const json = JSON.stringify(result,null,4);
    fs.writeFile(getPath(),json,"utf-8", () => {
      res.send({});
    })
  })
})

// PUT ELEMENT
app.put("/food/:id", (req,res) => {
  const id = req.params.id;
  const item = req.body;
  fs.readFile(getPath(), (err,data) => {
    const food = (JSON.parse(data)).food;
    const putItem = food.find( item => item.id === id );
    const itemIndex = food.indexOf(putItem);
    const newElem = {...item,id };
    const result = {
      food: [
        ...food.slice(0,itemIndex),
        newElem,
        ...food.slice(itemIndex + 1)
      ]
    }
    const json = JSON.stringify(result,null,4);
    fs.writeFile(getPath(),json,'utf-8',() => {
      console.log("SUCCESS PUT");
      res.send(newElem)
    })
  })
})



app.listen(8000, () => {
  console.log("listening on port 8000")
})
