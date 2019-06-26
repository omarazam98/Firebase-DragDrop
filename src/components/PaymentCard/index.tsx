import React from 'react';
import './index.css';

export class PaymentCard extends React.Component<any, any>{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className='credit-card'>
        <div className='credit-card__logo'>Logo</div>

        <div className='credit-card__number'>XXXX XXXX XXXX 2516</div>

        <div className='credit-card__info'>
          <div className='credit-card__info_name'>
            <div className='credit-card__info_label'>CARDHOLDER'S NAME</div>
            <div>MATT SMITH</div>
          </div>

          <div className='credit-card__info_expiry'>
            <div className='credit-card__info_label'>VALID UP TO</div>
            <div>06/2027</div>
          </div>
        </div>

      </div>
    );
  }
}

export default PaymentCard;
