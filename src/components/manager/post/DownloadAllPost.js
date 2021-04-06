import React from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { Button } from "shards-react";

const DownloadAllPost = ({ allPosts }) => {
  const handleDownZip = (e) => {
    e.preventDefault();

    const zip = JSZip();

    for (const post of allPosts) {
      zip.file(post.title + "-" + post.author + "-" + post.createAt, post.body);
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      FileSaver.saveAs(content, "example.zip");
    });
  };

  return (
    <Button
      outline
      theme="accent"
      size="sm"
      style={{ fontSize: "13px", width: "150px" }}
      onClick={handleDownZip}
    >
      <i className="material-icons">file_download</i> Download posts
    </Button>
  );
};

export default DownloadAllPost;
