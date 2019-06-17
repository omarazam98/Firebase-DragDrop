import React from 'react';
import { Upload } from '../../components/Upload/Upload';
import { shallow } from 'enzyme'


let wrapper;
let mockEvent;

beforeEach(() => {
    wrapper = shallow(
        <Upload/>);
});

it('has a valid snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});

it('File not added to state if invalid type', () => {
    const file = new File(["Hello World"], "file.txt");
    mockEvent = {
        target: {
            files: [
                file
            ]
        }};
    wrapper.instance().handleFileSelect(mockEvent);
    expect(wrapper.state('file')).toBeNull();
    expect(wrapper.state('error').message).toBe('File type not accepted')
});

it('Clicking upload button calls uploadFile', () => {
    const f = new File(["Hello World"], "file.txt");
    const spy = jest.spyOn(wrapper.instance(), 'uploadFile');
    wrapper.setState({file: f});
    wrapper.find('#uploadButton').simulate('click');
    expect(spy).toHaveBeenCalled();
});