import { UserIcon, PhoneIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function SignUpPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 min-h-screen flex flex-col">
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white bg-opacity-90 px-8 py-10 rounded-lg shadow-lg text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-bold">Sign Up</h1>
            <form>
              {/* Full Name Field */}
              <div className="flex items-center border border-grey-light rounded mb-4">
                <UserIcon className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  className="block w-full p-3 rounded-r"
                  name="fullname"
                  placeholder="Full Name"
                  required
                />
              </div>

              {/* Mobile Number Field */}
              <div className="flex items-center border border-grey-light rounded mb-4">
                <PhoneIcon className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="tel"
                  className="block w-full p-3 rounded-r"
                  name="mobile"
                  placeholder="Mobile Number (10 digits)"
                  required
                  pattern="[0-9]{10}" // Optional: pattern for validation
                />
              </div>

              {/* Password Field */}
              <div className="flex items-center border border-grey-light rounded mb-4">
                <LockClosedIcon className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="password"
                  className="block w-full p-3 rounded-r"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="flex items-center border border-grey-light rounded mb-4">
                <LockClosedIcon className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="password"
                  className="block w-full p-3 rounded-r"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
