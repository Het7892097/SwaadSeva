import React, { useState } from 'react';

const OrdersToday = () => {
  // Sample order data with ordered foods and quantities
  const orders = [
    { orderId: 1, personName: "John Brown", orderedTime: "2024-09-25 12:30", orderedItems: [{ food: "Burger", quantity: 2 }, { food: "Fries", quantity: 1 }] },
    { orderId: 2, personName: "Jim Green", orderedTime: "2024-09-25 12:45", orderedItems: [{ food: "Pizza", quantity: 1 }] },
    { orderId: 3, personName: "Joe Black", orderedTime: "2024-09-25 13:00", orderedItems: [{ food: "Pasta", quantity: 3 }] },
    { orderId: 4, personName: "Edward King", orderedTime: "2024-09-25 13:15", orderedItems: [{ food: "Salad", quantity: 1 }, { food: "Soup", quantity: 2 }] },
    { orderId: 5, personName: "Jim Red", orderedTime: "2024-09-25 13:30", orderedItems: [{ food: "Tacos", quantity: 4 }] },
    { orderId: 6, personName: "Alice Brown", orderedTime: "2024-09-25 13:45", orderedItems: [{ food: "Sushi", quantity: 5 }] },
    { orderId: 7, personName: "Bob Johnson", orderedTime: "2024-09-25 14:00", orderedItems: [{ food: "Steak", quantity: 1 }] },
    { orderId: 8, personName: "Tom Cruise", orderedTime: "2024-09-25 14:15", orderedItems: [{ food: "Sandwich", quantity: 2 }] },
    { orderId: 9, personName: "Jane Smith", orderedTime: "2024-09-25 14:30", orderedItems: [{ food: "Ice Cream", quantity: 3 }] },
    { orderId: 10, personName: "Mark Twain", orderedTime: "2024-09-25 14:45", orderedItems: [{ food: "Cupcakes", quantity: 6 }] },
  ];

  // State for current page and search term
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const ordersPerPage = 8;

  // Filter orders based on search term
  const filteredOrders = orders.filter(order =>
    order.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderedItems.some(item => item.food.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col">
      <h2 className="text-3xl font-semibold mb-4">Orders for Today - {new Date().toLocaleDateString()}</h2>
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200">
            <div className="py-3 px-4">
              <div className="relative max-w-xs mb-4">
                <label className="sr-only border-5 border-black">Search</label>
                <input
                  type="text"
                  className="py-2 px-3 ps-9 block w-full border-2 border-gray-500 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Search for person or food"
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
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Person Name</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Ordered Time</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Ordered List</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentOrders.map((order, index) => (
                    <tr key={order.orderId}>
                      <td className="py-3 ps-4">
                        <div className="flex items-center h-5">
                          <input
                            id={`hs-table-pagination-checkbox-${order.orderId}`}
                            type="checkbox"
                            className="border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={`hs-table-pagination-checkbox-${order.orderId}`} className="sr-only">Checkbox</label>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{index + indexOfFirstOrder + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.orderId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{order.personName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{order.orderedTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {order.orderedItems.map(item => (
                          <div key={item.food}>
                            {item.food} (Qty: {item.quantity})
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="py-1 px-4">
              <nav className="flex items-center space-x-1" aria-label="Pagination">
                <button
                  type="button"
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
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
                    className={`min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none ${currentPage === number + 1 ? 'bg-gray-100' : ''}`}
                  >
                    {number + 1}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => currentPage < Math.ceil(filteredOrders.length / ordersPerPage) && paginate(currentPage + 1)}
                  className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                  aria-label="Next"
                  disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
                >
                  <span aria-hidden="true">»</span>
                  <span className="sr-only">Next</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersToday;
