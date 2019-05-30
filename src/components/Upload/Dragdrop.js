import * as React from 'react';
import './DragDrop.css';

class Dragdrop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {dragging: false};
        this.dragCounter = 0;
        this.dropRef = React.createRef()
    }

    handleDrag = e => {
        e.preventDefault();
        e.stopPropagation()
    };
    handleDragIn = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        console.log('entered drag event dragin');
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({
                dragging: true
            })
        }
    };

    handleDragOut = e => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if (this.dragCounter === 0)
            this.setState({dragging: false})
    };

    handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dragging: false});
        this.props.handleDrop(e.dataTransfer.files)
    };

    componentDidMount() {
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop);
    }

    componentWillUnmount() {
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop)
    }


    render() {
        return (
            <div id = 'dropZone' ref={this.dropRef}>
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
        )
    }
}

export default Dragdrop;
