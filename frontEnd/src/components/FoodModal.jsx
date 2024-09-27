import React, { useEffect, useState } from "react";

const FoodModal = ({ isOpen, onClose, foodItem, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    isAvailable: true,
    imgLink: "",
    desc: "",
    category: "",
    veg: false, // Add veg field here
  });

  const [errors, setErrors] = useState({}); // To store error messages

  useEffect(() => {
    if (foodItem) {
      setFormData(foodItem);
    } else {
      setFormData({
        name: "",
        price: "",
        isAvailable: true,
        imgLink: "",
        desc: "",
        category: "",
        veg: false, // Reset veg field for new item
      });
    }
  }, [foodItem]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate input
    if (formData.name.length < 3 || formData.name.length > 30) {
      newErrors.name = "Name must be between 3 and 30 characters.";
    }
    if (formData.price < 5 || formData.price > 2000) {
      newErrors.price = "Price must be between 5 and 2000.";
    }
    if (formData.desc.length < 5 || formData.desc.length > 50) {
      newErrors.desc = "Description must be between 5 and 50 characters.";
    }
    if (formData.category < 1 || formData.category > 8) {
      newErrors.category = "Category must be a number between 1 and 8.";
    }

    // Check if there are errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop form submission if there are errors
    }

    // Call save function if validation passes
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    onDelete(foodItem);
    onClose();
  };

  if (!isOpen) return null;

  const categories = [
    { value: 1, label: "Beverages" },
    { value: 2, label: "Appetizers" },
    { value: 3, label: "Fast Food" },
    { value: 4, label: "North Indian" },
    { value: 5, label: "South Indian" },
    { value: 6, label: "Chinese" },
    { value: 7, label: "Continental" },
    { value: 8, label: "Dessert" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">
          {foodItem ? "Edit Food Item" : "Create Food Item"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Image Link:</label>
            <input
              type="text"
              name="imgLink"
              value={formData.imgLink}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description:</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            ></textarea>
            {errors.desc && <p className="text-red-500">{errors.desc}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500">{errors.category}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="veg"
                checked={formData.veg}
                onChange={handleChange}
                className="mr-2"
              />
              Vegetarian
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="mr-2"
              />
              Available
            </label>
          </div>
          <div className="flex justify-between">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
        {foodItem && (
          <div className="mt-4">
            <button onClick={handleDelete} className="btn btn-danger w-full">
              Delete Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodModal;
