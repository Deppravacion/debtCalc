import React from "react";
import PaymentHistory from "./PaymentHistory";

class InterestRateInput extends React.Component {
  state = {
    completedPayments: [],
    interestRate: "",
    loanAmount: "",
    payment: "",
    remainingPayments: "",
    minPay: "",
  };

  handleChange = ({target: {name, value}}) => {    
    this.setState({[name]: value})
    this.minPayFinder() 
    //***************************************************************************** */
   
    //******************************************************************************* */
  }

  minPayFinder = () => {
    const { loanAmount, interestRate, minPay } = this.state
    const interestFee = (interestRate / 100 / 12) * loanAmount 
    const principal = loanAmount / 100
    this.setState({ minPay: principal + interestFee})
  }

  calculations = () => {
    const { loanAmount, interestRate , payment, remainingPayments, minPay } = this.state   
    const interestFee = parseInt(((interestRate / 100 / 12) * loanAmount).toFixed(2))
    const principal = loanAmount / 100

    if (+loanAmount <= +100) {
      this.finalPayment()
    } else {
      const revisedPayment = +payment - +interestFee
      
      this.setState({

        loanAmount: parseFloat((+loanAmount - +revisedPayment).toFixed(2)), 
        remainingPayments: (+loanAmount / (+payment - +interestFee)).toFixed(2) 
      })
      return revisedPayment
    }
  }

  finalPayment = () => {
    const { loanAmount, interestRate, payment } = this.state
    const interestFee = (+interestRate / 12 / 100) * +loanAmount
    const finalPaymentAmount = parseFloat((+loanAmount + +interestFee).toFixed(2))
    console.log(`line 60 ${finalPaymentAmount}`)
    this.setState({
      loanAmount: parseFloat((+loanAmount - +payment - +interestFee).toFixed(2)), 
      remainingPayments: 0
    })
    return finalPaymentAmount
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {loanAmount, payment, interestFee, minPay, remainingPayments} = this.state

    
    if (+payment < +minPay && +loanAmount > 100) {
      alert(`you pay more, you pay now! $${minPay} is the minimum required`)
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

    const fields = [
      { label: "Interest Rate", value: interestRate, name: 'interestRate' }, 
      { label: "Loan Amount", value: loanAmount, name: 'loanAmount', subheader: `${remainingPayments} payments to pay off` }, 
      { label: "Payment", value: payment, name: 'payment', subheader: (+loanAmount > 100) ? (+loanAmount * .01 + (+interestRate / 100 * +loanAmount / 12)).toFixed(2) : (+loanAmount + (+interestRate * +loanAmount / 12)).toFixed(2)},    
    ]
   
    return (
      <div className="hero">
        <h2>Debt Calculator</h2>
        <div className="main-wrapper">
          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit}>
              {fields.map(item => {
                const { label, value, name, subheader} = item
                return (
                  <>
                    <label htmlFor={name}>{label}</label>
                    <br />
                    {subheader && (
                      <h6>{subheader}</h6>
                    )}
                    <input
                      id={name}
                      value={value}
                      onChange={this.handleChange}
                      type="text"
                      autoComplete="off"
                      name={name}
                      />
                    <br />
                  </>
                )
              })}
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
