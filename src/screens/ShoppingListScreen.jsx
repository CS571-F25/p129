import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { ChevronLeft, Share2, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ShoppingListScreen.css";

const defaultCategories = {
  Vegetables: [],
  Protein: [],
  Grains: [],
  Dairy: [],
  Other: [],
};

export default function ShoppingListScreen() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Guest";
  
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem(`${userName}_shoppingList`);
    return saved ? JSON.parse(saved) : defaultCategories;
  });
  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [newCategory, setNewCategory] = useState("Other");

  // Save to localStorage whenever shoppingList changes
  useEffect(() => {
    localStorage.setItem(`${userName}_shoppingList`, JSON.stringify(shoppingList));
  }, [shoppingList, userName]);

  const toggleItem = (category, id) => {
    setShoppingList({
      ...shoppingList,
      [category]: shoppingList[category].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    });
  };

  const removeItem = (category, id) => {
    setShoppingList({
      ...shoppingList,
      [category]: shoppingList[category].filter((item) => item.id !== id),
    });
  };

  const addCustomItem = () => {
    if (newItem.trim()) {
      const allItems = Object.values(shoppingList).flat();
      const newId = allItems.length > 0 
        ? Math.max(...allItems.map((i) => i.id)) + 1 
        : 1;

      setShoppingList({
        ...shoppingList,
        [newCategory]: [
          ...shoppingList[newCategory],
          { id: newId, name: newItem.trim(), amount: newAmount.trim() || "1", checked: false },
        ],
      });

      setNewItem("");
      setNewAmount("");
    }
  };

  const clearAllItems = () => {
    setShoppingList(defaultCategories);
  };

  const allItems = Object.values(shoppingList).flat();
  const totalItems = allItems.length;
  const checkedItems = allItems.filter((i) => i.checked).length;

  // Check if any category has items
  const hasItems = totalItems > 0;

  return (
    <div className="shopping-list-container">
      <Container>
        {/* HEADER */}
        <div className="shopping-list-header">
          <div className="header-left">
            <Button variant="light" className="back-button" onClick={() => navigate(-1)} aria-label="Go back">
              <ChevronLeft size={20} />
            </Button>
            <h2 className="header-title">Shopping List</h2>
          </div>
          {hasItems && (
            <Button 
              variant="outline-danger" 
              size="sm" 
              className="clear-all-btn"
              onClick={clearAllItems}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* PROGRESS */}
        {hasItems && (
          <Card className="progress-card">
            <div className="progress-header">
              <h3 className="progress-title">Progress</h3>
              <small className="progress-stats">
                {checkedItems} / {totalItems} items
              </small>
            </div>

            <ProgressBar
              now={totalItems > 0 ? (checkedItems / totalItems) * 100 : 0}
              variant="success"
              className="progress-bar-custom"
            />
          </Card>
        )}

        {/* ADD CUSTOM ITEM */}
        <Card className="add-item-card">
          <h3 className="add-item-title">Add Item</h3>
          <Row className="g-2">
            <Col xs={12} md={5}>
              <Form.Control
                className="add-item-input"
                placeholder="Item name..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
                aria-label="Item name"
              />
            </Col>
            <Col xs={6} md={3}>
              <Form.Control
                className="add-item-input"
                placeholder="Amount (e.g. 2 pcs)"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
                aria-label="Amount"
              />
            </Col>
            <Col xs={4} md={2}>
              <Form.Select
                className="add-item-input"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                aria-label="Category"
              >
                {Object.keys(shoppingList).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={2} md={2}>
              <Button
                className="add-item-button"
                onClick={addCustomItem}
                variant="success"
                disabled={!newItem.trim()}
                aria-label="Add item"
              >
                <Plus size={18} />
              </Button>
            </Col>
          </Row>
        </Card>

        {/* EMPTY STATE */}
        {!hasItems && (
          <div className="empty-state">
            <h3 className="empty-state-title">Your shopping list is empty</h3>
            <p className="empty-state-text">Add items above to get started</p>
          </div>
        )}

        {/* CATEGORY LISTS */}
        {Object.entries(shoppingList).map(([category, items]) => 
          items.length > 0 && (
            <div key={category} className="category-section">
              <h3 className="category-title">{category}</h3>

              <Card className="category-card">
                {items.map((item) => (
                  <div key={item.id} className="shopping-item">
                    <div className="item-left">
                      <Form.Check
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(category, item.id)}
                      />
                      <span
                        className={
                          item.checked
                            ? "item-name item-name-checked"
                            : "item-name"
                        }
                      >
                        {item.name}
                      </span>
                    </div>

                    <span className="item-amount">{item.amount}</span>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeItem(category, item.id)}
                      className="delete-item-btn"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </Card>
            </div>
          )
        )}

        
      </Container>
    </div>
  );
}
