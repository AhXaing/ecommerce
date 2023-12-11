import { useEffect, useState } from "react";
import { request } from "../../share/request";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { isPermission, formatDateClient } from "../../share/helper";
const Category = () => {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [list, setList] = useState([]);
  const [item, setItem] = useState(null);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    request("category", "get")
      .then((res) => {
        // alert(res);
        if (res) {
          setList(res.list);
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onClickEdit = (item) => {
    setItem(item);
    setName(item.name);
    setParent(item.parent);
    setStatus(item.status);
    setShowForm(true);
  };
  const onDelete = () => {
    setShow(false);
    var category_id = item.category_id;
    request("category/" + category_id, "delete").then(() => {
      var tmp_data = list.filter((item) => item.category_id != category_id);
      setList(tmp_data);
    });
  };

  const onClickBtnDelete = (param) => {
    setItem(param);
    setShow(true);
  };
  const onSave = () => {
    onHideModalForm();
    var param = {
      name: name,
      parent: parent,
      status: status,
    };
    var url = "category";
    var method = "post";

    // case update
    if (item.category_id != null) {
      param.category_id = item.category_id; //add new key to param
      method = "put";
    }

    request(url, method, param)
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

  const onHideModal = () => {
    setShow(false);
    setItem(null);
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
    setParent("");
    setStatus("");
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
          {isPermission("category.read") && (
            <Button onClick={onShowModalForm} variant="info">
              Create New
            </Button>
          )}
        </div>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>NAME</th>
            <th>Parent</th>
            <th>STATUS</th>
            <th>CREATE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.parent}</td>
                <td>{item.status}</td>
                <td>{formatDateClient(item.created_at)}</td>
                <td>
                  {isPermission("category.update") && (
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => onClickEdit(item)}
                    >
                      Edit
                    </Button>
                  )}{" "}
                  {isPermission("category.delete") && (
                    <Button
                      onClick={() => onClickBtnDelete(item)}
                      variant="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                  )}
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
        <Modal show={showForm} onHide={onHideModalForm}>
          <Modal.Header closeButton>
            <Modal.Title>Form Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                name="name"
                id="name"
                className="mb-2"
                size="sm"
                type="text"
                placeholder="Category Name"
              />
              <Form.Control
                value={parent}
                onChange={(e) => {
                  setParent(e.target.value);
                }}
                name="parent"
                id="parent"
                className="mb-2"
                size="sm"
                type="text"
                placeholder="Parent"
              />
              <Form.Control
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                name="status"
                id="status"
                className="mb-2"
                size="sm"
                type="text"
                placeholder="Status"
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHideModalForm}>
              Close
            </Button>
            <Button variant="success" onClick={onSave}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default Category;
