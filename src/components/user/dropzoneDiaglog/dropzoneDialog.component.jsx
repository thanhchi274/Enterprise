import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import {
    Button,
  } from "shards-react";
import {uploadDataStart} from '../../../Store/user/user.action'
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import {selectCurrentUser} from '../../../Store/user/user.selector'
class DropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
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
            open: false,
        },()=> this.props.uploadDataStart([...files,{title:this.props.data.title, author:this.props.data.author, startDate: this.props.data.date, endDate: this.props.data.endDate}]));
    }
    handleOpen() {
        this.setState({
            open: true,
        });
    }
    render() {
        console.log(this.props.data)
        let {data}= this.props
        return (
            <div>
                <Button   theme="accent"
              size="sm"
              className="ml-auto"
              id="btn_publish" onClick={this.handleOpen.bind(this)}>
                  Upload
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
const mapStateToProps = createStructuredSelector ({
    currentUser:selectCurrentUser
})
const mapDispatchToProps = (dispatch) => ({
          uploadDataStart: (data) => dispatch(uploadDataStart(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(DropZone)