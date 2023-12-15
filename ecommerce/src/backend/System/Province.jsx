import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { request } from "../../share/request";
import { formatDateClient } from "../../share/helper";

const Province = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    request("province", "get").then((res) => {
      if (res) {
        setList(res.list);
      }
    });
  };
  const onEditClick = () => {};
  const onDeleteClick = () => {};
  return (
    <div>
      <Table
        columns={[
          {
            key: "number",
            title: "No",
            render: (text, record, index) => index + 1,
          },
          {
            key: "name",
            title: "Province",
            dataIndex: "name",
          },
          {
            key: "description",
            title: "Description",
            dataIndex: "description",
          },
          {
            key: "date_added",
            title: "Date",
            dataIndex: "date_added",
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
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        onDeleteClick(record);
                      }}
                      type="primary"
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
    </div>
  );
};

export default Province;
