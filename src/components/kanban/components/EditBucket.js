import React, { useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";


function EditBucket(props) {
  const [bucket, setBucket] = React.useState({});

  useEffect(() => {
    setBucket(props.bucket);
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
                onChange={(e) => setBucket({ ...bucket, name: e.target.value })}
                value={bucket.name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            variant="primary"
            onClick={() => {
              props.saveFunction(bucket);
            }}
            disabled={bucket.name === "" ? true : false}
            style={{ cursor: bucket.name === "" ? "not-allowed" : "pointer" }}
          >
            Save Bucket
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditBucket;
