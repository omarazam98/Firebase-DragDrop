import React from 'react';
import { Upload } from '../../components/Upload/Upload';
import { shallow } from 'enzyme'


let wrapper;

beforeEach(() => {
    wrapper = shallow(
        <Upload/>);
});

test('has a valid snapshot', () => {
    expect(wrapper).toMatchSnapshot();
});

it('Select file changes state', () => {
    const file = new File(["Hello World"], "file.txt");
    expect(wrapper.state('file')).toBeDefined();
    const mockEvent = {
        target: {
            files: [
                file
            ]
        }};
    expect(wrapper.state.file).toBeUndefined();
});

it('Clicking upload button calls uploadFile', () => {
    const f = new File(["Hello World"], "file.txt");
    const spy = jest.spyOn(wrapper.instance(), 'uploadFile');
    wrapper.setState({file: f});
    wrapper.find('#uploadButton').simulate('click');
    expect(spy).toHaveBeenCalled();
});