import React from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

function Settings(props) {
  return (
    <Modal show={props.visibility} onHide={() => props.hideModal()}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col>
              <p className="float-right mr-3">Auto Save :</p>
            </Col>
            <Col>
              <span className="float-left ml-3">
                <BootstrapSwitchButton
                  checked={props.autoSave}
                  onstyle="success"
                  offstyle="danger"
                  size="sm"
                  onChange={(checked) => {
                    props.toggleAutoSave(checked);
                  }}
                />
              </span>
            </Col>
          </Row>
          <Row>
            <Col className="text-center mt-3">
              <Button
                variant="success"
                disabled={props.autoSave ? true : false}
                onClick={() => props.saveFunction()}
              >
                <i className="fas fa-save mr-2"></i>Save Chart
              </Button>
            </Col>
          </Row>
          {/* <Row>
            <Col className="text-center mt-3 mb-3">
              <Button
                variant="danger"
                onClick={() => {
                  this.setState({ showSettings: false });
                  if (window.confirm("Are you sure to reset?"))
                    this.setState({
                      todo: {},
                      doing: {},
                      done: {},
                    });
                }}
              >
                <i class="fas fa-broom mr-2"></i>Reset Chart
              </Button>
            </Col>
          </Row> */}
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default Settings;
