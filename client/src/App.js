import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    fetch("/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items: ", err));
  }, []);

  function handleAddItem() {
    fetch("/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newItemName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setItems([...items, data]);
        setNewItemName("");
      })
      .catch((err) => console.error("Error adding item: ", err));
  }

  function handleUpdateItem(id) {
    const updatedName = prompt("Enter new name:");
    fetch(`/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: updatedName }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setItems(items.map((item) => (item.id === id ? updatedItem : item)));
      })
      .catch((err) => console.error("Error updating item: ", err));
  }

  function handleDeleteItem(id) {
    fetch(`/items/${id}`, { method: "DELETE" })
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((err) => console.error("Error deleting item: ", err));
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>SERVER CRUD TEST</h1>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleUpdateItem(item.id)}>Update</button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
