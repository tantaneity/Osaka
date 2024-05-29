import React from 'react';
import { Input, Typography } from '@material-tailwind/react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, type = 'text', error }) => (
  <div>
    <Typography className="-mb-2 mt-2" variant="h6">
      {label}
    </Typography>
    <Input
      label={label}
      size="lg"
      value={value}
      onChange={onChange}
      type={type}
      error={!!error}
    />
    {error && (
      <Typography className="text-red-500" variant="small">
        {error}
      </Typography>
    )}
  </div>
);

export default InputField;
