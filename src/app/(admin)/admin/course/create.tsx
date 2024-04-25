import React from "react";
import { Create, required, SimpleForm, TextInput } from "react-admin";

const CreateCourse = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" label="Title" validate={[required()]} />
        <TextInput
          source="imageSrc"
          label="Image Src"
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};

export default CreateCourse;
