type FormInputProps = React.ComponentProps<"input"> & {
  label: string;
};

const FormInput = ({ label, id, ...props }: FormInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
        {...props}
      />
    </div>
  );
};

export default FormInput;
