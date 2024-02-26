import React from "react";

interface InputProps {
  placeholder?: string;
  name?: string;
  value?: string | number | readonly string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * An input element
 */
const InputPass: React.FC<InputProps> = (props: InputProps) => {
  const {
    value = "",
    placeholder = "",
    onChange = () => null,
    name = "",
  } = props;
  function triggerOnChangeEvent(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e);
  }

  return (
    <input
      type="password"
      className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
      value={value}
      placeholder={placeholder}
      name={name}
      onChange={triggerOnChangeEvent}
    />
  );
};

<InputPass/>;
export default InputPass;
