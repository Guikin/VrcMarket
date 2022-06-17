import { Component } from "react";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // 1. POST user data to server
      const fetchResponse = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name, 
          email: this.state.email, 
          password: this.state.password
        })
      })
      // 2. Check fetchResponse before moving on
      if (!fetchResponse.ok) throw new Error('Fetch Failed - Bad Request ' + fetchResponse.status)
      
      // 3. decode our fetch reponse (resolve) to get our jwt
      let token = await fetchResponse.json()
      // 4. Stick token into localstorage
      localStorage.setItem('token', token)
      // 5. Grab user doc from token, and set to state
      const userDoc = JSON.parse(atob(token.split('.')[1])).user
      this.props.setUserInState(userDoc)

    } catch (err) {
      console.log("SignupForm error", err);
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div className="">
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label className="lead" >Name</label>
            <input className='form-control bg-dark text-light'
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
            <label className="lead">Email</label>
            <input className='form-control bg-dark text-light'
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
            <label className="lead">Password</label>
            <input className='form-control bg-dark text-light'
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
            <label className="lead">Confirm</label>
            <input className='form-control bg-dark text-light'
              type="password"
              name="confirm"
              value={this.state.confirm}
              onChange={this.handleChange}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={disable}>
              SIGN UP
            </button>
          </form>
        </div>
        <p className="error-message text-danger lead">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}