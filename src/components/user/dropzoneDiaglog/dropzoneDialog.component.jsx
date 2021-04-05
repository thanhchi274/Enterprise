import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
import {uploadDataStart} from '../../../Store/user/user.action'
import { connect } from 'react-redux';
class DropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }
    handleClose() {
        this.setState({
            open: false
        });
    }
    handleSave(files) {
        this.setState({
            files: files,
            open: false
        },()=> this.props.uploadDataStart(files));
    }
    handleOpen() {
        this.setState({
            open: true,
        });
    }
    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                  Add Files and Images
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={this.handleSave.bind(this)}
                    acceptedFiles={["image/*,.pdf,.doc"]}
                    showPreviews={true}
                    maxFileSize={5000000}
                    filesLimit={2}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
          uploadDataStart: (data) => dispatch(uploadDataStart(data))
});
export default connect(null, mapDispatchToProps)(DropZone)