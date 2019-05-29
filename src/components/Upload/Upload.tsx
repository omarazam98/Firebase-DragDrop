import * as React from 'react';
import {ChangeEvent} from "react";
import Dragdrop from "./Dragdrop";
import './Upload.css';
import { withAPI } from '@winwin/api-firebase';

interface UploadState {
    uploading: boolean;
    uploaded: boolean;
    percent: number;
    file: File | null;
    error: Error | null;
}

const INITIALSTATE = {
    uploading: false,
    uploaded: false,
    percent: 0,
    file: null,
    error: null,
}

export class Upload extends React.Component<any, UploadState> {
    constructor(props) {
        super(props);
        this.state = INITIALSTATE
        this.handleDropSelect = this.handleDropSelect.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    /**
     * Gets file from browse button and sets file state
     * @param {ChangeEvent<HTMLInputElement>} e : event from file browse button
     */
    handleFileSelect(e){
        this.setState(function(prevState, props){
            return {
                uploaded: false,
                error: null
            }
        });
        const file = e.target.files[0];
        const ext = file.type //MIME type
        switch (ext.toLowerCase()) {
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/png':
                this.setState(function(prevState, props){
                    return {file}
                });
                return;
        }
        this.setState(function(prevState, props){
            return {error: new Error("File type not accepted")}
        });
    }
    /**
     * Gets file from Dragdrop component and sets file state
     * @param {FileList} files : files from Dragdrop
     */
    handleDropSelect(files){
        this.setState(function(prevState, props){
            return {
                uploaded: false,
                error: null
            }
        });
        const file = files[0];
        const ext = file.type; //MIME type

        switch (ext.toLowerCase()) {
            case 'image/jpg':
            case 'image/jpeg':
            case 'image/png':
                this.setState(function(prevState, props){
                    return {file}
                });
                return;
        }
        this.setState(function(prevState, props){
            return {error: new Error("File type not accepted")}
        });
    }

    /**
     * Uploads file from file state and sends to firebase
     * stored in firestore database as URL to storage under username (default userX)
     * also updates a progress bar as file is uploaded
     */
    uploadFile(){
        if(this.state.file) {
            const file = this.state.file;
            this.setState({uploading: true});
            try {
                const storageRef = this.props.api.api.data.storage.ref(this.props.uploadDirectory + this.props.userID); //uploading directory will be specified as a prop when rendering component
                const task = storageRef.put(file);
                this.setState(function(prevState, props){
                    return {
                        uploading: true,
                    }
                });
                task.on('state_changed',
                    function progress(snapshot){
                        const uploader = document.getElementById("uploader") as HTMLProgressElement;
                        const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        uploader.value = percentage;
                    }, function error(err: Error) {
                        console.log(err);
                    }, () => {
                        this.setState(function(prevState, props){
                            return {
                                uploaded: true,
                                uploading: false,
                            }
                        });
                        task.snapshot.ref.getDownloadURL().then((downloadURL: String) => {
                            //for now this is just putting a photo URL in the firestore entry for that user, but using firebase auth to update the current user's profile image should be implemented later
                            this.props.api.api.data.users.updateById(this.props.userID, {
                                photoURL: downloadURL
                            });
                        });
                    });
            }catch(err){
                this.setState(function(prevState, props){
                    return {
                        uploading: false,
                        error: err
                    }
                });
            }
        }
    };

    render(){
        return (
            <div>
                <Dragdrop handleDrop={this.handleDropSelect}>
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
            </Dragdrop>
            </div>
        );
    }
}

export default withAPI(Upload);
