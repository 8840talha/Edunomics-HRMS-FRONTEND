import React, { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { TextField } from '@material-ui/core'


function EditBucket(props) {
  const [bucketName, setBucketName] = React.useState("");

  useEffect(() => {
    setBucketName(props.bucket);
  }, [props.bucket]);

  return (
    <div>
      <Modal
        size="md"
        centered
        show={props.visibility}
        onHide={() => props.hideModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Bucket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              onChange={(e) => setBucketName(e.target.value)}
              value={bucketName}
              variant="outlined"
              label="Bucket Name"
              fullWidth
            ></TextField>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            variant="primary"
            onClick={() => {
              props.saveFunction(bucketName);
              setBucketName("");
            }}
            disabled={bucketName === "" ? true : false}
            style={{ cursor: bucketName === "" ? "not-allowed" : "pointer" }}
          >
            Save Bucket
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditBucket;
