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
    this.setState({[name]: value}, () => this.minPayFinder())
  }

  minPayFinder = () => {
    const { loanAmount, interestRate } = this.state
    const interestFee = (+interestRate / 1200) * loanAmount 
    const principal = +loanAmount / 100
    if (+loanAmount <= 100) this.setState({ minPay: parseInt(+loanAmount + +principal).toFixed(2) })
    if (+loanAmount > 100) this.setState({ minPay: parseInt(principal + interestFee).toFixed(2) })
  }

  calculations = () => {
    const { loanAmount, interestRate , payment, remainingPayments } = this.state   
    const interestFee = parseInt(((interestRate / 1200 ) * loanAmount).toFixed(2))
    this.setState({
      loanAmount: parseFloat((loanAmount - +payment + +interestFee).toFixed(2)),
      remainingPayments: (+loanAmount / (+payment - +interestFee)).toFixed(2) > 0 | 0 
    })
  }

  historyLogic = () => {
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
      }), () => this.minPayFinder());
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { payment, minPay,} = this.state    
    if (+payment < +minPay ) {
      return alert(`you must pay more, you pay now! $${minPay} is the minimum required`)
    } 
    this.calculations()
    this.historyLogic()
    }    

  render() {
    const { interestRate, loanAmount, payment, remainingPayments, minPay } = this.state;
    const fields = [
      { id: 'interestRate', label: "Interest Rate", value: interestRate, name: 'interestRate' }, 
      { id: 'loanAmount', label: "Loan Amount", value: loanAmount, name: 'loanAmount', subheader: `${remainingPayments} payments to pay off` }, 
      { id: 'payment', label: "Payment", value: payment, name: 'payment', subheader: `$${minPay}`},    
    ]
   
    return (
      <div  className="hero">
        <h2>Debt Calculator</h2>
        <div className="main-wrapper">
          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit}>
              {fields.map(item => {
                const { id, label, value, name, subheader} = item
                return (                  
                  <div key={id}>
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
                  </div>                  
                )
              })}
              <button>enter</button>
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
