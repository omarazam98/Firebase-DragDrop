import * as React from 'react';
import Firebase, {withFirebase} from '../Firebase';
import {ChangeEvent} from "react";
import * as firebase from 'firebase'
import Dragdrop from "./Dragdrop";
import './Upload.css';


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
            file: null,
            error: null
        }
    }
    /**
     * Gets file from browse button and sets file state
     * @param {ChangeEvent<HTMLInputElement>} e : event from file browse button
     */
    handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({uploaded: false})
        this.setState({file: e.target.files![0]})

    }
    /**
     * Gets file from Dragdrop component and sets file state
     * @param {FileList} files : files from Dragdrop
     */
    handleDropSelect = (files: FileList) => {
        this.setState({uploaded: false})
        this.setState({file: files[0]})
    }

    /**
     * Uploads file from file state and sends to firebase
     * stored in cloud storage at this.docPathStorage + filename
     * stored in firestore database as URL to storage under username (default userX)
     * also updates a progress bar as file is uploaded
     */
    uploadFile = () => {
        if(this.state.file) {
            const file = this.state.file;
            this.setState({uploading: true});
            try {
                const storageRef = this.props.firebase.storage.ref(this.docPathStorage + file.name); //Creates a storage reference at filepath
                const task = storageRef.put(file); //puts file in that reference
                task.on('state_changed',
                    function progress(snapshot: firebase.storage.UploadTaskSnapshot) {
                        const uploader = document.getElementById("uploader") as HTMLProgressElement;
                        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        uploader.value = percentage;
                    }, function error(err: Error) {
                        console.log(err);
                    }, () => {
                    console.log(this.state.uploading)
                        this.setState({uploaded: true});
                        this.setState({uploading: false});
                        console.log("Uploaded file to " + 'users/' + this.state.userName + '/' + this.docPathDB);
                        task.snapshot.ref.getDownloadURL().then((downloadURL: String) => {
                            this.props.firebase.db.doc('users/' + this.state.userName + '/' + this.docPathDB).set(
                                {
                                    URL: downloadURL
                                }
                            );
                        });
                    });
            }catch(err){
                this.setState({error:err});
                this.setState({uploading: false});
            }
        }

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
                        {this.state.error ? <span className='error'>{this.state.error.message}</span> : null}
                    </code>
                </div>
            </Dragdrop>
            </div>
        );
    }
}

const Upload = withFirebase(UploadBase);
export {Upload, UploadBase};
