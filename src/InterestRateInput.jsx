import React from "react";
import PaymentHistory from "./PaymentHistory";


class InterestRateInput extends React.Component {
  constructor() {
    super();
    this.state = {
      text:  '', // real time state from input
      completedPayments: [], // newItem => text:'' id:''
      lastItemName: '', // the last text value for newItem created 
      interestRate: '',
      loanAmount: '',
      payment: '',
      balanceAmount: '',
    
    };
  }

  handleChange = ({ target: { value, name}}) => 
  this.setState({ [name]: value, text: value, });

  handleSubmit = (e) => { 
    e.preventDefault();

    const newItem = {
      // text: this.state.text,
      text: this.state.payment,
      id: Date.now(),     
    }



    this.setState((state) => ({ 
      //if payment == '' do not add it to completedPayments
      completedPayments: [...state.completedPayments, newItem],
      text: '' ,
      lastItemName: newItem.text,
      payment: '',
 
    }));
  }



  render() { 

    return (
      <div>
        <h2>Debt Calculator</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="interestRate">Interest Rate</label>
          <br />
          <input 
          onChange={this.handleChange} 
          type="text"
          autoComplete="off"
          name="interestRate"
          />   
          <br />

          <label>Loan Amount</label><br />
          <input 
          onChange={this.handleChange} 
          type="text"
          autoComplete="off"
          name="loanAmount"
          />   
          <br />

          <label>Payment</label><br />
          <input 
          onChange={this.handleChange}           
          type="text"
          autoComplete="off"
          // value={this.state.text}         
          name="payment"
      
          />   
          <br />
          <button>enter</button>
          <br />
        </form>   

        <PaymentHistory info={this.state} />      
      </div>
    )
  }
}
export default InterestRateInput;