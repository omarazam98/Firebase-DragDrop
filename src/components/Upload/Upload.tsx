import * as React from 'react';
import Firebase, {withFirebase} from '../Firebase';
import {ChangeEvent} from "react";
import * as firebase from 'firebase'
import Dragdrop from "./Dragdrop";
import './Upload.css';
import CheckboxWithLabel from "../CheckboxTest/checkboxTest";


class UploadBase extends React.Component<any, any> {
    docPathDB: String;
    docPathStorage: String;

    constructor(props: Firebase) {
        super(props);
        this.docPathDB = "Files/documentTest/";
        this.docPathStorage = "test/documents/";
        this.state = {
            userName: 'userX',
            uploading: false,
            uploaded: false,
            percent: 0,
            file: '',
            error: null
        }
    }

    handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({uploaded: false})
        this.setState({file: e.target.files![0]})

    }

    handleDropSelect = (files: FileList) => {
        this.setState({uploaded: false})
        this.setState({file: files[0]})
    }


    uploadFile = () => {
        this.setState({uploading: true});
        const file = this.state.file;

        const storageRef = this.props.firebase.storage.ref(this.docPathStorage + file.name);
        const task = storageRef.put(file);
        task.on('state_changed',
            function progress(snapshot: firebase.storage.UploadTaskSnapshot) {
                const uploader = document.getElementById("uploader") as HTMLProgressElement;
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
                console.log(percentage);
            }, function error(err: Error) {
                console.log(err);
            }, () => {
                this.setState({uploaded: true});
                this.setState({uploading: false});
                console.log("Uploaded file to " + 'users/'+ this.state.userName + '/' + this.docPathDB);
                task.snapshot.ref.getDownloadURL().then((downloadURL: String) => {
                    this.props.firebase.db.doc('users/'+ this.state.userName + '/' + this.docPathDB).set(
                        {
                            URL: downloadURL
                        }
                    );
                });
            });
    }

    render() {
        return (
            <div>
                <h1>Uploading Page</h1>
                <p>This page is to test uploading</p>

                <Dragdrop handleDrop={this.handleDropSelect}>
                <div className='container'>
                    <div className='form'>
                        <div>
                            <label htmlFor="fileButton" className="btn">Choose file or drop here</label>
                            <input type="file" id="fileButton" onChange={this.handleFileSelect}/>
                        </div>
                        <div>
                            {this.state.uploading && <progress value="0" max="100" id="uploader">0%</progress>}
                            {this.state.uploaded && <p id='checkmark' style={{display: "inline"}}>&#9989;</p>}
                        </div>
                        {this.state.file && <p>{this.state.file.name}</p>}
                        {this.state.file && <button id ="uploadButton" onClick={this.uploadFile}>Upload</button>}
                    </div>
                    <code>
                        {this.state.error ? <span className='error'>this.state.error</span> : null}
                    </code>
                </div>
            </Dragdrop>
            </div>
        );
    }
}

const Upload = withFirebase(UploadBase);

export default Upload;