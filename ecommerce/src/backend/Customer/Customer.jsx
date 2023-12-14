import { useEffect, useState } from "react";
import { request } from "../../share/request";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  notification,
} from "antd";
import MainPageDesh from "../../component/backend/MainPageDash";
import { formatDateClient } from "../../share/helper";
const Customer = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [listprovince, setListProvince] = useState([]);
  const [objTotal, setObjTotal] = useState(null);
  const [objFilter, setObjFilter] = useState({});
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    setLoading(true);
    request("customer", "get").then((res) => {
      console.log(res);
      setLoading(false);
      if (res) {
        setList(res.list_customer);
        setListProvince(res.list_province);
      }
    });
  };
  const onClickEdit = (row) => {};
  const onClickDelete = (row) => {};
  const OpenModal = () => {
    setVisible(true);
  };
  const onCloseModal = () => {
    setVisible(false);
    form.resetFields();
  };
  const onFinish = (item) => {
    setLoading(true);
    request("customer", "post", item).then((res) => {
      setLoading(false);
      if (res) {
        notification.success({
          message: "Create Customer",
          description:
            "Customer " + item.phone + " has been saved successfully!",
        });
        onCloseModal();
        getList();
      } else {
        notification.error({
          message: "Fail Create Customer",
          description: "Customer " + item.phone + " can not created!",
        });
      }
    });
  };
  return (
    <MainPageDesh>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <div>
            <h5>Customer List</h5>
          </div>
          <div>
            <Button onClick={OpenModal} type="primary">
              Create New
            </Button>
          </div>
        </div>
        <Table
          columns={[
            {
              key: "no",
              title: "No",
              render: (row, recode, index) => {
                index + 1;
              },
            },
            {
              key: "firstname",
              title: "First Name",
              dataIndex: "firstname",
            },

            {
              key: "lastname",
              title: "Last Name",
              dataIndex: "lastname",
            },

            {
              key: "gender",
              title: "Gender",
              dataIndex: "gender",
              render: (item) => (item == 1 ? "Male" : "Female"),
            },
            {
              key: "created_at",
              title: "Date",
              dataIndex: "created_at",
              render: (item) => formatDateClient(item),
            },
            {
              key: "action",
              title: "Action",
              render: (item, row) => {
                return (
                  <Space>
                    <Button
                      onClick={() => {
                        onClickEdit(row);
                      }}
                      type="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        onClickDelete(row);
                      }}
                      type="primary"
                      danger
                    >
                      Delete
                    </Button>
                  </Space>
                );
              },
            },
          ]}
          dataSource={list}
        />
        <Modal
          open={visible}
          onCancel={onCloseModal}
          footer={null}
          title={"New Customer"}
        >
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="User Name"
                  name={"phone"}
                  rules={[
                    {
                      required: true,
                      message: "Please input Usermame!",
                    },
                  ]}
                >
                  <Input placeholder="Usermame" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name={"password"}
                  rules={[
                    {
                      required: true,
                      message: "Please input Password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item
                  label="First Name"
                  name={"firstname"}
                  rules={[
                    {
                      required: true,
                      message: "Please input First Name!",
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  name={"lastname"}
                  rules={[
                    {
                      required: true,
                      message: "Please input Last Name!",
                    },
                  ]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item label="Gender" name={"gender"}>
                  <Select defaultValue={1}>
                    <Option value={1}>Male</Option>
                    <Option value={0}>Female</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Province" name={"province_id"}>
                  <Select allowClear={true} placeholder={"Select Province"}>
                    {listprovince?.map((pro, index) => {
                      return (
                        <Option key={index} value={pro.province_id}>
                          {pro.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Description" name={"address_desc"}>
              <Input.TextArea placeholder="Address description" />
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={onCloseModal} type="primary" danger>
                  Cancel
                </Button>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MainPageDesh>
  );
};

export default Customer;
