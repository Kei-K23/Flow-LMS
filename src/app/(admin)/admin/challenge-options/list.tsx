import React from "react";
import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

const ChallengeOptionsList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label="Id" />
        <TextField source="text" label="Text" />
        <BooleanField source="correct" label="Correct" />
        <ReferenceField source="challengeId" reference="challenges" />
        <TextField source="imageSrc" label="Image src" />
        <TextField source="audioSrc" label="Audio src" />
        <NumberField source="order" label="Order" />
      </Datagrid>
    </List>
  );
};

export default ChallengeOptionsList;
