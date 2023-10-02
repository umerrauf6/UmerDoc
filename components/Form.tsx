import React from "react";

const Form = ({
  title,
  type,
  placeholder,
  handleChange,
  value,
  options,
}: FormTypes) => {
  return (
    <div>
      <div>
        {type === "dropdown" ? (
          <select
            id={title}
            name={title}
            value={value[title]}
            onChange={handleChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled>{value[title]}</option>
            {options.map((op, index) => (
              <option key={index}>{op}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={title}
            className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
            id={title}
            value={value[title]}
            placeholder={placeholder}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
