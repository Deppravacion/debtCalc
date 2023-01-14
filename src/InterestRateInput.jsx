import React from "react";
import PaymentHistory from "./PaymentHistory";

class InterestRateInput extends React.Component {
  constructor() {
    super();
    this.state = {
      // text:  '', // real time state from input
      // lastItemName: '', // the last text value for newItem created
      completedPayments: [],
      interestRate: "",
      loanAmount: "",
      payment: "",
      balanceAmount: "",
      remainingPayments: "",
    };
  }

  // handleChange = ({ target: { value, name } }) =>
  //   this.setState({ [name]: value, text: value });

  handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    console.log(name, value);
    this.setState({[name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();

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
    }));
  };

  calculateBalance = () => {
    //loanAmount - payment
    const { loanAmount, payment, balanceAmount } = this.state
    const sayHello = 'say hi'
    console.log(sayHello);
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
                // onChange={this.handleInterestRateChange}
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
                // onChange={this.handleLoanAmountChange}
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
                // onChange={this.handlePaymentChange}
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
              { balanceAmount, loanAmount }
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
