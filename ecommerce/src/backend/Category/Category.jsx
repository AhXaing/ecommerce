import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import "./Category.css";
const Category = () => {
  useEffect(() => {
    getList();
  }, []);
  const [list, setList] = useState([]);
  const server = "http://localhost:5000/api/";
  const getList = () => {
    axios({
      url: server + "category",
      method: "get",
      data: {},
    })
      .then((res) => {
        var data = res.data;
        setList(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>List Categories</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Category Name</th>
            <th>Parent</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.cate_name}</td>
                <td>{item.parent_id}</td>
                <td>{item.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
