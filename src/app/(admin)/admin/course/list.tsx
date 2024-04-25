import React from "react";
import { Datagrid, List, TextField } from "react-admin";

const CourseList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="imageSrc" />
      </Datagrid>
    </List>
  );
};

export default CourseList;
