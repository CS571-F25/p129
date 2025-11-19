import React, { useState } from "react";
import {
  Card,
  Button,
  Form,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { ChevronLeft, Share2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ShoppingListScreen.css";

export default function ShoppingListScreen() {
  const navigate = useNavigate();
  const initialShoppingList = {
    Vegetables: [
      { id: 1, name: "Avocado", amount: "2 pcs", checked: false },
      { id: 2, name: "Cherry Tomatoes", amount: "1 cup", checked: false },
      { id: 3, name: "Cucumber", amount: "1 pc", checked: false },
      { id: 4, name: "Broccoli", amount: "2 cups", checked: false },
      { id: 5, name: "Bell Pepper", amount: "1 pc", checked: true },
      { id: 6, name: "Zucchini", amount: "1 pc", checked: false },
    ],
    Protein: [
      { id: 7, name: "Salmon Fillets", amount: "2 x 6oz", checked: false },
      { id: 8, name: "Eggs", amount: "1 dozen", checked: false },
      { id: 9, name: "Greek Yogurt", amount: "500g", checked: false },
    ],
    Grains: [
      { id: 10, name: "Quinoa", amount: "1 cup", checked: false },
      { id: 11, name: "Whole Grain Bread", amount: "1 loaf", checked: true },
    ],
    Dairy: [{ id: 12, name: "Almond Milk", amount: "1 liter", checked: false }],
    Other: [
      { id: 13, name: "Olive Oil", amount: "1 bottle", checked: true },
      { id: 14, name: "Mixed Nuts", amount: "200g", checked: false },
      { id: 15, name: "Lemon", amount: "2 pcs", checked: false },
      { id: 16, name: "Fresh Dill", amount: "1 bunch", checked: false },
    ],
  };

  const [shoppingList, setShoppingList] = useState(initialShoppingList);
  const [newItem, setNewItem] = useState("");

  const toggleItem = (category, id) => {
    setShoppingList({
      ...shoppingList,
      [category]: shoppingList[category].map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      ),
    });
  };

  const addCustomItem = () => {
    if (newItem.trim()) {
      const newId =
        Math.max(...Object.values(shoppingList).flat().map((i) => i.id)) + 1;

      setShoppingList({
        ...shoppingList,
        Other: [
          ...shoppingList.Other,
          { id: newId, name: newItem, amount: "1 pc", checked: false },
        ],
      });

      setNewItem("");
    }
  };

  const allItems = Object.values(shoppingList).flat();
  const totalItems = allItems.length;
  const checkedItems = allItems.filter((i) => i.checked).length;

  return (
    <div className="shopping-list-container">
      {/* HEADER */}
      <div className="shopping-list-header">
        <div className="header-left">
          <Button variant="light" className="header-button" onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
          </Button>
          <h4 className="header-title">Shopping List</h4>
        </div>

        <Button variant="light" className="header-button">
          <Share2 size={20} />
        </Button>
      </div>

      {/* MAIN CONTENT */}
      <Container className="main-content">

        {/* PROGRESS */}
        <Card className="progress-card">
          <div className="progress-header">
            <h5 className="progress-title">Progress</h5>
            <small className="progress-stats">
              {checkedItems} / {totalItems} items
            </small>
          </div>

          <ProgressBar
            now={(checkedItems / totalItems) * 100}
            variant="success"
            className="progress-bar-custom"
          />
        </Card>

        {/* ADD CUSTOM ITEM */}
        <Card className="add-item-card">
          <Row>
            <Col xs={9}>
              <Form.Control
                className="add-item-input"
                placeholder="Add custom item..."
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomItem()}
              />
            </Col>
            <Col xs={3}>
              <Button
                className="add-item-button"
                onClick={addCustomItem}
                variant="success"
              >
                <Plus size={18} />
              </Button>
            </Col>
          </Row>
        </Card>

        {/* CATEGORY LISTS */}
        {Object.entries(shoppingList).map(([category, items]) => (
          <div key={category} className="category-section">
            <h5 className="category-title">{category}</h5>

            <Card className="category-card">
              {items.map((item) => (
                <div key={item.id} className="shopping-item">
                  <div className="item-left">
                    <Form.Check
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(category, item.id)}
                    />
                    <span className={item.checked ? "item-name item-name-checked" : "item-name"}>
                      {item.name}
                    </span>
                  </div>

                  <small className="item-amount">{item.amount}</small>
                </div>
              ))}
            </Card>
          </div>
        ))}

        {/* SHARE BUTTON */}
        <Button variant="outline-success" className="share-button">
          <Share2 size={18} className="me-2" />
          Share Shopping List
        </Button>
      </Container>
    </div>
  );
}
