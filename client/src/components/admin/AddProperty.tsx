import React from "react";
import Button from "@/components/common/Button";
import { sanitizePrice } from "@/utils/bookingUtils";
import { PropertyFormData as APIPropertyFormData } from "@/types/property";

// Frontend form data type (with string price for input handling)
interface FormData {
  title: string;
  description: string;
  pricePerNight: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  images: string[];
}

interface AddPropertyProps {
  onSubmit: (data: APIPropertyFormData) => void;
  isLoading?: boolean;
}

const AddProperty: React.FC<AddPropertyProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [propertyForm, setPropertyForm] = React.useState<FormData>({
    title: "",
    description: "",
    pricePerNight: "",
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    images: [""],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setPropertyForm((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value,
        },
      }));
    } else if (name === "pricePerNight") {
      // For price field, ensure only integers are allowed
      const intValue = value.replace(/[^\d]/g, ""); // Remove non-digits
      setPropertyForm((prev) => ({
        ...prev,
        [name]: intValue,
      }));
    } else {
      setPropertyForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...propertyForm.images];
    newImages[index] = value;
    setPropertyForm((prev) => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setPropertyForm((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeImageField = (index: number) => {
    if (propertyForm.images.length > 1) {
      const newImages = propertyForm.images.filter((_, i) => i !== index);
      setPropertyForm((prev) => ({ ...prev, images: newImages }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert string price to integer (no decimals for Indian Rupees)
    const apiFormData: APIPropertyFormData = {
      ...propertyForm,
      pricePerNight: sanitizePrice(propertyForm.pricePerNight),
    };
    onSubmit(apiFormData);
  };

  const resetForm = () => {
    setPropertyForm({
      title: "",
      description: "",
      pricePerNight: "",
      location: {
        address: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
      },
      images: [""],
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Property Management
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700 border-b pb-2">
            Basic Information
          </h2>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={propertyForm.title}
              onChange={handleInputChange}
              placeholder="Enter property title"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={propertyForm.description}
              onChange={handleInputChange}
              placeholder="Enter property description"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>

          <div>
            <label
              htmlFor="pricePerNight"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price Per Night (₹) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="pricePerNight"
              name="pricePerNight"
              value={propertyForm.pricePerNight}
              onChange={handleInputChange}
              placeholder="Enter price per night in rupees"
              required
              min="0"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700 border-b pb-2">
            Location Details
          </h2>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="location.address"
              value={propertyForm.location.address}
              onChange={handleInputChange}
              placeholder="Enter street address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="location.city"
                value={propertyForm.location.city}
                onChange={handleInputChange}
                placeholder="Enter city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="state"
                name="location.state"
                value={propertyForm.location.state}
                onChange={handleInputChange}
                placeholder="Enter state"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="location.country"
                value={propertyForm.location.country}
                onChange={handleInputChange}
                placeholder="Enter country"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="zipCode"
                name="location.zipCode"
                value={propertyForm.location.zipCode}
                onChange={handleInputChange}
                placeholder="Enter ZIP code"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700 border-b pb-2">
            Property Images
          </h2>

          {propertyForm.images.map((image, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="flex-1">
                <label
                  htmlFor={`image-${index}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Image URL {index + 1}{" "}
                  {index === 0 && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="url"
                  id={`image-${index}`}
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="Enter image URL"
                  required={index === 0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {propertyForm.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="mt-6 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Another Image
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex gap-4 pt-6 border-t">
          <Button
            type="submit"
            text={isLoading ? "Adding Property..." : "Add Property"}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
            disabled={isLoading}
          />
          <Button
            type="button"
            text="Reset Form"
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-600 px-6 py-2"
          />
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
