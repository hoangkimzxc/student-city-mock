import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface SelectOption {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export function SelectField({
  name,
  control,
  label,
  disabled,
  options,
}: SelectFieldProps) {
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
      variant="outlined"
      size="small"
      fullWidth
    >
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
