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
import ChallengeList from "./challenge/list";
import CreateChallenge from "./challenge/create";
import EditChallenge from "./challenge/edit";
import ChallengeOptionsList from "./challenge-options/list";
import CreateChallengeOption from "./challenge-options/create";
import EditChallengeOptions from "./challenge-options/edit";

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
      <Resource
        name="challenges"
        list={ChallengeList}
        create={CreateChallenge}
        edit={EditChallenge}
        recordRepresentation="title"
      />
      <Resource
        name="challenges-options"
        list={ChallengeOptionsList}
        create={CreateChallengeOption}
        edit={EditChallengeOptions}
        recordRepresentation="title"
      />
    </Admin>
  );
};

export default App;
