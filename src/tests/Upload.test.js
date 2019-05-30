import React from 'react';
import UploadBase from '../components/Upload/Upload';
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

configure({adapter: new Adapter()})
test('has a valid snapshot', () => {
  const wrapper = shallow(
      <UploadBase/>);
  expect(wrapper).toMatchSnapshot();
});


it('Select file renders more buttons', () => {
  const wrapper = shallow(<UploadBase/>);
  const f = new File(["Hello World"], "file.txt");
  wrapper.setState({file: f});
  expect(wrapper.state('file')).toBeDefined();
});


