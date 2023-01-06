import React from "react";
import { NewForm } from './NewForm';
class PaymentHistory extends React.Component {
  
  render() {
    const {info:{ completedPayments }} = this.props;
    
    return (
      <div className="history-wrapper" >
        <p>History of payments</p>
        <button onClick={()=>{
          const $paymentsList = document.getElementById("paymentsList");    
          const classes = $paymentsList.classList;
          const result = classes.toggle("invisible");    
        }}>Hide / Show</button>
 
        <ul id="paymentsList" className="dark-bg">
          {completedPayments
            .map(item => (
              <li key={item.id}>{item.text}</li>
            ) )
          }
        </ul>
  
      </div>

    )
  }
}

export default PaymentHistory;
