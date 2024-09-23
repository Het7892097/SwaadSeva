import { PhoneIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function SignInPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-yellow-200 to-orange-300 min-h-screen flex flex-col">
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white bg-opacity-90 px-8 py-10 rounded-lg shadow-lg text-black w-full">
            <h1 className="mb-8 text-3xl text-center font-bold">Sign In</h1>
            <form>
              {/* Mobile Number Field */}
              <div className="flex items-center border border-grey-light rounded mb-4">
                <PhoneIcon className="h-5 w-5 text-gray-400 ml-3" />
                <input
                  type="tel"
                  className="block w-full p-3 rounded-r"
                  name="mobile"
                  placeholder="Mobile Number (10 digits)"
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
