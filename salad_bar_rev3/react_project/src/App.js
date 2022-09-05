import "./App.css";
import ComposeSalad from "./ComposeSalad";
import { Component } from "react";
import ViewOrder from "./ViewOrder";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      inventory: {},
      loaded: 0,
    };

    this.createOrder = this.createOrder.bind(this);
    this.generateId = this.generateId.bind(this);
    this.fetchIngredient = this.fetchIngredient.bind(this);
    this.buildInventory = this.buildInventory.bind(this);
    this.postOrder = this.postOrder.bind(this);
  }

  static counter = 0;

  createOrder(data) {
    this.generateId(data);
    this.setState({ orders: [...this.state.orders, data] });
    window.localStorage.setItem("orders", JSON.stringify(this.state.orders));
  }

  generateId(data) {
    let id = App.counter;
    App.counter++;
    data.getSetId(id);
  }

  postOrder() {
    let url = "http://localhost:8080/orders";
    return fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.orders),
    }).then((response) => response.json());
  }

  async fetchIngredient(type, name) {
    let url = "http://localhost:8080/".concat(type).concat("/" + name);

    return await Promise.resolve(
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
    );
  }

  async buildInventory() {
    let types = ["foundations", "proteins", "extras", "dressings"];
    let inv = {};

    //foundations
    Promise.resolve(
      fetch("http://localhost:8080/".concat(types[0]))
        .then((response) => response.json())
        .then((data) => {
          return Promise.all(
            data.map((item) => {
              return this.fetchIngredient(types[0], item).then(
                (value) => (inv[item] = value)
              );
            })
          );
        })
    );

    //Proteins
    Promise.resolve(
      fetch("http://localhost:8080/".concat(types[1]))
        .then((response) => response.json())
        .then((data) => {
          return Promise.all(
            data.map((item) => {
              return this.fetchIngredient(types[1], item).then(
                (value) => (inv[item] = value)
              );
            })
          );
        })
    );

    //extras
    Promise.resolve(
      fetch("http://localhost:8080/".concat(types[2]))
        .then((response) => response.json())
        .then((data) => {
          return Promise.all(
            data.map((item) => {
              return this.fetchIngredient(types[2], item).then(
                (value) => (inv[item] = value)
              );
            })
          );
        })
    );

    // //dressings
    Promise.resolve(
      fetch("http://localhost:8080/".concat(types[3]))
        .then((response) => response.json())
        .then((data) => {
          return Promise.all(
            data.map((item) => {
              return this.fetchIngredient(types[3], item).then(
                (value) => (inv[item] = value)
              );
            })
          );
        })
    );

    console.log(inv);
    this.setState({
      inventory: inv,
    });
    this.setState({ loaded: 1 });

    this.setState({ orders : (JSON.parse(window.localStorage.getItem("orders")) || []) });
  }

  render() {
    if (this.state.loaded === 0) this.buildInventory();
    this.postOrder();

    const saladElements = (params) => (
      <ComposeSalad
        {...params}
        inventory={this.state.inventory}
        createOrder={this.createOrder}
      />
    );
    const orderElements = (params) => (
      <ViewOrder {...params} order={this.state.orders} />
    );

    return (
      <div>
        <Router>
          {
            <div className="jumbotron text-center">
              <h1>Barely Legal Salad Bar</h1>
              <p>Here you can order custom made salads!</p>
            </div>
          }
          {
            <div>
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <Link className="nav-link" to="compose-salad">
                    Compose your own salad
                  </Link>
                  <Link className="nav-link" to="view-order">
                    Show orders
                  </Link>
                </li>
              </ul>
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <Route path="/compose-salad" render={saladElements}></Route>
                  <Route path="/view-order" render={orderElements}></Route>
                </li>
              </ul>
            </div>
          }
        </Router>
      </div>
    );
  }
}

export default App;
