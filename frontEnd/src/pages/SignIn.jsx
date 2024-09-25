import { PhoneIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import Taskbar from "../components/taskbar";
import ConfirmationModal from "../components/ConfirmationModal"; 
import { userAtom } from "../store/user";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:3050/api/v1";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    mobNo: "",
    password: "",
  });

  const navigate=useNavigate();

  const [currentUser,setCurrentUser]=useRecoilState(userAtom);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [success, setSuccess] = useState(""); // To display success messages

  console.log(currentUser);
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
        localStorage.setItem("authorization", response.data.token);
        setSuccess("User created successfully");
        setCurrentUser({
          mobNo:formData.mobNo,
          name:"Random User",
          isAdmin:false,
        });
        setShowModal(false);
        setTimeout(()=>{
          navigate("/");
        },1000)
         // Close modal after successful signup
      }
    } catch (error) {
      if (error.response) {
        setError("Error during signup: " + error.message);
      } else {
        setError("Unknown error during signup.");
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
        localStorage.setItem("authorization", response.data.token);
        setCurrentUser({
          mobNo:formData.mobNo,
          name:response.data.name,
          isAdmin:response.data.isAdmin
        })
        setSuccess("User is valid");
        setTimeout(()=>{
          navigate("/");
        },1000)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setShowModal(true); // Show confirmation modal on 404
        } else {
          setError("An error occurred: " + error.message);
        }
      } else {
        setError("Internal Server problem, try contacting Owner or technician.");
      }
    }
  };

  return (
    <>
        
      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 min-h-screen flex flex-col">
      <Taskbar />
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white bg-opacity-90 px-8 py-10 rounded-lg shadow-lg text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-bold">Sign In</h1>
            
            {/* Display error message */}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            {/* Display success message */}
            {success && <p className="text-green-500 text-center mb-4">{success}</p>}
            
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
                  pattern="^[789]\d{9}$"
                  title="Please enter a valid 10-digit Indian mobile number starting with 7, 8, or 9."
                />
              </div>

              {/* Password Field */}
              <div className="flex items-center border border-grey-light rounded mb-4">
                <LockClosedIcon className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="password"
                  onChange={handleChange}
                  className="block w-full p-3 rounded-r"
                  name="password"
                  placeholder="Password"
                  required
                />
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
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleSignup}
      />
    </>
  );
}
