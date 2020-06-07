import React, { Component } from 'react';
import Axios from 'axios';

class Profile extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            authUser: ''
        }

        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignOut(){
        localStorage.removeItem('auth-token');
        this.props.history.push('/');
    }
    
    componentDidMount() {
        Axios.get('http://127.0.0.1:5000/api/profile', {
            headers: {
                'auth-token': localStorage.getItem('auth-token')
            }
        })
            .then(({ data }) => {
                this.setState({
                    authUser: data.user
                });
                // console.log(this.state.authUser)
            }).catch(err => {
                // if(err.request){
                //     return console.log(err.request.response);
                // } else //(err.request.response === 'Invalid Token'){

                    localStorage.removeItem('auth-token');
                    this.props.history.push('/');

                // } else{
                    return '';
                }
            );
    }
    
    render() {
        return (
            <div>
                <h2>Welcome {this.state.authUser.name}</h2>
                <p>Email:  {this.state.authUser.email}</p>
                <button type='submit' className="btn" onClick={this.handleSignOut}>Sign out</button>
            </div>
        );
    }
}

export default Profile;