import React, { useState, useEffect } from "react";
import qs from "qs";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    projectName: "",
    personId: "",
  });
  const debouncedParams = useDebounce(params, 2000);
  const [persons, setPersons] = useState([]);
  const [list, setList] = useState([]);

  // 获取 list 中项目名和负责人的数据
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`
    ).then(async (response) => {
      try {
        if (response.ok) {
          setList(await response.json());
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, [debouncedParams]);

  // 获取 select 框中负责人的数据
  useMount(() => {
    fetch(`${apiUrl}/persons`).then(async (response) => {
      try {
        if (response.ok) {
          setPersons(await response.json());
        }
      } catch (error) {
        console.log(error);
      }
    });
  });

  return (
    <div>
      <SearchPanel params={params} setParams={setParams} persons={persons} />
      <List list={list} persons={persons} />
    </div>
  );
};
