import { shallow, mount } from 'enzyme';
import  { FrequentQuestions } from '../../components/FrequentlyAskedQuestions/FrequentQuestions';
import { frequentQuestionsList } from '../fixtures/frequentQuestions';
import * as React from 'react';

let handleSubmit;
beforeEach(() => {
  handleSubmit = jest.fn();
});

test('Should render frequently asked questions with basic question list', async () => {
  const wrapper = shallow(<FrequentQuestions
    questionList={frequentQuestionsList}
    handleSubmit={handleSubmit} />);
  expect(wrapper).toMatchSnapshot();
  const numQuestions = wrapper.find('SimpleAccordion').length;
  expect(numQuestions).toBe(16);
});

test('Should submit question with inserted question text', async () => {
  const wrapper = mount(<FrequentQuestions
    questionList={frequentQuestionsList}
    handleSubmit={handleSubmit} />);
  const textField = wrapper.find('#mui-theme-provider-outlined-input-question').first();
  await(textField.props().onChange(
    { target: { value: 'Test question?', id:'mui-theme-provider-outlined-input-question' } },
    ));
  console.log(wrapper);
  const e = { preventDefault: jest.fn() };
  wrapper.find('form').first().simulate('submit', e);
  expect(handleSubmit).toHaveBeenCalledWith('Test question?');
});
