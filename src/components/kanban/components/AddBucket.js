import React, { useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { backendUrl as url } from '../backendUrl/url'
const axios = require('axios')

function AddBucket(props) {
  const [bucketName, setBucketName] = React.useState("");

  useEffect(() => {
    setBucketName("");
  }, [props.visibility]);

  const handleSaveBucket = () => {
    const newBucket = {
      name: bucketName,
      rank: props.rank,
      projectId: props.ideaId
    }
    axios.post(`${url}/bucket/add`, { bucket: newBucket }, {
      headers: {
        "Content-Type": "application/json", "Authorization": `Bearer ${props.token}`
      }
    }).then(res => {
      console.log(res.data)
      props.toggleVisibility()
      props.refetch()
    }).catch(err => {
      console.log(err)
    })
  }

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
              handleSaveBucket()
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
