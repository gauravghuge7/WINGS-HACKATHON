import React, { useState } from "react";

const CustomFormBuilder = () => {
  const [fields, setFields] = useState([]);

  const addField = (type) => {
    setFields([...fields, { type, id: Date.now(), heading: "", options: [""], required: false }]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const updateField = (id, fieldName, value) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, [fieldName]: value } : field
    ));
  };

  const updateOption = (fieldId, index, value) => {
    setFields(fields.map(field =>
      field.id === fieldId
        ? {
            ...field,
            options: field.options.map((option, idx) => idx === index ? value : option)
          }
        : field
    ));
  };

  const addOption = (fieldId) => {
    setFields(fields.map(field =>
      field.id === fieldId
        ? { ...field, options: [...field.options, ""] }
        : field
    ));
  };

  const removeOption = (fieldId, index) => {
    setFields(fields.map(field =>
      field.id === fieldId
        ? { ...field, options: field.options.filter((_, idx) => idx !== index) }
        : field
    ));
  };

  const toggleRequired = (id) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, required: !field.required } : field
    ));
  };

  const submitForm = () => {
    const formValues = fields.map(field => ({
      type: field.type,
      heading: field.heading,
      options: field.options,
      required: field.required
    }));
    console.log("Form Submitted:", formValues);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Create Your Custom Form
      </h1>

      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("text")}>Add Text</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("radio")}>Add Radio</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("checkbox")}>Add Checkbox</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("dropdown")}>Add Dropdown</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => addField("textarea")}>Add Textarea</button>
        </div>

        <form className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-600 font-medium">
                  {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                </label>
                <button className="text-red-500 font-medium" onClick={() => removeField(field.id)}>Remove</button>
              </div>

              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter heading"
                value={field.heading}
                onChange={(e) => updateField(field.id, "heading", e.target.value)}
              />

              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={() => toggleRequired(field.id)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-600">Required</span>
              </div>

              {["radio", "checkbox", "dropdown"].includes(field.type) && (
                <div className="mt-3 space-y-2">
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(field.id, index, e.target.value)}
                      />
                      <button className="text-red-500" type="button" onClick={() => removeOption(field.id, index)}>X</button>
                    </div>
                  ))}
                  <button className="text-blue-500 text-sm font-medium" type="button" onClick={() => addOption(field.id)}>+ Add Option</button>
                </div>
              )}

              {field.type === "textarea" && (
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter text"
                  value={field.heading}
                  onChange={(e) => updateField(field.id, "heading", e.target.value)}
                />
              )}
            </div>
          ))}
        </form>

        <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 font-medium" onClick={submitForm}>
          Submit Form
        </button>
      </div>
    </div>
  );
};

export default CustomFormBuilder;






