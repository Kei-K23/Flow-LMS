import React from "react";
import {
  BooleanInput,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const EditChallengeOptions = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="id" label="Id" validate={[required()]} />
        <TextInput source="text" label="Text" validate={[required()]} />
        <BooleanInput
          source="correct"
          label="Correct"
          validate={[required()]}
        />
        <ReferenceInput
          source="challengeId"
          reference="challenges"
          label="Challenge Id"
        />
        <TextInput source="imageSrc" label="Image src" />
        <TextInput source="audioSrc" label="Audio src" />
        <NumberInput source="order" label="Order" validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
};

export default EditChallengeOptions;
