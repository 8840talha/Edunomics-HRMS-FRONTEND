import React, { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";


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
          <Form>
            <Form.Group>
              <Form.Label>Name :</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setBucketName(e.target.value)}
                value={bucketName}
              />
            </Form.Group>
          </Form>
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
