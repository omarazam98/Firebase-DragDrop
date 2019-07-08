import * as React from 'react';
import './DragDrop.css';

interface DragdropState {
  draggingFile: boolean;
  dragging: boolean;
}

const INITIAL_STATE: DragdropState = {
  draggingFile: false,
  dragging: false,
};

class Dragdrop extends React.Component<any, DragdropState> {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnter = this.handleDragEnter.bind(this);
    this.handleDragExit = this.handleDragExit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrag(e) {
    // stops browser from its default action of opening a file
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState((prevState, props) => {
      return { dragging: true };
    });
    // Only change the state of dragging if user is dragging a file
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState((prevState, props) => {
        return { draggingFile: true };
      });
    }
  }

  handleDragExit(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState(
      (prevState, props) => {
        return { dragging: false };
      },
      () => {
        if (!this.state.dragging) {
          this.setState((prevState, props) => ({ draggingFile: false }));
        }
      });
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    // when file is dropped dragging is done
    this.setState(() => {
      return {
        draggingFile: false,
      };
    });
    // passes files to handleDrop method in props
    this.props.handleDrop(e.dataTransfer.files);
  }

  componentDidMount() {
    const div = document.getElementById('dropZone');
    if (div) {
      div.addEventListener('dragenter', this.handleDragEnter);
      div.addEventListener('DragExit', this.handleDragExit);
      div.addEventListener('dragover', this.handleDrag);
      div.addEventListener('drop', this.handleDrop);
    }
  }

  componentWillUnmount() {
    const div = document.getElementById('dropZone');
    if (div) {
      div.removeEventListener('dragenter', this.handleDragEnter);
      div.removeEventListener('DragExit', this.handleDragExit);
      div.removeEventListener('dragover', this.handleDrag);
      div.removeEventListener('drop', this.handleDrop);
    }
  }

  render() {
    return (
      <div id = "dropZone">
        {this.state.draggingFile &&
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
