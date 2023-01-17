import React from "react";
import PaymentHistory from "./PaymentHistory";

class InterestRateInput extends React.Component {
  state = {
    completedPayments: [],
    interestRate: "",
    loanAmount: "",
    payment: "",
    remainingPayments: "",

  };


  
  handleChange = ({target: {name, value}}) => {    
    this.setState({[name]: value })
  }

  calculations = () => {
    const { loanAmount, interestRate, payment, remainingPayments } = this.state
    const interestFee = (interestRate / 12) * loanAmount
    
    // if (loanAmount <= 100) {
    //   return minimumPayment = parseFloat((loanAmount + interestFee).toFixed(2))
    // }
    const minimumPayment = parseFloat((loanAmount * 0.01).toFixed(2))
    const revisedPayment = +payment - +interestFee
    
    this.setState({
      loanAmount: parseFloat((loanAmount - +revisedPayment).toFixed(2)), 
      remainingPayments: (loanAmount / (minimumPayment - interestFee)) 
    })
    return revisedPayment
  }

  finalPayment = () => {
    const { loanAmount, interestRate, payment } = this.state
    const minimumPayment = parseFloat((loanAmount * 0.01).toFixed(2))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {loanAmount, payment, interestFee, remainingPayments} = this.state
    const minimumPayment = parseFloat((loanAmount * 0.01).toFixed(2))



    if(loanAmount <= 100) {
      return minimumPayment = loanAmount + interestFee
    }
 



    if (payment < minimumPayment) {
      alert(`you pay more, you pay now! $${minimumPayment} is the minimum required`)
    } else {
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
          payment: "",
        }));
      };      
    }
    
    


    
    

  

  render() {
    const { interestRate, loanAmount, payment, remainingPayments } = this.state;
    const minimumPayment = parseFloat((loanAmount * 0.01).toFixed(2))

    return (
      <div className="hero">
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
              <h6>{remainingPayments} payments to pay off</h6>
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
          
        </div>

        <PaymentHistory info={this.state} />
      </div>
    );
  }
}
export default InterestRateInput;
