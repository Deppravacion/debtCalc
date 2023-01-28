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
  }

  minPayFinder = () => {
    const { loanAmount, interestRate } = this.state
    const interestFee = (interestRate / 100 / 12) * loanAmount 
    const principal = loanAmount / 100
    this.setState({ minPay: parseInt(principal + interestFee).toFixed(2)     })
    if (+loanAmount <= 100) {
      return this.setState({ minPay: parseInt(+loanAmount + +interestFee).toFixed(2)    })
    }
  }



  calculations = () => {
    const { loanAmount, interestRate , payment, remainingPayments } = this.state   
    const interestFee = parseInt(((interestRate / 100 / 12) * loanAmount).toFixed(2))
    // const principal = loanAmount / 100

    this.setState({
      loanAmount: parseFloat((loanAmount - +payment + +interestFee).toFixed(2)),
      remainingPayments: (+loanAmount / (+payment - +interestFee)).toFixed(2) > 0 | 0 
      // remainingPayments: (+loanAmount / (+payment - +interestFee)).toFixed(2) 
    })

    // if (+loanAmount <= +100) {
    //   // this.finalPayment()
    //   this.setState({
    //     // minPay: +loanAmount + +interestFee, 
    //     loanAmount: parseFloat((loanAmount - +payment - +interestFee).toFixed(2)),
    //     remainingPayments: 0
    //   })

    // } else {
    //   const revisedPayment = +payment - +interestFee      
    //   this.setState({
    //     loanAmount: parseFloat((+loanAmount - +revisedPayment).toFixed(2)), 
    //     remainingPayments: (+loanAmount / (+payment - +interestFee)).toFixed(2) 
    //   })
    //   return revisedPayment
    // }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { payment, minPay,} = this.state    
    if (+payment < +minPay ) {
       return alert(`you pay more, you pay now! $${minPay} is the minimum required`)
    } 
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
    this.minPayFinder()
    }    

  render() {
    const { interestRate, loanAmount, payment, remainingPayments, minPay } = this.state;
    const fields = [
      { label: "Interest Rate", value: interestRate, name: 'interestRate' }, 
      { label: "Loan Amount", value: loanAmount, name: 'loanAmount', subheader: `${remainingPayments} payments to pay off` }, 
      { label: "Payment", value: payment, name: 'payment', subheader: `$${minPay}`},    
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
