import React, { Component} from 'react';
import './App.css';

class FormClass extends Component{
  state = {
    // userInput : "",
    username : "",
    password : "",

  }

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({[e.target.name] : e.target.value});
  }


  onSubmit =(e) => {
    e.preventDefault();
    console.log(`onsubmit fire`);
    this.setState({ 
      username: "",
      password: "",
    });
  }


  render() {
    const { username: userName, password} = this.state;
    return (
      <div>
        <h1>User name: {userName}</h1>
        <h1>password: {password}</h1>
        <form className="form" onSubmit={this.onSubmit}>
          <input type="text"
            value={ userName}
            onChange={this.onChange} 
            name="username"      
          />
          <input type="text"
            value={ password}
            onChange={this.onChange}     
            name="password"  
          />
          <button type="submit">Submit it</button> 

        </form>
      </div>
    )
  }

}
export default FormClass;