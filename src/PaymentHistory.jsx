import React from "react";

class PaymentHistory extends React.Component {
  //should state be used here to choose the history
  //to be displayed or hidden ? 
  
  render() {
    const {info:{ items, paymentsList, hello: title }} = this.props;
    return (
      <div>
        <p>{paymentsList}</p>
        <h6>{title}</h6>
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>

    )
  }
}

PaymentHistory.defaultProps = {
  items: ['item 1'],
  paymentsList: 'Testing Default ',
  hello: "hello default",
}



export default PaymentHistory;
