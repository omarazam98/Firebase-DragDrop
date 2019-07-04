import React, { Component } from 'react';
import SimpleAccordion from './SimpleAccordion';
import TextInputForm from './TextInputForm';

interface FrequentQuestionsProps {
  questionList :PairType[];
  handleSubmit: any;
}
interface FrequentQuestionsState {
  question: string;
  userEmail: string;
  isQuestionAsked: boolean;
  touched: {};
}
const INITIAL_STATE:FrequentQuestionsState = {
  question: '',
  userEmail: '',
  isQuestionAsked: false,
  touched: {},
}

interface PairType {
  question: string;
  answer: string;
}

export class FrequentQuestions extends Component<FrequentQuestionsProps, FrequentQuestionsState> {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = INITIAL_STATE;
  }

  handleSubmit (event) {
    event.preventDefault();
    try {
      if (this.state.userEmail !== '') {
        this.props.handleSubmit(this.state.question, this.state.userEmail);
      } else {
        this.props.handleSubmit(this.state.question);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState(prevState => ({
        isQuestionAsked: true,
        question: '',
        userEmail: '',
      }));
    }
  }

  handleBlur (event) {
    const target = event.target;
    const name = target.name;
    this.setState(prevState =>
      ({
        touched: {
          ...prevState.touched,
          [name]: true,
        },
      }));
  }

  handleChange (event) {
    const target = event.target;
    const value = event.target.value;
    target.id === 'mui-theme-provider-outlined-input-question' ?
      this.setState(prevState => ({
        question: value,
      }))
      :
      this.setState(prevState => ({
        userEmail: value,
      }));
  }

  render () {
    const textInputState = {
      userEmail: this.state.userEmail,
      questionValue: this.state.question,
      isQuestionAsked: this.state.isQuestionAsked,
      userEmailLabel: 'Your Email (Not Required)',
      questionLabel: 'Ask us your question',
      prompt: 'Don\'t see your question? feel free to ask ' +
        'us whatever you would like and we will add it to our list',
      afterSubmit: 'Thank you for asking your question, we will be ' +
        'sure to get back to you very soon',
      submitLabel: 'Ask Question',
    }
    return(
      <div>
        <h1>Frequently Asked Questions</h1>
        {this.props.questionList.map((pair, index) => (
          <SimpleAccordion
            title={pair.question}
            body={pair.answer}
            key={index}
            style={{ maxWidth:300 }} />
        ))}
        <TextInputForm
          state={{ ...textInputState }}
          handleSubmit={this.handleSubmit}
          handleBlur={this.handleBlur}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}

export default FrequentQuestions;
