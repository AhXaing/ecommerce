import React, { useEffect, useState } from "react";
import { request } from "../../share/request";
import { Table } from "antd";
const Product = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    request("product", "get", {}).then((res) => {
      if (res) {
        setList(res.list);
      }
    });
  };
  return (
    <div>
      <Table
        columns={[
          {
            key: "name",
            title: "Product Name",
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
          },
          {
            key: "created_at",
            title: "Date",
            dataIndex: "created_at",
          },
        ]}
        dataSource={list}
      />
    </div>
  );
};

export default Product;
