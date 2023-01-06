import React from "react";
import PaymentHistory from "./PaymentHistory";


class InterestRateInput extends React.Component {
  constructor() {
    super();
    this.state = {
      // text:  '', // real time state from input
      // lastItemName: '', // the last text value for newItem created 
      completedPayments: [], 
      interestRate: '',
      loanAmount: '',
      payment: '',
      balanceAmount: '',
    
    };
  }

  handleChange = ({ target: { value, name}}) => 
    this.setState({ [name]: value, text: value, });

  handleInterestRateChange = (event) => 
    this.setState({ interestRate: event.target.value })

  handleLoanAmountChange = (event) => 
    this.setState({ loanAmount: event.target.value })

  handlePaymentChange = (event) => 
    this.setState({ payment: event.target.value })

  



  handleSubmit = (e) => { 
    e.preventDefault();

    const newItem = {
      text: this.state.payment,
      id: Date.now(),
    }
  
    this.setState((state) => ({ 
      completedPayments: newItem.text != '' ?[...state.completedPayments, newItem] : [...state.completedPayments],
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
          value={this.state.interestRate}
          onChange={this.handleInterestRateChange} 
          type="text"
          autoComplete="off"
          name="interestRate"
          />   
          <br />

          <label>Loan Amount</label><br />
          <input 
          value={ this.state.loanAmount }
          onChange={ this.handleLoanAmountChange }           
          type="text"
          autoComplete="off"
          name="loanAmount"
          />   
          <br />

          <label>Payment</label><br />
          <input 
          value={this.state.payment}         
          onChange={this.handlePaymentChange}           
          type="text"
          autoComplete="off"
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