import * as React from 'react';
import './DragDrop.css';

interface DragdropState {
    dragging: boolean; // state that keeps track of if cursor is over dragdrop area
    dragCounter: number; // used to control dragging state and css of drop div's
};

const INITIAL_STATE: DragdropState = {
    dragging: false,
    dragCounter: 0,
};

export class Dragdrop extends React.Component {

    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
        this.dropRef = React.createRef() // ref created for drop div
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragIn = this.handleDragIn.bind(this);
        this.handleDragOut = this.handleDragOut.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrag(e) {
        e.preventDefault(); // these 2 lines of coded are found in each handler function, stops browser from its default action of opening a file
        e.stopPropagation()
    };

    handleDragIn(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState(function (prevState, props) {
            return {dragCounter: (prevState.dragCounter + 1)} // when cursor on drag area the counter == 1, this changes the state
        });
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) { // Only changes the state of dragging if user is dragging a file
            this.setState(function (prevState, props) {
                return {dragging: true}
            });
        }
    };

    handleDragOut(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState(function (prevState, props) {
            return {dragCounter: (prevState.dragCounter - 1)} // when cursor on drag area the counter == 1, this changes the state
        }, () =>{
            if (this.state.dragCounter === 0) { // cursor leaves, counter == 0 dragging is set to false
                this.setState(function (prevState, props) {
                    return {dragging: false}
                });
            }
        });

    };

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState(function (prevState, props) {
            return {dragging: false} // when file is dropped dragging is done
        });
        this.props.handleDrop(e.dataTransfer.files) // passes files to handleDrop method in props that can be accessed by this components parent
    };

    componentDidMount() {
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn); // add event listeners to core events found in div docs
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop)
    }

    render() {
        return (
            <div id = 'dropZone' ref={this.dropRef}>
                {this.state.dragging && // conditional rendering (when state is in dragging)
                <div id="dropGuide">
                    <div id="dropHelpLabel">
                        DROP HERE
                    </div>
                </div>
                }
                {this.props.children}
            </div>
        )
    }
}

export default Dragdrop;
