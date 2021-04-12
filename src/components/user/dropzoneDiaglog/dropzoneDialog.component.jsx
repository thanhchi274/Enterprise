import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import { Button } from "shards-react";
import { uploadDataStart } from "../../../Store/user/user.action";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../Store/user/user.selector";
class DropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
      date_choose: null,
    };
  }
  handleClose() {
    this.setState({
      open: false,
      date_choose: null,
    });
  }
  componentWillUnmount() {
    this.setState({
      date_choose: null,
    });
  }
  handleSave(files) {
    this.setState(
      {
        files: files,
        open: false,
      },
      () =>
        this.props.uploadDataStart([
          ...files,
          this.props.data,
          { dateChoose: this.state.date_choose },
        ])
    );
  }
  handleOpen(event) {
    let { data } = this.props;
    let target = event.target.value;
    if (target === "first_submit_date") {
      this.setState({
        open: true,
        date_choose: data.Start,
      });
    }
    if (target === "second_submit_date") {
      this.setState({
        open: true,
        date_choose: data.End,
      });
    }
  }
  render() {
    let { data } = this.props;
    const isValidStartDay =
      new Date().toISOString() >
      new Date(data.Start).toISOString();
    let isValidEndDay =
      new Date().toISOString() > new Date(data.End).toISOString();
    return (
      <div>
        <h5 className="my-2">
          Submit Date: {new Date(data.Start).toLocaleDateString()}
        </h5>
        <Button
          theme="accent"
          size="sm"
          className="ml-auto"
          id="btn_publish"
          value={"first_submit_date"}
          disabled={isValidStartDay}
          onClick={this.handleOpen.bind(this)}
        >
          {!isValidStartDay ?  "Upload":"Expired"}
        </Button>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          acceptedFiles={["image/*,.pdf,.doc"]}
          showPreviews={true}
          maxFileSize={10000000}
          filesLimit={2}
          value={"2"}
          onClose={this.handleClose.bind(this)}
        />
        <h5 className="my-2">
          Final Submit Date: {new Date(data.End).toLocaleDateString()}
        </h5>
        <Button
          theme="accent"
          size="sm"
          className="ml-auto"
          id="btn_publish"
          value={"second_submit_date"}
          disabled={isValidEndDay}
          onClick={this.handleOpen.bind(this)}
        >
          {isValidEndDay ? "Expired" : "Upload"}
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
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  uploadDataStart: (data) => dispatch(uploadDataStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DropZone);
