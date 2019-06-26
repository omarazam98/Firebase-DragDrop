import React from 'react';
<<<<<<< refs/remotes/origin/integration
import { withAPI } from '@winwin/api-firebase';
import { Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface PaymentMethods {
  type: string;
  number: number;
}

interface PaymentProps {
  api: any;
  classes: any;
}

interface PaymentState {
  paymentMethod: PaymentMethods | undefined;
  user: UserType | undefined;
  isMounted: boolean;
}

const INITIAL_STATE = {
  paymentMethod: undefined,
  user: undefined,
  isMounted: false,
};

export const styles = {
  card: {
    width: '50vw',
    height: '32vw',
    padding: '25px',
    borderRadius: '15px',
    maxWidth: '400px',
    maxHeight: '250px',
    color: 'white',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
    backgroundImage: 'linear-gradient(25deg, #0f509e, #1399cd)',
    position: 'relative' as 'relative',
  },
  title: {
    fontSize: 14,
  },
  number: {
    display: 'flex',
    fontFamily: '"Arial", sans-serif',
    fontSize: '2em',
    position: 'absolute' as 'absolute',
    top: '40%',
  },
  info: {
    position: 'absolute' as 'absolute',
    bottom: '1vw',
  },
  name: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: '"Arial", sans-serif',
    fontSize: '2em',
  },
  label: {
    fontSize: '1em',
  },
  changeButton: {
    position: 'absolute' as 'absolute',
    right: '1vw',
    bottom: '1vw',
    variant: 'contained',
  },
};

export class PaymentCard extends React.Component<PaymentProps, PaymentState>{
  unsubscribe;
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
    } else {
      this.setState(INITIAL_STATE);
    }
  }

  render() {
    return(
      <div>
        <Card className={this.props.classes.card}>
          <CardContent>
              <Typography className={this.props.classes.title} color="textPrimary">
                Win-Win Payment Method
              </Typography>
              <Typography className={this.props.classes.number} color="textPrimary">
                {this.state.paymentMethod && `XXXX XXXX XXXX ${this.state.paymentMethod.number}`}
              </Typography>
            <div className={this.props.classes.info}>
              <Typography className={this.props.classes.label} color="textPrimary">
                CARDHOLDER'S NAME
              </Typography>
              <Typography className={this.props.classes.name} color="textPrimary">
                {this.state.user && this.state.user.displayName}
              </Typography>
            </div>

          </CardContent>
          <CardActions>
            <Button className={this.props.classes.changeButton} variant="contained">Change</Button>
          </CardActions>
        </Card>
=======
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

>>>>>>> Added sample card
      </div>
    );
  }
}

export default withAPI(PaymentCard);
