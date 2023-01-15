import React from "react";
import PaymentHistory from "./PaymentHistory";

class InterestRateInput extends React.Component {
  // constructor() {
    // super();
    // this.state = {
    state = {
      // text:  '', // real time state from input
      // lastItemName: '', // the last text value for newItem created
      completedPayments: [],
      interestRate: "",
      loanAmount: "",
      payment: "",
      balanceAmount: "",
      remainingPayments: "",
    };
  // }

  handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;    
    this.setState({[name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.calculations()

    const newItem = {
      text: this.state.payment,
      id: Date.now(),
    };   

    this.setState((state) => ({
      completedPayments:
        newItem.text != ""
          ? [...state.completedPayments, newItem]
          : [...state.completedPayments],
      // text: '' ,
      // lastItemName: newItem.text,
      payment: "",
      balanceAmount: 
        this.state.completedPayments.length < 1 
          ? this.state.loanAmount - this.state.payment
          // ? this.state.loanAmount - this.state.completedPayments
          : 'not ok'
    }));
  };

  calculations = () => {
    //things to do : min payment, balanceAmount, remaining payments
    //note: payment is used to create newItem. only completedPayments has any checks on payment to verify. 
    //
    const { completedPayments, interestRate, loanAmount, payment, balanceAmount, } = this.state
    const firstPaymentResult = +loanAmount - +completedPayments[0]
   
    return firstPaymentResult

    // const totalInterest = interestRate * balanceAmount
    // const minPayment = //total interest/12 + balanceAmount*0.01

  }

  render() {
    const { interestRate, loanAmount, payment, remainingPayments, balanceAmount } = this.state;
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
              { balanceAmount }
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
