import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'


class EmailRedirect extends Component<any, any> {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        this.props.history.push('/login');
    }
    render(){
        return (
            <div>
            Email has been sent to verify account. <br/>
                Already verified?
                <button onClick={this.handleClick}> Log In</button>
            </div>
        );
    }
}
export default withRouter(EmailRedirect);
