import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import Upload from './components/Upload/Upload';
import { shallow } from 'enzyme'
import {configure} from 'enzyme';
import {mount} from 'enzyme';
import {render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckboxWithLabel from "./components/CheckboxTest/checkboxTest";
configure({ adapter: new Adapter() });

describe('<Upload />', () => {
  test('has a valid snapshot', () => {
    const component = shallow(
          <Upload /> );
    expect(component).toMatchSnapshot();
  });

  it('renders children when passed in', () => {
    const component = shallow(
        <Upload/>
    );
    console.log(component.find('div'));
    expect(component.contains( <h1>
          Uploading Page
        </h1>
    )).toEqual(true);
  });
});