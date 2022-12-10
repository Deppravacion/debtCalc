import React from "react";
import PaymentHistory from "./PaymentHistory";


class DebtForm extends React.Component {
  constructor() {
    super();
    this.state = { 
      text: '', 
      items: [],
      name: '',
     };
  }

  handleChange = ({ target: { value}}) => this.setState({ text: value });

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      text: this.state.text,
      id: Date.now(),
    }

    this.setState((state) => ({ 
      items: [...state.items, newItem],
      text: '',
      name: newItem.text,
    }));
  }

  render() {
    return (
      <div>
        <h2>form comp</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newPayment">Enter payment</label>
          <br />
          <input 
          onChange={this.handleChange} 
          type="text"
          autoComplete="off"
          value={this.state.text}
          />   
          <button>Pay</button>
          <br />

          <label htmlFor="totalDebt">Enter total debt</label>
          <br />
          <input 
          onChange={this.handleChange} 
          type="text"
          autoComplete="off"
          value={this.state.text}
          />

        </form>       

        <PaymentHistory info={this.state}/>
    

      </div>
    )    
  }
}

export default DebtForm;