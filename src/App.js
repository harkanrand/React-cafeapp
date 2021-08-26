import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/staticpages/Home";
import Navbar from "./components/layout/Navbar";
//import Dashboard from './components/dashboard/Dashboard';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

import ItemList from "./components/items/ItemList";
import ItemDetails from "./components/items/ItemDetails";
import CreateItem from "./components/items/CreateItem";
import CreateItemList from "./components/items/CreateItemList";
import EditInventoryList from "./components/items/EditInventoryList";
import InventoryLists from "./components/items/InventoryLists";
import InventoryListDetails from "./components/items/InventoryListDetails";
import ConductInventory from "./components/items/ConductInventory";

import ProductList from "./components/products/ProductList";
import ProductDetails from "./components/products/ProductDetails";
import CreateProduct from "./components/products/CreateProduct";

import SupplierList from "./components/suppliers/SupplierList";
import SupplierDetails from "./components/suppliers/SupplierDetails";
import CreateSupplier from "./components/suppliers/CreateSupplier";

import CafeList from "./components/cafe/CafeList";
import CafeDashboard from "./components/cafe/CafeDashboard";
import CreateCafe from "./components/cafe/CreateCafe";

import UserList from "./components/users/UserList";
import UserDetails from "./components/users/UserDetails";

import CafeTest from "./components/test/cafeTest";
import CafeDetails from "./components/cafe/CafeDetails";
import ShoppingList from "./components/shopping/ShoppingList";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />

            <Route path="/itemList" component={ItemList} />
            <Route path="/item/:id" component={ItemDetails} />
            <Route path="/createItem" component={CreateItem} />
            <Route path="/createItemList" component={CreateItemList} />
            <Route path="/editInventoryList" component={EditInventoryList} />
            <Route path="/inventoryLists" component={InventoryLists} />
            <Route
              exact
              path="/inventory/:id"
              component={InventoryListDetails}
            />
            <Route path="/inventory/:id/conduct" component={ConductInventory} />

            <Route path="/products" component={ProductList} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/createProduct" component={CreateProduct} />

            <Route path="/shopping" component={ShoppingList} />

            <Route path="/suppliers" component={SupplierList} />
            <Route path="/supplier/:id" component={SupplierDetails} />
            <Route path="/addSupplier" component={CreateSupplier} />

            <Route path="/createCafe" component={CreateCafe} />
            <Route path="/cafeList" component={CafeList} />
            <Route exact path="/cafe" component={CafeDashboard} />
            <Route path="/cafe/:id" component={CafeDetails} />

            <Route path="/userlist" component={UserList} />
            <Route path="/user/:id" component={UserDetails} />

            <Route path="/test/cafeTest" component={CafeTest} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
