import React, { useState, useEffect } from "react";
// import qs from "qs";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debouncedParams = useDebounce(params, 500);
  const [persons, setPersons] = useState([]);
  const [list, setList] = useState([]);
  const client = useHttp();

  // 获取 list 中项目名和负责人的数据
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParams) }).then(setList);

    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParams))}`
    // ).then(async (response) => {
    //   try {
    //     if (response.ok) {
    //       setList(await response.json());
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
  }, [debouncedParams]);

  // 获取 select 框中负责人的数据
  useMount(() => {
    client("persons").then(setPersons);

    // fetch(`${apiUrl}/persons`).then(async (response) => {
    //   try {
    //     if (response.ok) {
    //       setPersons(await response.json());
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel params={params} setParams={setParams} persons={persons} />
      <List list={list} persons={persons} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
