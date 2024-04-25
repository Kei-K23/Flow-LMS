"use client";

import React from "react";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CourseList from "./course/list";
import CreateCourse from "./course/create";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CreateCourse}
        recordRepresentation="tile"
      />
    </Admin>
  );
};

export default App;
