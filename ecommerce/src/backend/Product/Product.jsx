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
  notification,
  Checkbox,
} from "antd";
import { formatDateClient } from "../../share/helper";
import MainPageDash from "../../component/backend/MainPageDash";
const Product = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [categoryList, setcategoryList] = useState([]);
  const [productIDEdit, setProductIDEdit] = useState(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState(false);

  // const [txtSearch, setTxtSearch] = useState("");
  // const [categorySearch, setCategorySearch] = useState(null);
  // const [productstatus, setProductStatus] = useState(null);
  // const [page, setPage] = useState(1);

  const [totalRecode, setTotalRecode] = useState(0);
  const [objSearch, setObjSearch] = useState({
    page: 1,
    txtSearch: "",
    categorySearch: null,
    productstatus: null,
  });
  const { page, txtSearch, categorySearch, productstatus } = objSearch;

  const { Option } = Select;
  const [form] = Form.useForm();
  useEffect(() => {
    getList(objSearch);
  }, [page]);

  const getList = (parameter = {}) => {
    setLoading(true);
    var params = "?page=" + (parameter.page || 1);
    params += "&txtSearch=" + (parameter.txtSearch || "");
    params += "&categoryId=" + parameter.categorySearch;
    params += "&productstatus=" + parameter.productstatus;
    request("product" + params, "get", {}).then((res) => {
      setTimeout(() => {
        setLoading(false);
      }, 180);
      if (res) {
        setList(res.list);
        setTotalRecode(res.totalRecode);
        setcategoryList(res.list_category);
      }
    });
  };
  const ClearSearch = () => {
    var objClear = {
      ...objSearch,
      page: 1,
      txtSearch: "",
      categorySearch: null,
      productstatus: null,
    };
    setObjSearch({ ...objClear });
    getList(objClear);
  };
  const onCancelModal = () => {
    setVisible(false);
    setProductIDEdit(null);
    form.resetFields();
  };
  // const onChange = () => {
  //   if (ref.current.checked) {
  //     setActive(true);
  //   } else if (!ref.target.checked) {
  //     setActive(false);
  //   }
  // };
  const handleChange = (event) => {
    if (event.target.checked) {
      setChecked(event.target.checked);
      setActive(true);
      console.log("✅ Checkbox is checked");
    } else {
      setActive(false);
      console.log("⛔️ Checkbox is NOT checked");
    }
  };

  const onFinish = (item) => {
    if (productIDEdit == null) {
      var param = {
        category_id: item.category,
        barcode: item.barcode,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        description: item.description,
        is_active: active,
      };
      setLoading(true);
      request("product", "post", param).then((res) => {
        setLoading(false);
        if (res) {
          notification.success({
            message: "Create Product",
            description:
              "Product " + item.barcode + " has been saved successfully!",
          });
          form.resetFields();
          setVisible(false);
          getList(objSearch);
        }
      });
    } else {
      var paramUpdate = {
        pro_id: productIDEdit,
        category_id: item.category,
        barcode: item.barcode,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        description: item.description,
        is_active: active,
      };
      setLoading(true);
      request("product", "put", paramUpdate).then((res) => {
        setLoading(false);
        if (res) {
          notification.success({
            message: "Update Product",
            description:
              "Product " + item.barcode + " has been updated successfully!",
          });
          form.resetFields();
          setVisible(false);
          getList(objSearch);
        }
      });
    }
  };
  const onEditClick = (item) => {
    setVisible(true);
    setProductIDEdit(item.pro_id);
    form.setFieldsValue({
      category: item.category_id,
      barcode: item.barcode,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      description: item.description,
      is_active: active,
    });
  };
  const onDeleteClick = (item) => {
    request("product", "delete", { id: item.pro_id }).then((res) => {
      if (res) {
        notification.success({
          message: "Delete Product",
          description:
            "Product " + item.barcode + " has been updated successfully!",
        });
        getList(objSearch);
      }
    });
  };
  const createNew = () => {
    setVisible(true);
    form.resetFields();
  };
  return (
    <MainPageDash loading={loading}>
      <div>
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            padding: 10,
          }}
        >
          <div>
            <div>
              <h4>List Products</h4>
              <div style={{ fontSize: 15, padding: 5 }}>
                Total Rows: {totalRecode} Record
              </div>
            </div>
            <Space>
              <Input.Search
                value={txtSearch}
                placeholder="Search"
                allowClear={true}
                style={{ width: 200 }}
                onChange={(event) => {
                  setObjSearch({
                    ...objSearch,
                    txtSearch: event.target.value,
                  });
                }}
              />
              <Select
                // showSearch
                value={categorySearch}
                placeholder="Select Category"
                allowClear={true}
                style={{ width: 200 }}
                onChange={(value) => {
                  setObjSearch({
                    ...objSearch,
                    categorySearch: value,
                  });
                }}
              >
                {categoryList?.map((cate, index) => {
                  return (
                    <Option key={index} value={cate.category_id}>
                      {cate.name}
                    </Option>
                  );
                })}
              </Select>

              <Select // showSearch
                value={productstatus}
                placeholder="Select Staus"
                allowClear={true}
                style={{ width: 100 }}
                onChange={(value) => {
                  setObjSearch({
                    ...objSearch,
                    productstatus: value,
                  });
                }}
              >
                <Option value={1}>Active</Option>
                <Option value={0}>Inactive</Option>
              </Select>

              <Button onClick={() => getList(objSearch)} type="primary">
                Search
              </Button>
              <Button onClick={() => ClearSearch()} type="primary" danger>
                Clear
              </Button>
            </Space>
          </div>

          <div>
            <Button onClick={createNew} type="primary">
              Create New
            </Button>
          </div>
        </div>

        <Table
          pagination={{
            defaultCurrent: 1,
            total: totalRecode,
            pageSize: 10,
            onChange: (page, pageSize) => {
              setObjSearch({
                ...objSearch,
                page: page,
              });
            },
          }}
          size="small"
          columns={[
            {
              key: "number",
              title: "No",
              render: (text, record, index) => index + 1,
            },
            {
              key: "barcode",
              title: "Barcode",
              dataIndex: "barcode",
            },
            {
              key: "name",
              title: "Product",
              dataIndex: "name",
            },
            {
              key: "category_name",
              title: "Category",
              dataIndex: "category_name",
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
                      <Button
                        onClick={() => {
                          onDeleteClick(record);
                        }}
                        danger
                        size="small"
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
        {/* Modal antd */}
        <Modal
          maskClosable={false}
          open={visible}
          title={productIDEdit == null ? "Create" : "Update"}
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
            {/* <Switch defaultChecked /> */}
            <Space>
              <Form.Item
                valuePropName="checked"
                name={active}
                onChange={handleChange}
              >
                {checked ? (
                  <Checkbox checked={true} defaultChecked>
                    Active
                  </Checkbox>
                ) : (
                  <Checkbox>Active</Checkbox>
                )}
              </Form.Item>
            </Space>
            <Form.Item style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={onCancelModal} type="primary" danger>
                  Cancel
                </Button>
                <Button onClick={() => form.resetFields()}>Clear</Button>
                <Button htmlType="submit" type="primary">
                  {productIDEdit == null ? "Save" : "Update"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MainPageDash>
  );
};

export default Product;
