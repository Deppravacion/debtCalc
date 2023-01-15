import React from "react";
import PaymentHistory from "./PaymentHistory";

class InterestRateInput extends React.Component {
  state = {
    completedPayments: [],
    interestRate: "",
    loanAmount: "",
    payment: "",
    balance: "",
  };
 
  
  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;    
    this.setState({[name]: value })
  }

  calculations = () => {
    const { loanAmount, interestRate, payment } = this.state
    const interestFee = (+interestRate / 12) * +loanAmount
    const principalFee = +loanAmount * 0.01
    const minimumPayment = +interestFee + +principalFee
    return minimumPayment
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setBalance()
    
    const newItem = {
      text: this.state.payment,
      id: Date.now(),
    };   

    this.setState((state) => ({
      completedPayments:
        newItem.text != ""
        ? [...state.completedPayments, newItem]
        : [...state.completedPayments],
        payment: "",
      }));
    };
    
  

  render() {
    const { interestRate, loanAmount, payment, remainingPayments } = this.state;
    return (
      <div className="">
        <h2>Debt Calculator</h2>
        <div className="main-wrapper">
          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="interestRate">Interest Rate</label>
              <br />
              <input
                value={interestRate}
                onChange={this.handleChange}
                type="text"
                autoComplete="off"
                name="interestRate"
              />
              <br />

              <label>Loan Amount</label>
              <br />
              <input
                value={loanAmount}
                onChange={this.handleChange}
                type="text"
                autoComplete="off"
                name="loanAmount"
              />
              <br />

              <label>Payment</label>
              <br />
              <input
                value={payment}
                onChange={this.handleChange}
                type="text"
                autoComplete="off"
                name="payment"
              />
              <br />
              <button >enter</button>
              <br />
            </form>
          </div>
          <div className="calculations-wrapper">
            <div id="numberOfPaymentsRequired" className="dark-bg">
              { remainingPayments }
               minimum payments required to pay off debt
            </div>
            <div id="remainingBalance" className="dark-bg">
         
              Your remaining balance.
            </div>            
          </div>
        </div>

        <PaymentHistory info={this.state} />
      </div>
    );
  }
}
export default InterestRateInput;
