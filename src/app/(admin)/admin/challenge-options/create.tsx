import React from "react";
import {
  BooleanInput,
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const CreateChallengeOption = () => {
  return (
    <Create>
      <SimpleForm>
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
    </Create>
  );
};

export default CreateChallengeOption;
