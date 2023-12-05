import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  Alert,
  Card,
  Form,
  Row,
  Col,
  FloatingLabel,
} from "react-bootstrap";

const Employee = () => {
  useEffect(() => {
    getEmployee();
  }, []);
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [item, setItem] = useState({});
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [salary, setsalary] = useState("");
  const [country, setcountry] = useState("");
  const [province, setprovince] = useState("");
  const [address, setaddress] = useState("");

  const server = "http://localhost:5000/api/";
  const getEmployee = () => {
    axios({
      url: server + "employee",
      method: "get",
      data: {},
    })
      .then((res) => {
        var data = res.data;
        setList(data.list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onHideModal = () => {
    setShow(false);
  };

  const onClickBtnDelete = (param) => {
    setShow(true);
    setItem(param);
  };

  const onDelete = () => {
    setShow(false);
    var emp_id = item.emp_id;
    axios({
      url: server + "employee/" + emp_id,
      method: "delete",
    })
      .then(() => {
        var tem_data = list.filter((item) => item.emp_id != emp_id);
        setList(tem_data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   form create
  const onShowModalEmployee = () => {
    setLgShow(true);
    ClearFormEmp();
  };
  const onHideModalEmployee = () => {
    setLgShow(false);
  };
  const onClickBtnEdit = (items) => {
    setItem(items);
    setfirstname(items.emp_firstname);
    setlastname(items.emp_lastname);
    setphone(items.phone);
    setemail(items.email);
    setsalary(items.salary);
    setprovince(items.province);
    setcountry(items.country);
    setaddress(items.address);
    setLgShow(true);
  };
  const ClearFormEmp = () => {
    setfirstname("");
    setlastname("");
    setphone("");
    setemail("");
    setsalary("");
    setprovince("");
    setcountry("");
    setaddress("");
  };
  const onSave = () => {
    onHideModalEmployee();
    var url = server + "employee";
    var method = "post";
    var param = {
      emp_firstname: firstname,
      emp_lastname: lastname,
      phone: phone,
      email: email,
      salary: salary,
      province: province,
      address: address,
      country: country,
    };
    // update
    if (item.emp_id != null) {
      param.emp_id = item.emp_id;
      method = "put";
    }
    // create
    axios({
      url: url,
      method: method,
      data: param,
    })
      .then((res) => {
        if (res) {
          getEmployee();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          padding: 10,
        }}
      >
        <div>
          <h3>List Employees</h3>
        </div>
        <div>
          <Button variant="info" onClick={onShowModalEmployee}>
            Create New
          </Button>
        </div>
      </div>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Province</th>
            <th>Country</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((items, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{items.emp_firstname}</td>
                <td>{items.emp_lastname}</td>
                <td>{items.phone}</td>
                <td>{items.email}</td>
                <td>{items.salary}</td>
                <td>{items.address}</td>
                <td>{items.province}</td>
                <td>{items.country}</td>
                <td>{items.created_at}</td>
                <td>
                  <Button
                    onClick={() => onClickBtnEdit(items)}
                    variant="outline-success"
                    size="sm"
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    onClick={() => onClickBtnDelete(items)}
                    variant="outline-danger"
                    size="sm"
                  >
                    Delete
                  </Button>
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
            <Button variant="outline-warning" onClick={onHideModal}>
              No
            </Button>
            <Button variant="outline-danger" onClick={onDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      <div>
        {/* Modal create */}
        <Modal
          backdrop="static"
          size="lg"
          show={lgShow}
          onHide={onHideModalEmployee}
          aria-labelledby="example-modal-sizes-title-md"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-md">
              Form Create
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card border="success">
              <Card.Header
                style={{ backgroundColor: "#28a745", color: "#ffffff" }}
              >
                {item.emp_id == null ? " Form Create" : "Form Update"}
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row className="g-2 mb-2">
                    <Col md>
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="First Name"
                      >
                        <Form.Control
                          value={firstname}
                          onChange={(e) => {
                            setfirstname(e.target.value);
                          }}
                          type="text"
                          placeholder="First Name"
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label="Last Name"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          value={lastname}
                          onChange={(e) => {
                            setlastname(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <Row className="g-2 mb-2">
                    <Col md>
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Phone"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Phone"
                          value={phone}
                          onChange={(e) => {
                            setphone(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label="Email"
                      >
                        <Form.Control
                          type="email"
                          placeholder="your email@gmail.com"
                          value={email}
                          onChange={(e) => {
                            setemail(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <Row className="g-2 mb-2">
                    <Col md>
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Salary"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Salary"
                          value={salary}
                          onChange={(e) => {
                            setsalary(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label="Province"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Province"
                          value={province}
                          onChange={(e) => {
                            setprovince(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row className="g-2">
                    <Col md>
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Country"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Country"
                          value={country}
                          onChange={(e) => {
                            setcountry(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md>
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label="Address"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => {
                            setaddress(e.target.value);
                          }}
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onHideModalEmployee} variant="outline-warning">
              Cancel
            </Button>
            <Button variant="outline-success" onClick={onSave}>
              {item.emp_id == null ? "Save" : "Update"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Employee;
