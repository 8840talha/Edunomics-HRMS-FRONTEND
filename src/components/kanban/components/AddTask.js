import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Dropdown,
  InputGroup,
  FormControl,
  Row,
  Col,
  Table,
  DropdownButton,
  Container
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"
import image from "../images/img.png"
import docIcon from '../images/doc.png'
import pptIcon from '../images/ppt.png'
import exlIcon from '../images/excel.jpg'


function AddTask(props) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    assignees: [],
    assignee: "",
    rank: "",
    bucket: "",
    start_date: new Date(),
    due_date: new Date(),
    progress: "",
    label_color: "#3797a4",
    priority: "",
    attachments: []
  });
  useEffect(() => {
    setTask({
      name: "",
      description: "",
      assignees: [],
      rank: "",
      bucket: props.bucket._id,
      start_date: new Date(),
      due_date: new Date(),
      progress: "",
      label_color: "#3797a4",
      priority: "",
      attachments: [],
      projectId: props.ideaId
    });
  }, [props]);
  const extension = {
    'png': image,
    'jpg': image,
    'docx': docIcon,
    'doc': docIcon,
    'ppt': pptIcon,
    'pptx': pptIcon,
    'pps': pptIcon,
    'pdf': docIcon,
    'xlsx': exlIcon
  }
  const showNewImage = (event) => {
    const files = event.target.files;
    var AttacmentContainer = document.getElementById("attachments-container")

    for (var i = 0; i < files.length; i++) {
      // console.log(files[i])
      const ext = files[i].name.split('.').pop().toLowerCase()
      const urlObj = URL.createObjectURL(files[i])
      // console.log(urlObj)

      var ColElt = document.createElement("div")
      ColElt.className = "col"
      var RowElt = document.createElement("div")
      RowElt.className = "row add-task-attachment-row"
      var anchor_elt = document.createElement('a')
      anchor_elt.href = urlObj
      anchor_elt.target = "_blank"
      anchor_elt.file = files[i]
      anchor_elt.className = "attachment-link"
      var image_elt = document.createElement('img')
      image_elt.className = "task-img"
      if (ext === "png" || ext === "jpg" || ext === "jpeg") {
        image_elt.src = urlObj
      }
      else {
        image_elt.src = extension[ext]
      }

      anchor_elt.appendChild(image_elt)
      ColElt.appendChild(anchor_elt)
      RowElt.appendChild(ColElt)
      RowElt.appendChild(generateDeleteButton())
      AttacmentContainer.appendChild(RowElt)
    }
  }
  const generateDeleteButton = () => {
    var newButton = document.createElement('button')
    newButton.className = "btn btn-danger"
    newButton.type = "button"
    newButton.innerHTML = "Delete"
    newButton.onclick = deleteAttachment;
    var newColContainer = document.createElement('div')
    newColContainer.className = 'col'
    newColContainer.appendChild(newButton)
    return newColContainer
  }
  const deleteAttachment = (event) => {
    var rootNodeToDelete = event.target.parentNode.parentNode
    rootNodeToDelete.remove()
    console.log(task)
  }
  const submitAddTask = (task) => {
    var fileForm = new FormData()
    var attachment_links = document.getElementsByClassName('attachment-link')
    var fileObjects = []
    for (var i = 0; i < attachment_links.length; i++) {
      console.log(attachment_links[i].file)
      fileObjects.push(attachment_links[i].file)
      fileForm.append("attachments", attachment_links[i].file)
    }
    props.saveFunction(task, fileForm)
  }

  return (
    <Modal
      size="lg"
      centered
      show={props.visibility}
      onHide={() => props.hideModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title>Enter Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="sm">
          <InputGroup.Prepend>
            <InputGroup.Text>Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            size="sm"
            onChange={(e) => {
              setTask({
                ...task,
                name: e.target.value,
              });
            }}
          />
        </InputGroup>
        <hr />
        <Row>
          <Col xs={2} className="text-center">
            <i className="fas fa-user-plus"></i> Assignees:
          </Col>
          <Col>
            <InputGroup className="w-50" size="sm">
              <FormControl
                placeholder="Add Assignee"
                onChange={(e) => setTask({ ...task, assignee: e.target.value })}
                value={task.assignee || ""}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-info"
                  onClick={() => {
                    var temp = task.assignees;
                    temp.push(task.assignee);
                    setTask({ ...task, assignees: temp, assignee: "" });
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setTask({ ...task, assignees: [], assignee: "" });
                  }}
                >
                  Delete
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

        <Table
          striped
          bordered
          hover
          size="sm"
          className="mt-3 w-80 text-center"
        >
          <thead>
            <tr>
              {task.assignees
                ? task.assignees.map((person, idx) => <th key={idx}>{person}</th>)
                : null}
            </tr>
          </thead>
        </Table>
        <hr />
        <Row className="mt-3">
          <Col>
            <Row>
              <Col className="text-center">Bucket:</Col>
              <Col>
                <DropdownButton
                  title={props.bucket.name}
                  size="sm"
                  onSelect={(eventKey) => {
                    setTask({ ...task, bucket: eventKey });
                  }}
                >
                  {props.buckets
                    ? props.buckets.map((bucket, idx) => (
                      <Dropdown.Item eventKey={bucket._id} key={idx}>
                        {bucket.name}
                      </Dropdown.Item>
                    ))
                    : null}
                </DropdownButton>
              </Col>
            </Row>
            <hr />
            <Row className="mt-3">

              <span className="ml-3">Start Date:</span>

              <Col>
                <DatePicker
                  selected={task.start_date}
                  onChange={(date) => {
                    setTask({ ...task, start_date: date });
                  }}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col className="text-center">Progress:</Col>
              <Col>
                <DropdownButton
                  title={task.progress === "" ? "select..." : task.progress}
                  size="sm"
                  onSelect={(eventKey) => {
                    setTask({ ...task, progress: eventKey });
                  }}
                >
                  <Dropdown.Item eventKey="Not Started">
                    Not Started
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="In Progress">
                    In Progress
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="Completed">Completed</Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
            <hr />
            <Row className="mt-3">

              <span className="ml-3">Due Date:</span>

              <Col>
                <DatePicker
                  selected={task.due_date}
                  onChange={(date) => {
                    setTask({ ...task, due_date: date });
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <hr />
        <InputGroup className="mt-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Description :</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            rows="2"
            onChange={(e) => {
              setTask({ ...task, description: e.target.value });
            }}
          />
        </InputGroup>
        <hr />
        {/* <Row>
          <Col md={{ span: 3, offset: 1 }}>Attachments:</Col>
          <Col md={{ span: 4 }}>
            <input type="file" id="attachments" className="custom-file-input" multiple onChange={showNewImage} />
            <label className="custom-file-label">Add Attachments</label>
          </Col>
        </Row>
        <Container id="attachments-container">
        </Container>
        <hr /> */}
        <Row className="mt-3">
          <Col className="text-center">Label Colour:</Col>
          <Col>
            <DropdownButton
              title={
                task.label_color === "#3797a4" ? "default" : task.label_color
              }
              size="sm"
              onSelect={(eventKey) => {
                setTask({ ...task, label_color: eventKey });
              }}
            >
              <Dropdown.Item eventKey="Tomato">Tomato</Dropdown.Item>
              <Dropdown.Item eventKey="MediumSeaGreen">
                MediumSeaGreen
              </Dropdown.Item>
              <Dropdown.Item eventKey="Orange">Orange</Dropdown.Item>
              <Dropdown.Item eventKey="DodgerBlue">DodgerBlue</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col className="text-center">priority:</Col>
          <Col>
            <DropdownButton
              title={task.priority === "" ? "select..." : task.priority}
              size="sm"
              onSelect={(eventKey) => {
                setTask({
                  ...task,
                  priority: eventKey,
                });
              }}
            >
              <Dropdown.Item eventKey="low">low</Dropdown.Item>
              <Dropdown.Item eventKey="medium">medium</Dropdown.Item>
              <Dropdown.Item eventKey="high">high</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          block
          variant="info"
          onClick={() => { submitAddTask(task) }}
          disabled={task.name === "" ? true : false}
        >
          Add Task
        </Button>
      </Modal.Footer>
    </Modal >
  );
}

export default AddTask;
