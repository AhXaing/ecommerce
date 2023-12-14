import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Modal, Space, Switch, Table } from "antd";
import { request } from "../../share/request";
const Permission = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);
  const onCancelModal = () => {
    setVisible(false);
  };

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
  const onFinish = () => {};
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
            <Button onClick={onCreateNew}>Create New</Button>
          </div>
        </div>
      </div>

      <Table
        columns={[
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
            title: "Code",
            dataIndex: "code",
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
        <Form
          onFinish={onFinish}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
          name="dynamic_form_complex"
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
          initialValues={{
            items: [{}],
          }}
        >
          <Form.List name="items">
            {(fields, { add }) => (
              <div
                style={{
                  display: "flex",
                  rowGap: 16,
                  flexDirection: "column",
                }}
              >
                {fields.map((field) => (
                  <Card size="small" key={field.key}>
                    {/* Nest Form.List */}
                    <Form.Item>
                      <Form.List name={[field.name, "list"]}>
                        {(subFields, subOpt) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 16,
                            }}
                          >
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item
                                  noStyle
                                  name={"groups"}
                                  //name={[subField.name, "groups"]}
                                >
                                  <Input placeholder="Groups" />
                                </Form.Item>

                                <Form.Item
                                  noStyle
                                  name={"name"}
                                  //name={[subField.name, "name"]}
                                >
                                  <Input placeholder="Name" />
                                </Form.Item>

                                <Form.Item
                                  noStyle
                                  name={"code"}
                                  //name={[subField.name, "code"]}
                                >
                                  <Input placeholder="Code" />
                                </Form.Item>

                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            <div style={{ textAlign: "right" }}>
                              <Space>
                                <Button
                                  type="dashed"
                                  onClick={() => subOpt.add()}
                                >
                                  + Add Row
                                </Button>
                                <Button type="primary">Save</Button>
                              </Space>
                            </div>
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}
              </div>
            )}
          </Form.List>
        </Form>
      </Modal>
    </div>
  );
};
export default Permission;
