import { PhoneIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios, { Axios } from "axios";
export default function SignInPage() {
  const [formData, setFormData] = useState({
    mobNo: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent the default behaviour of form, which might response into page-reload
    //CALL TO Backend
    console.log(`+91${formData.mobNo}`);
    console.log(formData.password);
    try {
      const response = await axios.post(
        "http://localhost:3050/api/v1/user/signin",
        {
          mobNo: `+91${formData.mobNo}`,
          password: formData.password,
        }
      );

      if (response.status == 200) {
        localStorage.setItem("authorization", response.data.token);
      }
    } catch (error) {
      // Handle error cases
      if (error.response) {
        console.error(
          "Error occurred with status code: " + error.response.status
        );removeEventListener
        if (error.response.status === 400) {
          setError("Invalid User Details given");
          console.error(error.message);
        } else if (error.response.status === 401) {
          setError("Invalid AdminKey: Unauthorized");
          console.error(error.message);
        } else if (error.response.status === 404) {
          setError("User not exists, try signing-up");
          console.error(error.message);
        }
      } else {
        setError("Internal Server problem, try contacting Owner or technician");
        console.error(error.message);
      }
    }
  };
  return (
    <>
      <div className="bg-gradient-to-br from-yellow-200 to-orange-300 min-h-screen flex flex-col">
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white bg-opacity-90 px-8 py-10 rounded-lg shadow-lg text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-bold">Sign In</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
                  pattern="^[789]\d{9}$" // Regex for Indian mobile numbers
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
    </>
  );
}
