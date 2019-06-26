import React from 'react';
import './index.css';
import { withAPI } from '@winwin/api-firebase';

interface PaymentMethods {
  type: string,
  number: number,
  main: boolean,
}

interface UserType {
  displayName: string,
  uid: string,
}

interface PaymentState {
  paymentMethods: PaymentMethods[] | undefined;
  user: UserType | undefined;
}
const INITIAL_STATE = {
  paymentMethods: undefined,
  user: undefined,
}
export class PaymentCard extends React.Component<any,PaymentState>{
  constructor(props){
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillMount() {
    const user = this.props.api.auth.currentUser();
    if (user) {
      this.props.api.data.users.getPaymentMethods(user.uid).then((payments) => {
        this.setState(() => {
          return {
            paymentMethods: payments,
            user,
          }
        })
      });
    }
  }

  render(){
    let mainPayment;
    if(this.state.paymentMethods) {
      mainPayment = this.state.paymentMethods.find(x => x.main);
    }
    return(
      <div className='credit-card'>
        <div className='credit-card__logo'>Win-Win Payment Method</div>
        <div className='credit-card__number'>
          {mainPayment && "XXXX XXXX XXXX " + mainPayment.number}
        </div>

        <div className='credit-card__info'>
          <div className='credit-card__info_name'>
            <div className='credit-card__info_label'>CARDHOLDER'S NAME</div>
            <div>{this.state.user && this.state.user.displayName}</div>
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
