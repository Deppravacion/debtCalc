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
    this.setState({[name]: value}, () => this.preCalculations())
  }

  preCalculations = () => {
    const { loanAmount, interestRate, payment } = this.state
    const interestFee = parseFloat(((interestRate / 1200 ) * loanAmount).toFixed(2)) 
    const principal = +loanAmount / 100
    if (loanAmount == 0) this.setState({ remainingPayments: 0})
    if (+loanAmount <= 100 && loanAmount > 0 ) this.setState({ 
      minPay: parseFloat(+loanAmount + +principal).toFixed(2),
      remainingPayments: `Final Payment Due` 
    })
    if (+loanAmount > 100) this.setState({ 
      minPay: parseFloat(principal + interestFee).toFixed(2), 
    })
  }

  calculations = () => {
    const { loanAmount, interestRate , payment } = this.state   
    const interestFee = parseFloat(((interestRate / 1200 ) * loanAmount).toFixed(2))
    const principal = parseFloat(loanAmount / 100)
    if (+loanAmount <= 100) {
      this.setState({
        loanAmount: parseFloat((+loanAmount - +payment + +principal).toFixed(2)),
        minPay: (loanAmount + principal - payment).toFixed(2)
      })
    }
    if (+loanAmount > 100) {
      this.setState({
        loanAmount: parseFloat((loanAmount - +payment + +interestFee).toFixed(2)),       
        remainingPayments: Math.ceil(+loanAmount / (+payment - +interestFee)) 
      })
    }
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
    }), () => this.preCalculations() );
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { payment, minPay, loanAmount} = this.state    
    if ( loanAmount == 0 ) this.setState({ remainingPayments: 0})
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
