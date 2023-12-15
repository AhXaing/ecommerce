import { useEffect, useState } from "react";
import { request } from "../../share/request";
import { Form, Input, Modal, Space, Table, notification, Button } from "antd";
import { formatDateClient } from "../../share/helper";

const Role = () => {
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [roleIDEdit, setRoleIDEdit] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    request("role", "get").then((res) => {
      if (res) {
        setList(res.list);
      }
    });
  };

  const onFinish = (item) => {
    if (roleIDEdit == null) {
      var param = {
        name: item.name,
        code: item.code,
      };
      request("role", "post", param).then((res) => {
        console.log(res);
        if (res) {
          notification.success({
            message: "Create Role",
            description:
              "Permission " + item.name + " has been saved successfully!",
          });
          form.resetFields();
          setVisible(false);
          getList();
        }
      });
    } else {
      var paramEdit = {
        role_id: roleIDEdit,
        name: item.name,
        code: item.code,
      };
      request("role", "put", paramEdit).then((res) => {
        if (res) {
          notification.success({
            message: "Update Role",
            description:
              "Role " + item.name + " has been updated successfully!",
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
    setRoleIDEdit(item.role_id);
    form.setFieldsValue({
      name: item.name,
      code: item.code,
    });
  };
  const onDeleteClick = (item) => {
    request("role", "delete", { id: item.role_id }).then((res) => {
      if (res) {
        notification.success({
          message: "Delete Role",
          description: "Role " + item.name + " has been deleted successfully!",
        });
        form.resetFields();
        setVisible(false);
        getList();
      }
    });
  };
  const onCreateNew = () => {
    setVisible(true);
  };
  const onCancelModal = () => {
    setVisible(false);
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
          <div>List Role</div>
          <div>
            <Button variant="secondary" size="sm" onClick={onCreateNew}>
              Create New
            </Button>
          </div>
        </div>
      </div>

      <Table
        size="small"
        columns={[
          {
            key: "number",
            title: "No",
            render: (text, record, index) => index + 1,
          },
          {
            key: "name",
            title: "Name",
            dataIndex: "name",
          },
          {
            key: "code",
            title: "Code",
            dataIndex: "code",
          },
          {
            key: "created_at",
            title: "Date",
            dataIndex: "created_at",
            render: (date) => {
              return formatDateClient(date);
            },
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
      <Modal
        open={visible}
        onCancel={onCancelModal}
        maskClosable={false}
        width={700}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
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
              <Button onClick={onCancelModal} type="primary" danger>
                Cancel
              </Button>
              <Button onClick={() => form.resetFields()}>Clear</Button>
              <Button htmlType="submit">
                {/* {roleIDEdit == null ? "Save" : "Update"} */}
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Role;
