import React from "react";
import {shallow, default as wrapper} from "enzyme/build";
import Dragdrop from "../components/Upload/Dragdrop";
import {configure} from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";

configure({adapter: new Adapter()});

test('has a valid snapshot', () => {
    const options = {
        lifecycleExperimental: false,
        disableLifecycleMethods: true
    };
    const wrapper = shallow(
        <Dragdrop/>, options);
    expect(wrapper).toMatchSnapshot();
});

describe("Dragdrop child components test", () => {
    it("should render passed child component", () => {
        const options = {
            lifecycleExperimental: false,
            disableLifecycleMethods: true
        };
        const wrapper = shallow(<Dragdrop>
            <div id={"DragdropForm"}/>
        </Dragdrop>, options);
        expect(wrapper.contains(<div id="DragdropForm"/>)).toEqual(true);

    });
});

describe("handleDragIn and handleDragOut", () => {
    let wrapper;
    it("should call setState on dragging setting it to true", () => {
        const options = {
            lifecycleExperimental: false,
            disableLifecycleMethods: true
        };
        wrapper = shallow(<Dragdrop>
            <div/>
        </Dragdrop>, options);
        const mockEvent = {
            preventDefault: () => {
            },
            stopPropagation: () => {
            },
            dataTransfer: {
                items: "test",
            }
        };

        const expected = {
            dragging: true
        };
        wrapper.instance().handleDragIn(mockEvent);
        expect(wrapper.state()).toEqual(expected)
    });

    it("should call setState on dragging setting it to false", () => {

        const mockEvent = {
            preventDefault: () => {
            },
            stopPropagation: () => {
            },
        };
        const expected = {
            dragging: false
        };
        wrapper.instance().handleDragOut(mockEvent);
        expect(wrapper.state()).toEqual((expected))
    });
});

describe("handleDrop", () => {
    let wrapper;
    let mockDrop;
    let testFile = new File([], "test");
    it("should set dragging to false and calls mockDrop function", () => {
        const options = {
            lifecycleExperimental: false,
            disableLifecycleMethods: true
        };
        mockDrop = jest.fn(() => true);
        wrapper = shallow(<Dragdrop handleDrop={mockDrop}>
            <div/>
        </Dragdrop>, options);
        wrapper.setState({dragging: true});

        const mockEvent = {
            preventDefault: () => {
            },
            stopPropagation: () => {
            },
            dataTransfer: {
                files: testFile
            }
        };

        const expectedState = {
            dragging: false
        };

        wrapper.instance().handleDrop(mockEvent);
        expect(wrapper.state()).toEqual(expectedState);
        expect(mockDrop).toHaveBeenCalled();

    });
});