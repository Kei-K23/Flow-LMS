import React from "react";
import { Edit, required, SimpleForm, TextInput } from "react-admin";

const EditCourse = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" label="Id" validate={[required()]} />
        <TextInput source="title" label="Title" validate={[required()]} />
        <TextInput
          source="imageSrc"
          label="Image Src"
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
};

export default EditCourse;
