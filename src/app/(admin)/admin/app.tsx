"use client";

import React from "react";

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CourseList from "./course/list";
import CreateCourse from "./course/create";
import EditCourse from "./course/edit";
import UnitList from "./unit/list";
import CreateUnit from "./unit/create";
import EditUnit from "./course/edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CreateCourse}
        edit={EditCourse}
        recordRepresentation="title"
      />
      <Resource
        name="units"
        list={UnitList}
        create={CreateUnit}
        edit={EditUnit}
        recordRepresentation="title"
      />
    </Admin>
  );
};

export default App;
