import * as React from 'react';
import './DragDrop.css';

interface DragdropState {
  dragging: boolean;
  dragCounter: number;
}

const INITIAL_STATE: DragdropState = {
  dragging: false,
  dragCounter: 0,
};

class Dragdrop extends React.Component<any, DragdropState> {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragIn = this.handleDragIn.bind(this);
    this.handleDragOut = this.handleDragOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrag(e) {
    // stops browser from its default action of opening a file
    e.preventDefault();
    e.stopPropagation();
  }

  /*handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();
    // Only change state if there's a file
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState(() => {
        return {
          dragging: true,
          dropped: true,
        };
      });
    }
  }

  handleDragOut(e) {
    e.preventDefault();
    if (!this.state.dropped) {
      this.setState(() => {
        return {dragging: false};
      })
    }
  }*/

  handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState((prevState, props) => {
      return {dragCounter: (prevState.dragCounter + 1)}
    });
    // Only change the state of dragging if user is dragging a file
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState((prevState, props) => {
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
    // when file is dropped dragging is done
    this.setState(() => {
      return {
        dragging: false,
      }
    });
    // passes files to handleDrop method in props
    this.props.handleDrop(e.dataTransfer.files);
  }

  componentDidMount() {
    const div = document.getElementById('dropZone');
    if (div) {
      div.addEventListener('dragenter', this.handleDragIn);
      div.addEventListener('dragleave', this.handleDragOut);
      div.addEventListener('dragover', this.handleDrag);
      div.addEventListener('drop', this.handleDrop);
    }
  }

  componentWillUnmount() {
    const div = document.getElementById('dropZone');
    if (div) {
      div.removeEventListener('dragenter', this.handleDragIn);
      div.removeEventListener('dragleave', this.handleDragOut);
      div.removeEventListener('dragover', this.handleDrag);
      div.removeEventListener('drop', this.handleDrop);
    }
  }

  render() {
    return (
      <div id = "dropZone">
        {this.state.dragging &&
        <div id="dropGuide">
            <div id="dropHelpLabel">
                DROP HERE
            </div>
            <div>

            </div>
        </div>
        }
        {this.props.children}
      </div>
    );
  }
}

export default Dragdrop;
