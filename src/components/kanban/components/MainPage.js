import React, { Component } from "react";
import { Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import axios from "axios";
import "./style.css";
import AddBucket from "./AddBucket";
import EditBucket from "./EditBucket";
import EditTask from "./EditTask";
import AddTask from "./AddTask";
import Settings from "./Settings";
import { backendUrl as url } from '../backendUrl/url'
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //data
      buckets_array: [],
      tasks: {},
      bucketName: "",
      showBucketModal: false,
      remountVar: false,

      //Helper Variables
      hasBeenFetched: false,
      bucket: "",
      priority: "",

      //Modal Show props.
      showAddModal: false,
      editModal: {},
      showEditModal: false,
      showSettings: false,
      showEditBucketModal: false,

      //dragging variables.
      draggedCard: null,
      dragOn: false,
      dragOverBucket: null,

      draggedBucket: null,

      autoSave: true,
      jwtToken: ""
    };
    this.saveData = this.saveData.bind(this)
  }
  async componentDidMount() {
    await this.setState({ jwtToken: localStorage.getItem("token") })
    this.setState({ remountVar: false })
    this.setState({
      autoSave:
        window.localStorage.getItem("autoSave") === "true" ? true : false,
    });
    this.fetchAllData()

    setInterval(() => {
      this.autoSaveData();
    }, 5000);
  }
  smoothScroll() {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: document.body.scrollWidth,
      behavior: "smooth",
    });
  }
  autoSaveData() {
    window.localStorage.setItem("autoSave", this.state.autoSave);
    this.state.autoSave &&
      axios
        .post(
          url + "buckets/save",
          { buckets: Object.assign({}, this.state.buckets_array) }
        )
        .then(
          (response) => { },
          (error) => {
            console.log(error);
            alert("Error. Can not Load Data.");
          }
        );

    this.state.autoSave &&
      axios
        .post(
          url + "tasks/save",
          { tasks: this.state.tasks }
        )
        .then(
          (response) => { },
          (error) => {
            console.log(error);
            alert("Error. Can not Load Data.");
          }
        );
  }

  saveData = async () => {
    this.setState({ showSettings: false });
    await axios
      .post(
        url + "buckets/save",
        { buckets: Object.assign({}, this.state.buckets_array) }
      )
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
          alert("Error. Can not Load Data.");
        }
      );
    await axios
      .post(
        url + "tasks/save",
        { tasks: this.state.tasks }
      )
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
          alert("Error. Can not Load Data.");
        }
      );
    this.setState({ showSettings: false });
  };
  fetchAllData = () => {
    console.log(this.state.jwtToken)
    axios.get(url + "buckets/", {
      headers: {
        Authorization: 'Bearer ' + this.state.jwtToken
      }
    }).then(
      (response) => {
        var arr = Object.values(response.data);
        for (var i in arr) {
          arr[i] = arr[i]["name"];
        }
        this.setState({ buckets_array: arr });
      },
      (error) => {
        console.log(error);
      }
    );

    axios
      .get(url + "tasks/", {
        headers: {
          Authorization: "Bearer " + this.state.jwtToken
        }
      })
      .then((response) => {
        var tasks = response.data;
        for (var i in tasks) {
          tasks[i].start_date = new Date(tasks[i].start_date);
          tasks[i].due_date = new Date(tasks[i].due_date);
        }

        this.setState({ tasks: tasks, hasBeenFetched: true });
      });


  }
  // This function is used to add a new task
  addTask = async (task, fileForm) => {
    var tasks = this.state.tasks;
    var n = -1
    if (Object.keys(tasks).length === 0) {
      n = 1
    }
    else if (Object.keys(tasks).length === 1) {
      n = 2
    }
    else if (Object.keys(tasks).length > 1) {
      n = parseInt(Object.keys(tasks).reduce((a, b) => a > b ? a : b)) + 1;
    }
    var rank = 1;
    for (var i in tasks) {
      if (tasks[i].bucket === task.bucket) rank++;
    }
    task.id = n;
    task.rank = rank;
    console.log(task)
    tasks[task.id] = task;
    this.setState({
      tasks: tasks,
      showAddModal: false,
    });
    if (fileForm.get("attachments")) {
      await this.saveData()
      fileForm.append("id", n)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(url + 'files', fileForm, config).then((res) => {
        console.log(res)
        this.fetchAllData()
      }).catch(err => {
        console.log(err)
      })
    }
  };

  editTask(task) {
    this.setState({ editModal: task });
    this.setState({
      name: task.name,
      description: task.description,
      bucket: task.bucket,
      assignees: task.assignees,
      start_date: task.start_date,
      due_date: task.due_date,
      progress: task.progress,
      label_color: task.label_color,
      priority: task.priority,
      showEditModal: true,
      attachments: task.attachments
    });
  }

  saveEditTask = async (task, fileForm) => {
    console.log(task)
    var tasks = this.state.tasks;
    tasks[task.id] = task;
    this.setState({ tasks: tasks, showEditModal: false });
    if (fileForm.get("attachments")) {
      await this.saveData()
      fileForm.append("id", task.id)
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      axios.post(url + 'files', fileForm, config).then((res) => {
        console.log(res)
        this.fetchAllData()
      }).catch(err => {
        console.log(err)
      })
    } else {
      await this.saveData()
      this.fetchAllData()
    }
  };
  deleteTask = (task) => {
    var bucket = task.bucket;
    var id = task.id;
    var temp = this.state.tasks;
    for (var i in temp) {
      if (temp[i].bucket === bucket && temp[i].rank > task.rank) temp[i].rank--;
    }
    delete temp[id];
    this.setState({ tasks: temp, showEditModal: false });
  };
  //bucket
  saveBucket = (bucketName) => {
    var arr = this.state.buckets_array;
    arr.push(bucketName);
    this.setState(
      {
        buckets_array: arr,
        showBucketModal: false,
        bucketName: "",
      },
      this.smoothScroll
    );
  };

  //All drag event listeners start here

  dragStart(e, task) {
    var elt = e.target
    setTimeout(() => {
      elt.className += ' task-card-dragged'
      this.setState({ draggedCard: task, dragOn: true });
    }, 1)

  }

  dragEnd(e) {
    this.setState({ draggedCard: null, dragOn: false, dragOverBucket: null });
    e.target.className = e.target.className.replace(' task-card-dragged', '')
  }

  dragOver(e, bucket) {
    e.preventDefault();
    if (this.state.dragOverBucket !== bucket)
      this.setState({ dragOverBucket: bucket });
    // console.log(this.state.dragOverBucket);
  }

  dropCard(e, index) {
    console.log("Calling dropCard")
    if (this.state.draggedBucket !== null) {
      var draggedBucket = this.state.draggedBucket;
      var arr = this.state.buckets_array;
      var target = arr[index];
      var target_index = arr.indexOf(target);
      arr = arr.filter(function (ele) {
        return ele !== draggedBucket;
      });
      console.log(arr, target_index);
      arr.splice(target_index, 0, draggedBucket);
      this.setState({ buckets_array: arr });
      return;
    }
    if (this.state.draggedCard.bucket === this.state.buckets_array[index]) {
      return;
    }
    let task = this.state.draggedCard;
    let task_id = task.id;
    let toList = index;
    var tasks = this.state.tasks;
    var bucket = this.state.buckets_array[toList];

    var rank = 1;
    for (var i in tasks) {
      if (tasks[i].bucket === bucket) rank = rank + 1;
    }

    for (i in tasks) {
      if (
        tasks[i].bucket === task.bucket &&
        Number(tasks[i].rank) > Number(task.rank)
      ) {
        tasks[i].rank--;
      }
    }
    tasks[task_id].bucket = this.state.buckets_array[toList];
    tasks[task_id].rank = rank;
    this.setState({ tasks: tasks, dragOn: false, dragOverBucket: null, draggedCard: null });
  }

  dropVertical(e, task) {
    if (this.state.draggedBucket !== null) {
      return;
    }
    if (this.state.draggedCard.bucket !== task.bucket) {
      return;
    }

    var draggedRank = this.state.draggedCard.rank;
    var droppedRank = task.rank;
    var tasks = this.state.tasks;
    if (draggedRank > droppedRank) {
      for (var i in tasks) {
        if (
          tasks[i].bucket === task.bucket &&
          tasks[i].rank >= droppedRank &&
          tasks[i].rank <= draggedRank
        ) {
          tasks[i].rank++;
        }
      }
      tasks[this.state.draggedCard.id].rank = droppedRank;
      this.setState({ tasks: tasks });
    } else if (draggedRank < droppedRank) {
      for (i in tasks) {
        if (
          tasks[i].bucket === task.bucket &&
          tasks[i].rank <= droppedRank &&
          tasks[i].rank >= draggedRank
        ) {
          tasks[i].rank--;
        }
      }
      tasks[this.state.draggedCard.id].rank = droppedRank;
      this.setState({ tasks: tasks, draggedCard: null });
    }
  }

  bucketDrop(e, target) {
    if (this.state.draggedBucket === null) {
      return;
    }
    var draggedBucket = this.state.draggedBucket;
    var arr = this.state.buckets_array;
    var target_index = arr.indexOf(target);
    arr = arr.filter(function (ele) {
      return ele !== draggedBucket;
    });
    console.log(arr, target_index);
    arr.splice(target_index, 0, draggedBucket);
    this.setState({ buckets_array: arr, draggedCard: null });
  }


  // This is the render function
  render() {
    var tasks_array = [];
    var tasks = this.state.tasks;
    var buckets = this.state.buckets_array;
    var n = Object.keys(tasks).length;
    for (var i in buckets) {
      for (var j = 1; j <= n; j++) {
        for (var task in tasks) {
          if (
            Number(tasks[task].rank) === j &&
            tasks[task].bucket === buckets[i]
          )
            tasks_array.push(tasks[task]);
        }
      }
    }
    return (
      <div className="App">
        {/* ----------------------------------------------Container-------------------------------------------- */}
        <Container className="board" fluid>
          {/* ---------------------Add Task Button------------------- */}
          <Row className="mt-2 mb-2">
            <Col></Col>
            <Col>
              <Button
                variant="outline-dark"
                className="float-right mr-4"
                onClick={() => this.setState({ showSettings: true })}
              >
                Settings<i className="fas fa-cog  settings-icon ml-2"></i>
              </Button>
            </Col>
          </Row>

          {/* ---------------------Task Lists------------------- */}

          <Row className="flex-row flex-nowrap bucket-container" fluid="true" xs="6">
            {/* ---------------------Buckets------------------- */}
            {this.state.buckets_array.map((bucket, idx) => (
              <Col
                key={idx}
                id={this.state.buckets_array.indexOf(bucket)}
                className="bucket"
                onDragOver={(e) => this.dragOver(e, bucket)}
                onDrop={(e) =>
                  this.dropCard(e, this.state.buckets_array.indexOf(bucket))
                }
              >
                <div className="paper-list" id={idx + 'bc'}>
                  <div
                    className="bucket-title"
                    style={{ padding: "5px" }}
                    draggable="true"
                    onDragStart={(e) => {
                      var elt = e.target.parentNode
                      setTimeout(() => {
                        elt.className += ' bucket-dragged'
                      }, 1)
                      this.setState({ draggedBucket: bucket });
                    }}
                    onDragEnd={(e) => {
                      console.log("Drag end")
                      var elt = e.target.parentNode
                      elt.className = elt.className.replace(' bucket-dragged', '')
                      this.setState({
                        draggedBucket: null,
                        dragOn: false,
                        dragOverBucket: null,
                      });
                    }}
                    onDrop={(e) => this.bucketDrop(e, bucket)}
                  >
                    <Row>
                      <Col>
                        <h6
                          id={bucket}
                          style={{ margin: "0" }}
                          className="float-left ml-2"
                        >
                          {bucket}
                        </h6>
                      </Col>
                      <Col>
                        <span style={{ cursor: "pointer" }}>
                          <i
                            className="fas fa-trash float-right bucket-edit" //Delete Bucket
                            onClick={() => {
                              if (
                                window.confirm("Are you sure to delete bucket?")
                              ) {
                                var arr = this.state.buckets_array;
                                arr = arr.filter(function (ele) {
                                  return ele !== bucket;
                                });
                                var tasks = this.state.tasks;
                                for (var i in tasks) {
                                  if (tasks[i].bucket === bucket) {
                                    delete tasks[i];
                                  }
                                }
                                this.setState(
                                  {
                                    buckets_array: arr,
                                    tasks: tasks,
                                  },
                                  this.smoothScroll
                                );
                              }
                            }}
                          ></i>
                          <i
                            className="fas fa-pen float-right mr-3 bucket-edit"
                            onClick={() =>
                              this.setState({
                                showEditBucketModal: true,
                                bucket: bucket,
                              })
                            }
                          ></i>
                        </span>
                      </Col>
                    </Row>
                  </div>
                  {Object.values(tasks_array).map((task, idx) =>
                    task.bucket === bucket ? (
                      <Card
                        key={idx}
                        style={{
                          maxWidth: "100%"
                        }}
                        id={idx + 'card'}
                        className={'mt-2 task-card'}
                        draggable="true"
                        onDragStart={(e) => this.dragStart(e, task)}
                        onDragEnd={(e) => this.dragEnd(e)}
                        onDrop={(e) => this.dropVertical(e, task)}
                      >
                        <Card.Body
                          className='task-card-body'
                          onClick={() => this.editTask(task)}
                        >
                          <Card.Text>
                            <svg
                              style={{ color: task.label_color }}
                              className="bi bi-bookmark-fill"
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z"
                              />
                            </svg>{" "}
                            {task.name}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ) : null
                  )}
                  <Card
                    className="mt-2 task-card"
                    style={{
                      display:
                        this.state.draggedCard &&
                          this.state.dragOverBucket === bucket &&
                          this.state.draggedCard.bucket !== bucket
                          ? "block"
                          : "none",
                      opacity: 0.7,
                      backgroundColor: "#f7fff2",
                    }}
                  >
                    <Card.Body>
                      <Card.Text className="float-left mb-0 mt-1"></Card.Text>
                    </Card.Body>
                  </Card>

                  <Alert
                    className="add-task"
                    onClick={() =>
                      this.setState({
                        showAddModal: true,
                        bucket: bucket,
                      })
                    }
                  >
                    <Row>
                      <Col align="center" className="add-task-content">
                        + Add another task
                      </Col>
                    </Row>
                  </Alert>
                </div>
              </Col>
            ))}
            {this.state.hasBeenFetched ? (
              <Col id="i-add-bucket">
                <div
                  className="add-bucket"
                  onClick={() => this.setState({ showBucketModal: true })}
                >
                  + Add Bucket
                </div>
              </Col>
            ) : (
                <div></div>
              )}
          </Row>
        </Container>

        {/* ---------------------Pop Up Modal for Adding NEW Bucket------------------- */}
        <AddBucket
          visibility={this.state.showBucketModal}
          buckets={this.state.buckets_array}
          saveFunction={this.saveBucket}
          hideModal={() => {
            this.setState({ showBucketModal: false });
          }}
        />

        {/* ---------------------Pop Up Modal for EDITING Bucket------------------- */}
        <EditBucket
          visibility={this.state.showEditBucketModal}
          bucket={this.state.bucket}
          saveFunction={(newName) => {
            var buckets = this.state.buckets_array;
            var tasks = this.state.tasks;
            var index = buckets.indexOf(this.state.bucket);
            buckets[index] = newName;
            for (var i in tasks) {
              if (tasks[i].bucket === this.state.bucket)
                tasks[i].bucket = newName;
            }
            this.setState({
              tasks: tasks,
              buckets_array: buckets,
              bucket: "",
              showEditBucketModal: false,
            });
          }}
          hideModal={() => {
            this.setState({ showEditBucketModal: false });
          }}
        />

        {/* ---------------------Pop Up Modal for EDITING TASK details------------------- */}
        <EditTask
          visibility={this.state.showEditModal}
          buckets={this.state.buckets_array}
          taskData={this.state.editModal}
          saveFunction={this.saveEditTask}
          deleteFunction={this.deleteTask}
          hideModal={() => this.setState({ showEditModal: false })}
        />

        {/* ---------------------Pop Up Modal for ADDING NEW TASK details------------------- */}

        <AddTask
          visibility={this.state.showAddModal}
          bucket={this.state.bucket}
          buckets={this.state.buckets_array}
          // callingBucket={this.state.bucketCallingAddTask}
          saveFunction={this.addTask}
          hideModal={() => this.setState({ showAddModal: false })}
        />

        {/* ---------------------Pop Up Modal for SETTINGS------------------- */}

        <Settings
          visibility={this.state.showSettings}
          autoSave={this.state.autoSave}
          toggleAutoSave={(checked) => this.setState({ autoSave: checked })}
          saveFunction={this.saveData}
          hideModal={() => this.setState({ showSettings: false })}
        />
      </div >
    );
  }
}

export default MainPage;
