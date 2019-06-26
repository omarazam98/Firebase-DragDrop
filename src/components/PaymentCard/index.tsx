import React from 'react';
import './index.css';
import { withAPI } from '@winwin/api-firebase';

export class PaymentCard extends React.Component<any, any>{
  constructor(props){
    super(props);
  }
  render(){
    if (this.props.api.auth.currentUser()) {
      console.log(this.props.api.auth.currentUser())
    }
    return(
      <div className='credit-card'>
        <div className='credit-card__logo'>Logo</div>

        <div className='credit-card__number'>XXXX XXXX XXXX 2516</div>

        <div className='credit-card__info'>
          <div className='credit-card__info_name'>
            <div className='credit-card__info_label'>CARDHOLDER'S NAME</div>
            <div>{this.props.api.auth.currentUser() && this.props.api.data.users.getName()}</div>
          </div>

          <div className='credit-card__info_expiry'>
            <button>Change</button>
          </div>
        </div>

      </div>
    );
  }
}

export default withAPI(PaymentCard);
