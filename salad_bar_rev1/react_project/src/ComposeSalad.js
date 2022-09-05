import { Component } from "react";
import { Salad } from "./Salad";

class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation: "",
      proteins: [],
      extras: [],
      dressing: "",
      checked: {},
      totalPrice: 0
    };

    this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
    this.handleChangeArray = this.handleChangeArray.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stateToString = this.stateToString.bind(this);
    this.stateReset = this.stateReset.bind(this);
    this.checkStateEmpty = this.checkStateEmpty.bind(this);
  }

  handleChangeDropdown(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChangeArray(event) {
    if (
      !this.state.extras.includes(event.target.value) &&
      !this.state.proteins.includes(event.target.value)
    ) {
      this.setState({
        [event.target.name]: [
          ...this.state[event.target.name],
          event.target.value]
      });
    } else {
      console.log(this.state[event.target.name]);
      this.setState({
        [event.target.name]: [...this.state[event.target.name].filter(
            (item) => item !== event.target.value
          )]
      });
    }
  }

  checkStateEmpty() {
    if (
      this.state.foundation === "" &&
      this.state.dressing === "" &&
      this.state.proteins.length === 0 &&
      this.state.extras.length === 0
    )return false;
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.checkStateEmpty()) {
      let order = new Salad();
      let tempState = {};
      tempState = this.state;

      Object.keys(tempState).forEach(function (key) {
        if (key === "extras" || key === "proteins") {
          tempState[key].forEach(function (value) {
            order.add(value);
          });
        } else if (key !== "checked") {
          order.add(tempState[key]);
        }
      });
      this.props.createOrder(order);
    }
    this.stateReset();
  }

  stateToString() {
    return (
      "This is the current composition: \n" +
      this.state.foundation +
      "\n" +
      this.state.proteins.join(", ") +
      "\n" +
      this.state.extras.join(", ") +
      "\n" +
      this.state.dressing
    );
  }

  stateReset() {
    this.setState({
      foundation: "",
      proteins: [],
      extras: [],
      dressing: "",
      checked: {},
    });
  }

  render() {
    const inventory = this.props.inventory;
    let foundations = Object.keys(inventory).filter(function (item) {
      return inventory[item].foundation;
    });
    let extras = Object.keys(inventory).filter(function (item) {
      return inventory[item].extra;
    });
    let proteins = Object.keys(inventory).filter(function (item) {
      return inventory[item].protein;
    });
    let dressing = Object.keys(inventory).filter(function (item) {
      return inventory[item].dressing;
    });
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="container">
          <div>
            Foundation:
            <select
              className="form-control"
              name="foundation"
              onChange={this.handleChangeDropdown}
            >
              <option key="" value=""></option>
              {foundations.map((item) => (
                <option key={item} value={item}>
                  {item}
                  {" + " + inventory[item].price + "kr "}
                </option>
              ))}
            </select>
          </div>
          <div>
            Proteins:
            {proteins.map((item) => (
              <div key={item}>
                <input
                  type="checkbox"
                  name="proteins"
                  checked={this.state["proteins"].includes(item) || false}
                  value={item}
                  onChange={this.handleChangeArray}
                />
                <label className="mytab">
                  {item} + {inventory[item].price}kr
                </label>
              </div>
            ))}
          </div>
          <div>
            Extras:
            {extras.map((item) => (
              <div key={item}>
                <input
                  type="checkbox"
                  name="extras"
                  checked={this.state["extras"].includes(item) || false}
                  value={item}
                  onChange={this.handleChangeArray}
                />
                <label className="mytab">
                  {item} + {inventory[item].price}kr
                </label>
              </div>
            ))}
          </div>
          <div>
            Dressing:
            <select
              className="form-control"
              name="dressing"
              onChange={this.handleChangeDropdown}
            >
              <option key="" value=""></option>
              {dressing.map((item) => (
                <option key={item} value={item} price={inventory[item].price}>
                  {item}
                  {" + " + inventory[item].price + "kr "}
                </option>
              ))}
            </select>
          </div>
          <div>
            <br></br>
            <input
              type="submit"
              className="btn btn-primary"
              value="Place order"
            ></input>
          </div>
        </div>
      </form>
    );
  }
}

export default ComposeSalad;
