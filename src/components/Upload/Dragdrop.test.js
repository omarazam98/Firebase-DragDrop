import React from "react";
import {shallow, default as wrapper} from "enzyme/build";
import Dragdrop from "./Dragdrop";
import { configure } from "enzyme/build";
import Adapter from "enzyme-adapter-react-16/build";
configure({ adapter: new Adapter() });

describe("handleDragIn", ()=>{
        it("should call setState on dragging",() => {
            const mockRef = React.createRef();
            const options = {
                lifecycleExperimental: false,
                disableLifecycleMethods: true
            };
            const wrapper = shallow(<Dragdrop ref={mockRef}><div/></Dragdrop>, options);
            const mockEvent = {
                preventDefault: () => { },
                stopPropagation: () => { },
            dataTransfer:{
                    items: "s",
                }
            };

            const expected = {
                dragging: true
            };
            wrapper.instance().handleDragIn(mockEvent);
            expect(wrapper.state()).toEqual(expected)
        });
    });

