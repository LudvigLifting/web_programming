import { Component } from "react";
import { Salad } from "./Salad";

class ViewOrder extends Component {
  render() {
    let orderz = [...this.props.orders];
    orderz.setPrototypeOf(Object.getPrototypeOf(Salad.prototype));
    return (
      <div>
        {orderz((item) => (
          <div className="jumbotron jumbotron-fluid" key={item.getSetId()}>
            <div className="container">
              <h5 className="display-4">Ordernummer: {item.getSetId()}</h5>
              <p className="lead"><b>Foundation:</b> {item.foundation}</p>
              <p className="lead"><b>Proteins:</b> {item.proteins.join(', ')}</p>
              <p className="lead"><b>Extras:</b> {item.extras.join(', ')}</p>
              <p className="lead"><b>Dressing:</b> {item.dressing}</p>
              <p className="lead"><b>Pris:</b> {item.price()}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default ViewOrder;
