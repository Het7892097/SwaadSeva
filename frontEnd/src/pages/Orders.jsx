import React, { useEffect, useState } from 'react';
import Taskbar from "../components/taskbar";
import axios from 'axios';

const OrdersToday = () => {
  const [todayOrders, setTodayOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const ordersPerPage = 8;

  useEffect(() => {
    axios.get("http://localhost:3050/api/v1/user/orders", {
      headers: {
        authorization: localStorage.getItem("authorization") // Use the retrieved token for authorization
      }
    })
    .then((response) => {
      setTodayOrders(response.data.todayOrders || []); // Ensure default to an empty array
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error with", error.response.status);
      } else {
        console.error("Error:"); // Log any other errors
      }
    });
  }, []);

  useEffect(() => {
    console.log(todayOrders); // Log after state has updated
  }, [todayOrders]);

  // Filter todayOrders based on search term (by order name)
  const filteredOrders = todayOrders?.length > 0 ? todayOrders.filter(order =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Get current todayOrders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Taskbar />
      <div className="flex mt-8 flex-col">
        <h2 className="text-3xl font-semibold mb-4">Orders for Today - {new Date().toLocaleDateString()}</h2>
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg divide-y divide-gray-200">
              <div className="py-3 px-4">
                <div className="relative max-w-xs mb-4">
                  <label className="sr-only">Search</label>
                  <input
                    type="text"
                    className="py-2 px-3 ps-9 block w-full border-2 border-gray-500 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Search for food"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg
                      className="size-4 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                {currentOrders.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3 px-4 pe-0">
                          <div className="flex items-center h-5">
                            <input
                              id="hs-table-pagination-checkbox-all"
                              type="checkbox"
                              className="border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="hs-table-pagination-checkbox-all" className="sr-only">Checkbox</label>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Sr. No</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Order ID</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Ordered Time</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Ordered Item</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentOrders.map((order, index) => (
                        <tr key={order._id}>
                          <td className="py-3 ps-4">
                            <div className="flex items-center h-5">
                              <input
                                id={`hs-table-pagination-checkbox-${order._id}`}
                                type="checkbox"
                                className="border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                              />
                              <label htmlFor={`hs-table-pagination-checkbox-${order._id}`} className="sr-only">Checkbox</label>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + indexOfFirstOrder + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.orderId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.orderedTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-lg text-gray-600">No Orders till now</p>
                  </div>
                )}
              </div>
              <div className="py-1 px-4">
                {filteredOrders.length > 0 && (
                  <nav className="flex items-center space-x-1" aria-label="Pagination">
                    <button
                      type="button"
                      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                      className="p-2.5 min-w-[40px] inline-flex justify-center items-center text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                      aria-label="Previous"
                      disabled={currentPage === 1}
                    >
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </button>
                    {[...Array(Math.ceil(filteredOrders.length / ordersPerPage)).keys()].map(number => (
                      <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full ${currentPage === number + 1 ? 'bg-gray-100' : ''}`}
                      >
                        {number + 1}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => currentPage < Math.ceil(filteredOrders.length / ordersPerPage) && paginate(currentPage + 1)}
                      className="p-2.5 min-w-[40px] inline-flex justify-center items-center text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                      aria-label="Next"
                      disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
                    >
                      <span aria-hidden="true">»</span>
                      <span className="sr-only">Next</span>
                    </button>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersToday;
