import axios from "axios";
import { useState } from "react";
import Taskbar from "../components/taskbar";
import { useRecoilState } from "recoil";
import { userAtom } from "../store/atoms/user";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:3050/api/v1";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fName: "",
    mobNo: "",
    password: "",
    confirm_Password: "",
    isAdmin: false, // For admin selection
    adminKey: "", // Admin key, shown if isAdmin is true
  });
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);

  console.log(currentUser); //for debugging

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setError("");

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match
    if (formData.password !== formData.confirm_Password) {
      setError("Passwords do not match");
      return;
    }

    // If the user is an admin, ensure the adminKey is entered
    if (formData.isAdmin && !formData.adminKey.trim()) {
      setError("Admin Key is required for admin users");
      return;
    }
    
    const url = formData.isAdmin
      ? `${baseUrl}/user/signup/${formData.adminKey}` // Admin route with adminKey
      : `${baseUrl}/user/signup/:adminKey`; // Normal user signup
      
    try {
      // Sending signup data to backend
      const response = await axios.post(url, {
        name: formData.fName.trim(),
        mobNo: `+91${formData.mobNo}`,
        password: formData.confirm_Password,
        isAdmin: formData.isAdmin,
        adminKey: formData.isAdmin ? formData.adminKey : null, // Send adminKey only if admin
      });

      // Handle success
      if (response.status === 200) {
        console.log(response.data);
        localStorage.setItem("authorization", response.data.token);
        console.log("User creation success");
        setCurrentUser({
          mobNo: formData.mobNo,
          name: formData.fName,
          isAdmin: formData.isAdmin,
        });
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      // Handle error cases
      if (error.response) {
        console.error(
          "Error occurred with status code: " + error.response.status
        );

        if (error.response.status === 400) {
          setError("Invalid User Details given");
          console.error(error.message);
        } else if (error.response.status === 401) {
          setError("Invalid AdminKey: Unauthorized");
          console.error(error.message);
        } else if (error.response.status === 409) {
          setError("User already exists, try signing up");
          console.error(error.message);
        } else {
          setError(
            "Internal Server problem, try contacting Owner or technician"
          );
          console.error(error.message);
        }
      } else {
        console.error("An unknown error occurred", error);
      }
    }
  };

  return (
    <div>
      <div className=" min-h-screen flex flex-col">
        <Taskbar />
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white bg-opacity-90 px-8 py-10 rounded-lg shadow-lg text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-bold">
              {success ? "User Creation Successful" : "Sign Up"}
            </h1>
            {success && (
              <p className="text-green-500 text-center mb-4">User created successfully!</p>
            )}
            {error && (
              <p className="text-red-500 text-center mb-4">{error}</p>
            )}
            {!success && (
              <form onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div className="flex items-center border border-grey-light rounded mb-4">
                  <input
                    type="text"
                    className="block w-full p-3 rounded"
                    name="fName"
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                </div>

                {/* Mobile Number Field */}
                <div className="flex items-center border border-grey-light rounded mb-4">
                  <input
                    type="tel"
                    className="block w-full p-3 rounded"
                    name="mobNo"
                    onChange={handleChange}
                    placeholder="Mobile Number (10 digits)"
                    required
                    pattern="^[6789]\d{9}$"
                    title="Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9."
                  />
                </div>

                {/* Password Field */}
                <div className="flex items-center border border-grey-light rounded mb-4">
                  <input
                    type="password"
                    className="block w-full p-3 rounded"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="flex items-center border border-grey-light rounded mb-4">
                  <input
                    type="password"
                    className="block w-full p-3 rounded"
                    name="confirm_Password"
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                  />
                </div>

                {/* Admin User Selection */}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label className="text-gray-600">Register as Admin</label>
                </div>

                {/* Admin Key Field (only show if user is admin) */}
                {formData.isAdmin && (
                  <div className="flex items-center border border-grey-light rounded mb-4">
                    <input
                      type="password"
                      className="block w-full p-3 rounded"
                      name="adminKey"
                      onChange={handleChange}
                      placeholder="Admin Key"
                      required={formData.isAdmin}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
