"use client";

import React from "react";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import CourseList from "./course/list";
import CreateCourse from "./course/create";
import UnitList from "./unit/list";
import CreateUnit from "./unit/create";
import LessonList from "./lesson/list";
import EditCourse from "./course/edit";
import EditUnit from "./unit/edit";
import EditLesson from "./lesson/edit";
import CreateLesson from "./lesson/create";

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
      <Resource
        name="lessons"
        list={LessonList}
        create={CreateLesson}
        edit={EditLesson}
        recordRepresentation="title"
      />
    </Admin>
  );
};

export default App;
