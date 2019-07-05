import React from 'react';
import './index.css';
import { withAPI } from '@winwin/api-firebase';

interface PaymentMethods {
  type: string;
  number: number;
}

interface UserType {
  displayName: string;
  uid: string;
}
interface PaymentProps {
  api: any;
}
interface PaymentState {
  paymentMethod: PaymentMethods | undefined;
  user: UserType | undefined;
}
const INITIAL_STATE = {
  paymentMethod: undefined,
  user: undefined,
};

export class PaymentCard extends React.Component<PaymentProps, PaymentState>{
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const user = this.props.api.auth.currentUser();
    if (user) {
      this.props.api.data.users.getPaymentMethods(user.uid).then((payments) => {
        this.setState(() => {
          return {
            user,
            paymentMethod: payments,
          };
        });
      });
    }
  }

  render() {
    return(
      <div className="credit-card">
        <div className="credit-card__logo">Win-Win Payment Method</div>
        <div className="credit-card__number">
          {this.state.paymentMethod && `XXXX XXXX XXXX ${this.state.paymentMethod.number}`}
        </div>

        <div className="credit-card__info">
          <div className="credit-card__info_name">
            <div className="credit-card__info_label">CARDHOLDER'S NAME</div>
            <div>{this.state.user && this.state.user.displayName}</div>
          </div>

          <div className="credit-card__info_expiry">
            <button>Change</button>
          </div>
        </div>

      </div>
    );
  }
}

export default withAPI(PaymentCard);
