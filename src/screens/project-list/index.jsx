import React, { useState, useEffect } from "react";
import qs from "qs";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    projectName: "",
    personId: "",
  });
  const [persons, setPersons] = useState([]);
  const [list, setList] = useState([]);

  // 获取 list 中项目名和负责人的数据
  useEffect(() => {
    // fetch("")
    //   .then((response) => response.ok && response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));

    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(params))}`).then(
      async (response) => {
        try {
          if (response.ok) {
            setList(await response.json());
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }, [params]);

  // 获取 select 框中负责人的数据
  useEffect(() => {
    fetch(`${apiUrl}/persons`).then(async (response) => {
      try {
        if (response.ok) {
          setPersons(await response.json());
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} persons={persons} />
      <List list={list} persons={persons} />
    </div>
  );
};
