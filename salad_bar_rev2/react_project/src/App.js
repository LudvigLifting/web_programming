import "./App.css";
import inventory from "./inventory.ES6";
import ComposeSalad from "./ComposeSalad";
import { Component } from "react";
import ViewOrder from "./ViewOrder";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    };

    this.createOrder = this.createOrder.bind(this);
    this.generateId = this.generateId.bind(this);
  }

  static counter = 0;

  createOrder(data) {
    this.generateId(data);
    this.setState({ orders: [...this.state.orders, data] });
  }

  generateId(data) {
    let id = App.counter;
    App.counter++;
    data.getSetId(id);
  }

  render() {
    const saladElements = (params) => (
      <ComposeSalad
        {...params}
        inventory={inventory}
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
