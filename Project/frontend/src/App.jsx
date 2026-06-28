import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5001/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Lost");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log("Failed to fetch items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setType("Lost");
    setLocation("");
    setContact("");
    setDate("");
    setStatus("Active");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      title,
      description,
      type,
      location,
      contact,
      date,
      status,
    };

    try {
      if (editingId) {
        const response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        });

        const updatedItem = await response.json();

        setItems(
          items.map((item) => (item._id === editingId ? updatedItem : item))
        );

        resetForm();
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        });

        const savedItem = await response.json();
        setItems([savedItem, ...items]);

        resetForm();
      }
    } catch (error) {
      console.log("Failed to save item:", error);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    setType(item.type);
    setLocation(item.location);
    setContact(item.contact);
    setDate(item.date);
    setStatus(item.status);
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Failed to delete item:", error);
    }
  };

  const markResolved = async (item) => {
    try {
      const response = await fetch(`${API_URL}/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...item, status: "Resolved" }),
      });

      const updatedItem = await response.json();

      setItems(
        items.map((currentItem) =>
          currentItem._id === item._id ? updatedItem : currentItem
        )
      );
    } catch (error) {
      console.log("Failed to update status:", error);
    }
  };

  const filteredItems =
    filter === "All"
      ? items
      : items.filter((item) => item.type === filter || item.status === filter);

  return (
    <div className="app">
      <h1>CampusFind</h1>
      <p className="subtitle">Lost and found system for campus items.</p>

      <form onSubmit={handleSubmit} className="item-form">
        <input
          type="text"
          placeholder="Item title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Item description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Lost</option>
          <option>Found</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Contact information"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Active</option>
          <option>Resolved</option>
        </select>

        <button type="submit">
          {editingId ? "Update Item" : "Add Item"}
        </button>

        {editingId && (
          <button type="button" className="cancel-button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      <div className="filter-section">
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Lost</option>
          <option>Found</option>
          <option>Resolved</option>
        </select>
      </div>

      <div className="item-list">
        <h2>Campus Items</h2>

        {filteredItems.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          filteredItems.map((item) => (
            <div className="item-card" key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Contact:</strong> {item.contact}</p>
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Status:</strong> {item.status}</p>

              <div className="button-group">
                <button className="edit-button" onClick={() => startEdit(item)}>
                  Edit
                </button>

                {item.status !== "Resolved" && (
                  <button
                    className="resolve-button"
                    onClick={() => markResolved(item)}
                  >
                    Mark Resolved
                  </button>
                )}

                <button
                  className="delete-button"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;