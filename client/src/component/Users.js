import React, { Component } from 'react';

class Users extends Component {
  constructor() {
    super()
    this.registerUserName = React.createRef()
    this.registerPassword = React.createRef()
    this.loginUserName = React.createRef()
    this.loginPassword = React.createRef()

    this.state = {
      users: [],
      secret: null
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/users")
      .then(response => response.json())
      .then(result => this.setState({ users: result}))
      .catch(err => console.log(err))
  }

  async handleAddUser() {
    const userName = this.registerUserName.current.value
    const password = this.registerPassword.current.value

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName, password })
      })
      const result = await response.json()
      if (response.status === 200) {
        // result = new user
        this.setState({ users: [...this.state.users, result] })
      } else {
        // result = {error: "User with the same name already exists"}
        alert(result.error)
      }
    } catch (err) {
      console.log(err);
    }
  }

  async handleLogin() {
    const userName = this.loginUserName.current.value
    const password = this.loginPassword.current.value

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password })
      })
      const result = await response.json()
      if (response.status === 200) {
        this.setState({ secret: result.secret })
      } else {
        alert(result.error)
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>

        <div>
          <h1>Add user</h1>
          Name: <input type="text" ref={this.registerUserName} />
          <br />
          Password: <input type="text" ref={this.registerPassword} />
          <br />
          <button onClick={() => this.handleAddUser()}>Add user</button>
        </div>

        <div>
          <h1>Login</h1>
          Name: <input type="text" ref={this.loginUserName} />
          <br />
          Password: <input type="text" ref={this.loginPassword} />
          <br />
          <button onClick={() => this.handleLogin()}>Login</button>
        </div>

        {this.state.secret && <h2>Secret is: {this.state.secret}</h2>}

        {this.state.users.length > 0 &&
          <div className="users-list">
            <h1>Users list</h1>
            {this.state.users.map(u =>
              <div>{u.id} - {u.name}</div>
            )}
          </div>
        }
      </div>
    );
  }
}

export default Users;