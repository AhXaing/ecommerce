import { useEffect, useState } from "react";
import { request } from "../../share/request";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Tag,
  Select,
  message,
} from "antd";
import { formatDateClient } from "../../share/helper";
const Product = () => {
  const [list, setList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [visible, setVisible] = useState(false);
  const { Option } = Select;

  const [form] = Form.useForm();

  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    request("product", "get", {}).then((res) => {
      if (res) {
        setList(res.list);
        setcategoryList(res.list_category);
      }
    });
  };
  const onCancelModal = () => {
    setVisible(false);
  };
  const onFinish = (item) => {
    var param = {
      category_id: item.category,
      barcode: item.barcode,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      description: item.description,
    };
    request("product", "post", param).then((res) => {
      if (res) {
        message.success(res.message);
        form.resetFields();
        setVisible(false);
        getList();
      }
    });
  };
  const onEditClick = (item) => {
    setVisible(true);
    form.setFieldsValue({
      category: item.category_id,
      barcode: item.barcode,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      description: item.description,
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
          <h4>List Products</h4>
        </div>
        <div>
          <Button onClick={() => setVisible(true)} type="primary" size="small">
            Create New
          </Button>
        </div>
      </div>

      <Table
        size="small"
        columns={[
          {
            key: "name",
            title: "Product",
            dataIndex: "name",
          },
          {
            key: "barcode",
            title: "Barcode",
            dataIndex: "barcode",
          },
          {
            key: "quantity",
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            key: "price",
            title: "Price",
            dataIndex: "price",
          },
          {
            key: "image",
            title: "Image",
            dataIndex: "image",
          },
          {
            key: "description",
            title: "Description",
            dataIndex: "description",
          },
          {
            key: "is_active",
            title: "Active",
            dataIndex: "is_active",
            render: (text, index) => {
              return (
                <Tag color={text == 1 ? "green" : "red"} key={index}>
                  {text == 1 ? "Active" : "Inactive"}
                </Tag>
              );
            },
          },
          {
            key: "created_at",
            title: "Date",
            dataIndex: "created_at",
            render: (text) => {
              return formatDateClient(text);
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
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button danger size="small">
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
      {/* Modal antd */}
      <Modal
        maskClosable={false}
        open={visible}
        title={"Create"}
        onCancel={onCancelModal}
        width={700}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: 700 }}
          onFinish={onFinish}
        >
          <Form.Item label={"Category"} name={"category"}>
            <Select placeholder="Select Category" allowClear={true}>
              {categoryList?.map((cate, index) => {
                return (
                  <Option key={index} value={cate.category_id}>
                    {cate.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label={"Barcode"}
                name={"barcode"}
                rules={[
                  {
                    required: true,
                    message: "Please input Barcode!",
                  },
                ]}
              >
                <Input placeholder="Barcode" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Product Name"}
                name={"name"}
                rules={[
                  {
                    required: true,
                    message: "Please input Product Name!",
                  },
                ]}
              >
                <Input placeholder="Product Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                label={"Quantity"}
                name={"quantity"}
                rules={[
                  {
                    required: true,
                    message: "Please input Quantity!",
                  },
                ]}
              >
                <Input placeholder="Quantity" allowClear={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={"Price"}
                name={"price"}
                rules={[
                  {
                    required: true,
                    message: "Please input Price!",
                  },
                ]}
              >
                <Input placeholder="Price" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label={"Image"} name={"image"}>
                <Input placeholder="Image" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Description"} name={"description"}>
                <Input placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ textAlign: "right" }}>
            <Space>
              <Button onClick={onCancelModal} type="primary" danger>
                Cancel
              </Button>
              <Button onClick={() => form.resetFields()}>Clear</Button>
              <Button type="primary">Save</Button>
              <Button htmlType="submit" type="primary">
                Save New
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
