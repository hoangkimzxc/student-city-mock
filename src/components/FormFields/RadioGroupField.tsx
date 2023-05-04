import { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  RadioGroup,
  Radio,
  FormHelperText,
} from "@mui/material";
import { Control, useController } from "react-hook-form";

export interface RadioOption {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export function RadioGroupField({
  name,
  control,
  label,
  disabled,
  options,
}: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({ name, control });
  return (
    <FormControl
      margin="normal"
      component="fieldset"
      disabled={disabled}
      error={invalid}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            control={<Radio color="secondary" />}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
