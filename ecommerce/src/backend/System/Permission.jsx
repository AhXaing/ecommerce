import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Col, Form, Input, Modal, Row, Space, Table, notification } from "antd";
import { request } from "../../share/request";
import { Button } from "react-bootstrap";
const Permission = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);
  const [permissionIDEdit, setPermissionIDEdit] = useState(null);
  // set fields dynamic
  // const [inputs, setInputs] = useState([{ groups: "", name: "", code: "" }]);

  useEffect(() => {
    getList();
  }, []);
  const onCancelModal = () => {
    setVisible(false);
    setPermissionIDEdit(null);
    form.resetFields();
  };

  // for add dynamic fields
  // const handleAddInput = () => {
  //   setInputs([...inputs, { groups: "", name: "", code: "" }]);
  // };
  // const handleChange = (event, index) => {
  //   let { name, value } = event.target;
  //   let onChangeValue = [...inputs];
  //   onChangeValue[index][name] = value;
  //   setInputs(onChangeValue);
  // };
  // const handleDeleteInput = (index) => {
  //   const newArray = [...inputs];
  //   newArray.splice(index, 1);
  //   setInputs(newArray);
  // };

  const getList = () => {
    request("permission", "get").then((res) => {
      if (res) {
        setList(res.list);
      }
    });
  };

  const onCreateNew = () => {
    setVisible(true);
  };
  const onFinish = (item) => {
    if (permissionIDEdit == null) {
      var params = {
        name: item.name,
        groups: item.groups,
        code: item.code,
      };
      request("permission", "post", params).then((res) => {
        if (res) {
          notification.success({
            message: "Create Permission",
            description:
              "Permission " + item.name + " has been saved successfully!",
          });
          form.resetFields();
          setVisible(false);
          getList();
        }
      });
    } else {
      var paramUpdate = {
        permission_id: permissionIDEdit,
        name: item.name,
        groups: item.groups,
        code: item.code,
      };
      request("permission", "put", paramUpdate).then((res) => {
        if (res) {
          notification.success({
            message: "Update Permission",
            description:
              "Permission " + item.name + " has been updated successfully!",
          });
          form.resetFields();
          setVisible(false);
          getList();
        }
      });
    }
  };
  const onEditClick = (item) => {
    setVisible(true);
    setPermissionIDEdit(item.permission_id);
    form.setFieldsValue({
      groups: item.groups,
      name: item.name,
      code: item.code,
    });
  };
  const onDeleteClick = (item) => {
    request("permission", "delete", { id: item.permission_id }).then((res) => {
      if (res) {
        notification.success({
          message: "Delete Permission",
          description:
            "Permission " + item.name + " has been deleted successfully!",
        });
        form.resetFields();
        setVisible(false);
        getList();
      }
    });
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <div>List Permission</div>
          <div>
            <Button size="sm" onClick={onCreateNew}>
              Create New
            </Button>
          </div>
        </div>
      </div>

      <Table
        columns={[
          {
            key: "no",
            title: "No",
            render: (index, recorde, item) => {
              index + 1;
            },
          },
          {
            key: "groups",
            title: "Groups",
            dataIndex: "groups",
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "code",
            title: "Codes",
            dataIndex: "code",
          },
          {
            key: "action",
            title: "Action",
            render: (text, record, index) => {
              return (
                <div>
                  <Space>
                    <Button
                      onClick={() => onEditClick(record)}
                      type="primary"
                      size="sm"
                      variant="info"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        onDeleteClick(record);
                      }}
                      danger
                      size="sm"
                    >
                      Delete
                    </Button>
                  </Space>
                </div>
              );
            },
          },
        ]}
        dataSource={list}
      />

      {/* Modal */}
      <Modal
        open={visible}
        onCancel={onCancelModal}
        maskClosable={false}
        width={700}
        footer={null}
      >
        {/* <Form form={form} onFinish={onFinish}>
          <Row className="g-2 mb-2">
            {inputs.map((item, index) => (
              <div className="input_container" key={index}>
                <input
                  placeholder="Groups"
                  name={"groups"}
                  type="text"
                  value={item.groups}
                  onChange={(event) => handleChange(event, index)}
                />
                <input
                  placeholder="Name"
                  name={"name"}
                  type="text"
                  value={item.name}
                  onChange={(event) => handleChange(event, index)}
                />
                <input
                  placeholder="Code"
                  name={"code"}
                  type="text"
                  value={item.code}
                  onChange={(event) => handleChange(event, index)}
                />
                <Space>
                  {inputs.length > 1 && (
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteInput(index)}
                    >
                      Del
                    </Button>
                  )}

                  {index === inputs.length - 1 && (
                    <Button
                      size="x-sm"
                      variant="info"
                      onClick={() => handleAddInput()}
                    >
                      Add
                    </Button>
                  )}
                </Space>
              </div>
            ))}

            <div className="body"> {JSON.stringify(inputs)} </div>
          </Row>
          <Button htmlType="submit" variant="outline-success" htmlt>
            Save
          </Button>
        </Form> */}

        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label={"Groups"}
            name={"groups"}
            rules={[
              {
                required: true,
                message: "Please input Groups!",
              },
            ]}
          >
            <Input placeholder="Groups" />
          </Form.Item>

          <Form.Item
            label={"Name"}
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input Name!",
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label={"Code"}
            name={"code"}
            rules={[
              {
                required: true,
                message: "Please input Code!",
              },
            ]}
          >
            <Input placeholder="Code" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button
                variant="danger"
                onClick={onCancelModal}
                type="primary"
                danger
              >
                Cancel
              </Button>
              <Button variant="warning" onClick={() => form.resetFields()}>
                Clear
              </Button>
              <Button htmlType="submit" variant="info">
                {permissionIDEdit == null ? "Save" : "Update"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Permission;
