import { useForm } from "react-hook-form";
import { Student } from "../../../models";
import { Box, Button, CircularProgress, Alert } from "@mui/material";
import {
  InputField,
  RadioGroupField,
  SelectField,
} from "../../../components/FormFields";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectCityOptions } from "../../city/citySlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a name")
    .test("two-words", "Please enter at least two words", (value) => {
      if (!value) return true;
      const parts = value?.split(" ") || [];
      return parts.filter((x) => Boolean(x))?.length >= 2;
    }),
  age: yup
    .number()
    .positive("Please enter a positive number")
    .min(18, "Min is 18")
    .max(60, "Max is 60")
    .integer("Please enter an integer")
    .required("Please enter age")
    .typeError("Please enter a valid number"),
  mark: yup
    .number()
    .positive("Please enter a positive number")
    .min(0, "Min is 0")
    .max(10, "Max is 10")
    .required("Please enter mark")
    .typeError("Please enter a valid number"),
  gender: yup
    .string()
    .oneOf(["male", "female"], "Please select either male or female")
    .required("Please select gender"),
  city: yup.string().required("Please select city"),
});

export default function StudentForm({
  initialValues,
  onSubmit,
}: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    // console.log("Submit:", formValues);
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 3000);
    // });

    try {
      //clear previous submission error
      setError("");
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
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
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField
            name="city"
            control={control}
            label="City"
            options={cityOptions}
          />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp; Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
