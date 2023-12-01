import { useEffect, useState } from "react";
import axios from "axios";
// import "./Category.css";
import { Table, Button, Modal, Alert, Card, Form } from "react-bootstrap";

const Category = () => {
  useEffect(() => {
    getList();
  }, []);
  const [list, setList] = useState([]);
  const [item, setItem] = useState({});
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [status, setStatus] = useState("");

  const [showForm, setShowForm] = useState(false);
  const server = "http://localhost:5000/api/";
  const getList = () => {
    axios({
      url: server + "category",
      method: "get",
      data: {},
    })
      .then((res) => {
        var data = res.data;
        setList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onDelete = () => {
    setShow(false);
    var category_id = item.category_id;
    axios({
      url: server + "category/" + category_id,
      method: "delete",
    })
      .then(() => {
        var tmp_data = list.filter((item) => item.category_id != category_id);
        setList(tmp_data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onClickBtnDelete = (param) => {
    setItem(param);
    setShow(true);
  };
  const onHideModal = () => {
    setShow(false), setItem(null);
  };

  const onSave = () => {
    onHideModalForm();
    var param = {
      cate_name: name,
      parent_id: parentId,
      status: status,
    };
    var url = server + "category";
    var method = "post";

    // case update
    if (item.category_id != null) {
      param.category_id = item.category_id; //mean that add new key "category_id" to param
      method = "put";
    }
    // case creat
    axios({
      url: url,
      method: method,
      data: param,
    })
      .then((res) => {
        if (res) {
          getList();
          clearDataForm();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHideModalForm = () => {
    setShowForm(false);
    clearDataForm();
  };
  const onShowModalForm = () => {
    setShowForm(true);
    setItem({});
    clearDataForm();
  };
  const clearDataForm = () => {
    setName("");
    setParentId("");
    setStatus("");
  };
  const onClickBtnEdit = (item) => {
    setItem(item);
    // case update add data to fields
    setName(item.name);
    setParentId(item.parentId);
    setStatus(item.status);
    setShowForm(true);
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
        }}
      >
        <div>
          <h4>List Categories</h4>
        </div>
        <div>
          <Button variant="info" onClick={onShowModalForm}>
            Create New
          </Button>
        </div>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Category Name</th>
            <th>Parent</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.cate_name}</td>
                <td>{item.parent_id}</td>
                <td>{item.status}</td>
                <td>
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onClickBtnEdit(item)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      size="sm"
                      onClick={() => onClickBtnDelete(item)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Modal confirm delete */}
      <>
        <Modal
          show={show}
          onHide={onHideModal}
          backdrop="static"
          keyboard={false}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Alert variant="warning">Are you sure remove this item ?</Alert>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHideModal}>
              No
            </Button>
            <Button variant="danger" onClick={onDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/* Modal form creat new & update */}
      <>
        <Modal
          show={showForm}
          onHide={onHideModalForm}
          backdrop="static"
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <Card border="success">
              <Card.Header
                style={{ backgroundColor: "#28a745", color: "#ffffff" }}
              >
                {item.category_id == null ? " Form Create" : "Form Update"}
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      value={name} //get from useState() above
                      type="text"
                      placeholder="category name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>parent ID</Form.Label>
                    <Form.Control
                      value={parentId}
                      type="text"
                      name="parent_id"
                      placeholder="parent"
                      onChange={(event) => {
                        setParentId(event.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      value={status} //get from useState() above
                      type="text"
                      placeholder="Status"
                      onChange={(event) => {
                        setStatus(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>

          <Modal.Footer size="sm">
            <Button size="sm" variant="secondary" onClick={onHideModalForm}>
              Cancel
            </Button>
            <Button size="sm" variant="success" onClick={onSave}>
              {item.category_id == null ? "Save" : "Update"}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default Category;
