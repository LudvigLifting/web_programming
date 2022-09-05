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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stateToString = this.stateToString.bind(this);
    this.stateReset = this.stateReset.bind(this);
  }

  handleChange(event) {
    event.target.parentElement.classList.add("was-validated");

    if (event.target.className === "form-control") {
      this.setState({ [event.target.name]: event.target.value });
    } else if (!this.state[event.target.name].includes(event.target.value)) {
      this.setState({ [event.target.name]: [...this.state[event.target.name], event.target.value] });
    } else {
      this.setState({ [event.target.name]: [...this.state[event.target.name].filter(
          (item) => item !== event.target.value)] });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    event.target.classList.add("was-validated");

    if (event.target.checkValidity() === true) {
      let order = new Salad();
      let tempState = this.state;

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
      this.props.history.push("/view-order");
      this.stateReset();
    }
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
    });
  }

  render() {
    const inventory = this.props.inventory;

    let foundations = Object.keys(inventory).filter(function (item) {
      return inventory[item].foundation;
    })
    let extras = (inventory !== undefined || inventory !== {}) ? Object.keys(inventory).filter(function (item) {
      return inventory[item].extra;
    }) : [];
    let proteins = (inventory !== undefined || inventory !== {}) ? Object.keys(inventory).filter(function (item) {
      return inventory[item].protein;
    }) : [];
    let dressing = (inventory !== undefined || inventory !== {}) ? Object.keys(inventory).filter(function (item) {
      return inventory[item].dressing;
    }) : [];
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div className="container">
          <div>
            Foundation:
            <select
              required
              className="form-control"
              name="foundation"
              onChange={this.handleChange}
            >
              <option key="" value=""></option>
              {foundations.map((item) => (
                <option key={item} value={item}>
                  {item}
                  {" + " + inventory[item].price + "kr "}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">You need to select one foundation!</div>
          </div>
        </div>
        <div className="container">
          <div>
            Proteins:
            {proteins.map((item) => (
              <div key={item}>
                <input
                  type="checkbox"
                  name="proteins"
                  checked={this.state["proteins"].includes(item) || false}
                  value={item}
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
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
              required
              className="form-control"
              name="dressing"
              onChange={this.handleChange}
            >
              <option key="" value=""></option>
              {dressing.map((item) => (
                <option key={item} value={item} price={inventory[item].price}>
                  {item}
                  {" + " + inventory[item].price + "kr "}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">You need to select one dressing!</div>
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
