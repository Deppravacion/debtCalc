import React, { Component} from 'react';
import './App.css';

class FormClass extends Component{
  state = {
    // userInput : "",
    username : "",
    password : "",
    totalDebt: "",
    interestRate: "",
    

  }

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit =(e) => {
    e.preventDefault();
    console.log(`onsubmit fire`);
    this.setState({ 
      username: "",
      password: "",
      totalDebt: "",
      interestRate: "",
    });
  }

  render() {
    const { username: userName, password, totalDebt, interestRate} = this.state;
    return (
      <div>

        <form className="form" onSubmit={this.onSubmit}>
          <label>username</label>
          <input type="text"
            value={ userName}
            onChange={this.onChange} 
            name="username"      
            />
            <br />
            <label>password</label>
          <input type="text"
            value={ password}
            onChange={this.onChange}     
            name="password"  
            />
            <br />
            <label>totalDebt</label>
          <input type="text"
            value={ totalDebt}
            onChange={this.onChange}     
            name="totalDebt"  
            />
            <br />
            <label>int. Rate</label>
          <input type="text"
            value={ interestRate}
            onChange={this.onChange}     
            name="interestRate"  
          />
          
            <br />
          <button type="submit">Submit it</button> 
            <br />

        </form>
      </div>
    )
  }

}
export default FormClass;