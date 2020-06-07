import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import Axios from 'axios';
// import jwt from 'jsonwebtoken';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            isValidAccess: ''
        }        
    }    

    componentDidMount(){
        let token = localStorage.getItem('auth-token');
        if(!token) 
            return this.props.history.push('/');
        else
            this.setState({
                loading: false
            });
    }

    render() {
        if(this.state.loading)
            return <div><p>{"Loading..."}</p></div>;
        else
            return (
                <div>
                    {this.props.children}
                </div>
            );
    }
}

export default withRouter(Auth);