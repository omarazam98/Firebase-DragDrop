import React from 'react';
import {UploadBase} from '../components/Upload/Upload';
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import {configure} from 'enzyme';

configure({adapter: new Adapter()})

let wrapper;
beforeEach(() => {
    wrapper = shallow(
        <UploadBase/>);
});

test('has a valid snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});

it('Select file changes state', () => {
    const f = new File(["Hello World"], "file.txt");
    wrapper.setState({file: f});
    expect(wrapper.state('file')).toBeDefined();

});

it('Clicking upload button calls uploadFile', () => {
    const f = new File(["Hello World"], "file.txt");
    const spy = jest.spyOn(wrapper.instance(), 'uploadFile');
    wrapper.setState({file: f});
    wrapper.find('#uploadButton').simulate('click');
    expect(spy).toHaveBeenCalled();
});