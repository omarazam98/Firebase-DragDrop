import React from 'react';
import { shallow } from 'enzyme';
import Dragdrop from '../../components/Upload/Dragdrop';

let wrapper;
let testFile;
let mockEvent;
let options;
let mockDrop;

beforeAll(() => {
  options = {
    lifecycleExperimental: false,
    disableLifecycleMethods: true,
  };
  testFile = new File([], 'test');
  mockEvent = {
    preventDefault: () => {
    },
    stopPropagation: () => {
    },
    dataTransfer: {
      files: testFile,
      items: 'test',
    },
  };
  mockDrop = jest.fn(() => true);
});

test('has a valid snapshot', () => {
  const wrapper = shallow(
    <Dragdrop/>, options);
  expect(wrapper).toMatchSnapshot();
});

describe('Dragdrop child components test', () => {
  it('should render passed child component', () => {
    const wrapper = shallow(<Dragdrop>
      <div id={'DragdropForm'}/>
    </Dragdrop>,            options);
    expect(wrapper.contains(<div id="DragdropForm"/>)).toEqual(true);
  });
});

describe('handleDragIn and handleDragOut', () => {
  it('drag in should set dragging to true', () => {
    wrapper = shallow(<Dragdrop><div/></Dragdrop>, options);
    wrapper.instance().handleDragIn(mockEvent);
    expect(wrapper.state('dragging')).toBeTruthy();
  });

  it('drag out should set dragging to false', () => {
    wrapper.instance().handleDragOut(mockEvent);
    expect(wrapper.state('dragging')).toBeFalsy();
  });
});

describe('handleDrop', () => {
  it('should set dragging to false and calls mockDrop function', () => {
    wrapper = shallow(<Dragdrop handleDrop={mockDrop}><div/></Dragdrop>, options);
    wrapper.setState({ dragging: true });
    wrapper.instance().handleDrop(mockEvent);
    expect(wrapper.state('dragging')).toEqual(false);
    expect(mockDrop).toHaveBeenCalled();
  });
});
