import React from "react";
import {
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const CreateChallenge = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="question" label="Question" validate={[required()]} />
        <SelectInput
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
          ]}
        />
        <ReferenceInput
          source="lessonId"
          reference="lessons"
          label="Lesson Id"
        />
        <NumberInput source="order" label="Order" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};

export default CreateChallenge;
