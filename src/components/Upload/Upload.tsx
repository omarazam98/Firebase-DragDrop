import React, { Component } from 'react';
import Dragdrop from './Dragdrop';
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
};

export class Upload extends Component<any, UploadState> {
  constructor(props) {
    super(props);
    this.state = INITIALSTATE;
    this.handleDropSelect = this.handleDropSelect.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  /**
   * Gets file from browse button and sets file state
   * @param {ChangeEvent<HTMLInputElement>} e : event from file browse button
   */
  handleFileSelect(e) {
    this.setState(() => {
      return {
        uploaded: false,
        error: null,
      };
    });
    const uploader = document.getElementById('uploader') as HTMLProgressElement;
    if (uploader) uploader.value = 0;
    const file = e.target.files[0];
    const ext = file.type; // MIME type
    switch (ext.toLowerCase()) {
      case 'image/jpg':
      case 'image/jpeg':
      case 'image/png':
        this.setState(() => {
          return { file };
        });
        return;
    }
    this.setState(() => {
      return { error: new Error('File type not accepted') };
    });
  }

  handleDropSelect(files) {
    this.setState(() => {
      return {
        uploaded: false,
        error: null,
      };
    });
    const uploader = document.getElementById('uploader') as HTMLProgressElement;
    if (uploader) uploader.value = 0;
    const file = files[0];
    const ext = file.type; // MIME type

    switch (ext.toLowerCase()) {
      case 'image/jpg':
      case 'image/jpeg':
      case 'image/png':
        this.setState(() => {
          return { file };
        });
        return;
    }
    this.setState(() => {
      return { error: new Error('File type not accepted') };
    });
  }

  /**
   * Uploads file from file state and sends to firebase
   * stored in firestore database as URL to storage under username (default userX)
   * also updates a progress bar as file is uploaded
   */

  uploadFile() {
    if (!this.state.file) {
      return;
    }
    const file = this.state.file;
    const uploader = document.getElementById('uploader') as HTMLProgressElement;
    try {
      const directory = `test/${this.props.api.auth.currentUser().uid}`;
      const storageRef = this.props.api.storage.storageRef.get(directory);
      const task = storageRef.put(file);
      this.setState(() => {
        return {
          uploading: true,
        };
      });
      task.on(
        'state_changed',
        (snapshot) => {
          if (uploader) uploader.style.visibility = 'visible';
          const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          uploader.value = percentage;
        },
        (err) => {
          console.log(err);
        },
        () => {
          this.setState(() => {
            return {
              uploaded: true,
              uploading: false,
            };
          });
          task.snapshot.ref.getDownloadURL().then((downloadURL: String) => {
            // put a photo URL in the firestore entry for that user
            this.props.api.data.users.updateById(this.props.api.auth.currentUser().uid, {
              photoURL: downloadURL,
            });
          });
        });
    } catch (err) {
      this.setState(() => {
        return {
          uploading: false,
          error: err,
        };
      });
      if (uploader) uploader.style.visibility = 'hidden';
    }
    this.setState(() => {
      return { uploading: false };
    });
  }

  render() {
    return (
      <div>
        <Dragdrop handleDrop={this.handleDropSelect}>
          <div className="form">
            <div>
              <label htmlFor="fileButton" className="btn">Choose file or drop here</label>
              <input type="file" id="fileButton" onChange={this.handleFileSelect}/>
            </div>
            <div>
              <progress
                value="0"
                max="100"
                id="uploader"
                style={{ visibility: 'hidden' }}>0%</progress>
              {this.state.uploaded && <p id="checkmark" style={{ display: 'inline' }}>&#9989;</p>}
            </div>
            {this.state.file && <p>{this.state.file.name}</p>}
            {this.state.file && <button id="uploadButton" onClick={this.uploadFile}>Upload</button>}
          </div>
          <code>
            {this.state.error ? <span className="error">{this.state.error.message}</span> : null}
          </code>
        </Dragdrop>
      </div>
    );
  }
}

export default withAPI(Upload);
