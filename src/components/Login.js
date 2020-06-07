import React, { Component } from 'react';
import Axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    clearForm(){
        this.setState({
            email: '', password: '', err: ''
        });
    }

    handleSubmit(e){
        this.setState({
            loading: true
        });
        e.preventDefault();

        const { email, password } = this.state;
        Axios.post('http://127.0.0.1:5000/api/user/login', { email, password })
            .then(token => {
                this.clearForm();
                localStorage.setItem('auth-token', token.data);
                this.props.history.push('/profile');
            }).catch(err => err.request ? this.setState({ error: err.request.response.replace(/[\\"]/g, ''), loading: false}) : err);
        
        this.setState({
            loading: true
        });
    }

    render() {
        return (
            <div className='login-container'>
                <form>
                    <h1>Sign in</h1>
                    <div className="form-row">
                        <label htmlFor="email">email:</label>
                        <input type="text" placeholder='jonny1' name='email' value={this.state.email} onChange={this.handleOnChange} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="password">password:</label>
                        <input type="password" placeholder='password' name='password' value={this.state.password} onChange={this.handleOnChange} />
                    </div>

                    <div className="form-row">
                        <button type='submit' className="btn btn-primary" onClick={this.handleSubmit} disabled={this.state.loading}>Sign in</button>
                    </div>

                    <p>{this.state.error}</p>
                </form>
            </div>
        );
    }
}

export default Login;