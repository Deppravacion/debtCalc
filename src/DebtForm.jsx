import React from "react";


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
        <h2>Debt Free Calculator</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newTodo">What needs to be done?</label>
          <br />
          <input 
          onChange={this.handleChange} 
          type="text"
          autoComplete="off"
          value={this.state.text}
          />   
          <button>Add #!</button>
          <br />
        </form>        
        
    

      </div>
    )    
  }
}

export default DebtForm;