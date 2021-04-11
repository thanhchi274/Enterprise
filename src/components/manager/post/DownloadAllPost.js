import React, { useState, useEffect } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { Button } from "shards-react";
import saveAs from "jszip/vendor/FileSaver.js";
import _ from "lodash";
const DownloadAllPost = ({ allPosts }) => {
  const zip = new JSZip();
  const [count, setCount] = useState(0);
  const [fileURLs, setfileURLs] = useState(null);
  useEffect(() => {
   setfileURLs(allPosts);
  },[allPosts]);
  const handleDownZip = async record =>{
    let count = 0;
    let zip = new JSZip();
    const query = { record, fileURLs, count, zip };
    downloadFile(query, onDownloadComplete);
}
const downloadFile = (query, onSuccess) => {
    const { fileURLs, count } = query;
    var xhr = new XMLHttpRequest();
    xhr.onprogress = calculateAndUpdateProgress;
    xhr.open('GET', fileURLs[count].link, true);
    xhr.responseType = "blob";
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState == 4) {
            if (onSuccess) onSuccess(query, xhr.response);
        }
    }
    xhr.send();
}
const onDownloadComplete = (query, blobData) => {
    let { record, fileURLs, count, zip } = query;
    if (count < Object.keys(fileURLs).length) {
      blobToBase64(blobData, function(binaryData){
        let sourceFileName = fileURLs[count].name.substring(fileURLs[count].name.lastIndexOf('/')+1);
        zip.file(sourceFileName, binaryData, {base64: true});
        if (count < fileURLs.length -1){
            count++;
            downloadFile({ ...query, count }, onDownloadComplete);
        }
        else {
            zip.generateAsync({type:"blob"}).then(function(content) {
                saveAs(content, `AllDocumentDownload.zip`);
            });
        }
      });
    }
}
const blobToBase64 = (blob, callback) => {
    let reader = new FileReader();
    reader.onload = function() {
        let dataUrl = reader.result;
        let base64 = dataUrl.split(',')[1];
        callback(base64);
    };
    reader.readAsDataURL(blob);
}
const calculateAndUpdateProgress = (evt) => {
    if (evt.lengthComputable) {
    }
}


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
