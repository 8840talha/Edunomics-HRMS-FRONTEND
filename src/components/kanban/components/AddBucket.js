import React, { useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { TextField } from '@material-ui/core'

function AddBucket(props) {
  const [bucketName, setBucketName] = React.useState("");

  useEffect(() => {
    setBucketName("");
  }, [props.visibility]);

  return (
    <div>
      <Modal
        size="md"
        centered
        show={props.visibility}
        onHide={() => props.hideModal()}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Bucket</Modal.Title>
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
          {/* <Form>
            <Form.Group>
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setBucketName(e.target.value)}
                value={bucketName}
              />
            </Form.Group>
          </Form> */}
          <Alert
            variant="danger"
            className="text-center"
            style={{ padding: "5px 10px 5px 10px" }}
            show={props.buckets.indexOf(bucketName) !== -1 ? true : false}
          >
            Bucket Already Exists
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            variant="primary"
            onClick={() => {
              props.saveFunction(bucketName);
              setBucketName("");
            }}
            disabled={
              bucketName === "" || props.buckets.indexOf(bucketName) !== -1
                ? true
                : false
            }
            style={{
              cursor:
                bucketName === "" || props.buckets.indexOf(bucketName) !== -1
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Save Bucket
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddBucket;
