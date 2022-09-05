import "./App.css";
import inventory from "./inventory.ES6";
import ComposeSaladModal from "./ComposeSaladModal";
import { Component } from "react";
import ViewOrder from "./ViewOrder"

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

  createOrder(data){
    this.generateId(data);
    this.setState({ orders: [...this.state.orders, data,] });
  }

  generateId(data){
    let id = App.counter;
    App.counter++;
    data.getSetId(id);
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Barely Legal Salad Bar</h1>
          <p>Here you can order custom made salads!</p>
        </div>
        <div>
          <ComposeSaladModal inventory={inventory} createOrder={this.createOrder}/>
        </div>
        <div>
          <ViewOrder order={this.state.orders}/>
        </div>
      </div>
    );
  }
}

export default App;
