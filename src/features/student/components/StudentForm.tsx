import { useForm } from "react-hook-form";
import { Student } from "../../../models";
import { Box, Button } from "@mui/material";
import {
  InputField,
  RadioGroupField,
  SelectField,
} from "../../../components/FormFields";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCityOptions } from "../../city/citySlice";

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

export default function StudentForm({
  initialValues,
  onSubmit,
}: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);

  const { control, handleSubmit } = useForm<Student>({
    defaultValues: initialValues,
  });

  const handleFormSubmit = (formValues: Student) => {
    console.log("Submit:", formValues);
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full Name" />
        <RadioGroupField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <InputField name="age" control={control} label="Age" />
        <InputField name="mark" control={control} label="Mark" />
        <SelectField
          name="city"
          control={control}
          label="City"
          options={cityOptions}
        />
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
