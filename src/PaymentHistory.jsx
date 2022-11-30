import React from "react";

class PaymentHistory extends React.Component {
  
  render() {
    const { paymentsList } = this.props;
    return (
      <p>{paymentsList}</p>
      <h6>{hello}</h6>
      
    )
  }
}

PaymentHistory.defaultProps = {
  paymentsList: 'Testing Default ',
  hello: 'Hello Test',
}



export default PaymentHistory;
