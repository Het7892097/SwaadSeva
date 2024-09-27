import { PhoneIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import Taskbar from "../components/taskbar";
import ConfirmationModal from "../components/ConfirmationModal";
import { userAtom } from "../store/atoms/user";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
const baseUrl = "http://localhost:3050/api/v1";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    mobNo: "",
    password: "",
  });

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [success, setSuccess] = useState(""); // To display success messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // console.log(currentUser); for checking the current user
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess(""); // Clear success message on new input
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${baseUrl}/user/signup/:`, {
        name: "Random User",
        mobNo: `+91${formData.mobNo}`,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("authtoken", response.data.token);
        setSuccess("User created successfully");
        setCurrentUser({
          mobNo: formData.mobNo,
          name: "Random User",
          isAdmin: false,
        });
        setShowModal(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        // Close modal after successful signup
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setError("User already exists");
        } else if (error.response.status === 400) {
          setError("Invalid user-detail format");
        }
      } else {
        setError("Failed to create user, try again later");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/user/signin`, {
        mobNo: `+91${formData.mobNo}`,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("authtoken", response.data.token);
        setCurrentUser({
          mobNo: formData.mobNo,
          name: response.data.name,
          isAdmin: response.data.isAdmin,
        });
        setSuccess("User is valid");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setShowModal(true); // Show confirmation modal on 404
        } else if (error.response.status === 401) {
          setError("Invalid User-credentials");
        } else if (error.response.status === 400) {
          setError("Invalid user-detail format");
        }
      } else {
        setError(
          "Internal Server problem, try contacting Owner or technician."
        );
      }
    }
  };

  return (
    <>
      <div className=" min-h-screen flex flex-col">
        <Taskbar />
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white bg-opacity-90 px-8 py-10 rounded-lg shadow-lg text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-bold">Sign In</h1>

            {/* Display error message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            {/* Display success message */}
            {success && (
              <p className="text-green-500 text-center mb-4">{success}</p>
            )}

            <form onSubmit={handleSubmit}>
              {/* Mobile Number Field */}
              <div className="flex items-center border border-grey-light rounded mb-4">
                <PhoneIcon className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="tel"
                  className="block w-full p-3 rounded-r"
                  name="mobNo"
                  placeholder="Mobile Number (10 digits)"
                  onChange={handleChange}
                  required
                  pattern="^[6789]\d{9}$"
                  title="Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9."
                />
              </div>

              {/* Password Field */}
              <div className="flex items-center border border-grey-light rounded mb-4">
                <LockClosedIcon className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  onChange={handleChange}
                  className="block w-full p-3 rounded-r"
                  name="password"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                  className="ml-2 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        func="signup"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleSignup}
      />
    </>
  );
}
