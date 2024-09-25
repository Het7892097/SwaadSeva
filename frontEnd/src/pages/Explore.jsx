import React, { useState } from 'react';
import FoodCard from '../components/foodCard';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const foodItems = {
    1: [
        { 
            name: "Diet Coke", 
            price: 50, 
            desc: "Diet version of Coke", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/coke.jpg" 
        },
        { 
            name: "Lemonade", 
            price: 40, 
            desc: "Refreshing lemonade", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/lemonade.jpg" 
        },
        { 
            name: "Spring Rolls", 
            price: 100, 
            desc: "Crispy spring rolls", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/springrolls.jpg" 
        },
        { 
            name: "Garlic Bread", 
            price: 80, 
            desc: "Toasted garlic bread", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/garlicbread.jpg" 
        },
        { 
            name: "Burger", 
            price: 120, 
            desc: "Juicy beef burger", 
            veg: false, 
            isAvailable: true, 
            imgLink: "https://example.com/images/burger.jpg" 
        },
        { 
            name: "Fries", 
            price: 50, 
            desc: "Crispy French fries", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/fries.jpg" 
        },
        { 
            name: "Butter Chicken", 
            price: 250, 
            desc: "Delicious butter chicken", 
            veg: false, 
            isAvailable: true, 
            imgLink: "https://example.com/images/butterchicken.jpg" 
        },
        { 
            name: "Paneer Tikka", 
            price: 220, 
            desc: "Grilled paneer cubes", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/paneertikka.jpg" 
        }
    ],
    5: [
        { 
            name: "Dosa", 
            price: 100, 
            desc: "Crispy rice pancake", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/dosa.jpg" 
        },
        { 
            name: "Idli", 
            price: 80, 
            desc: "Steamed rice cakes", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/idli.jpg" 
        }
    ],
    6: [
        { 
            name: "Fried Rice", 
            price: 150, 
            desc: "Vegetable fried rice", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/friedrice.jpg" 
        },
        { 
            name: "Chow Mein", 
            price: 130, 
            desc: "Noodles with vegetables", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/chowmein.jpg" 
        }
    ],
    7: [
        { 
            name: "Caesar Salad", 
            price: 120, 
            desc: "Classic Caesar salad", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/caesarsalad.jpg" 
        },
        { 
            name: "Risotto", 
            price: 220, 
            desc: "Creamy Italian rice dish", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/risotto.jpg" 
        }
    ],
    8: [
        { 
            name: "Chocolate Cake", 
            price: 200, 
            desc: "Rich chocolate cake", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/chocolatecake.jpg" 
        },
        { 
            name: "Ice Cream", 
            price: 100, 
            desc: "Creamy vanilla ice cream", 
            veg: true, 
            isAvailable: true, 
            imgLink: "https://example.com/images/icecream.jpg" 
        }
    ]
};

  const categories = {
    1: "Beverages",
    2: "Appetizers",
    3: "Fast Food",
    4: "North Indian",
    5: "South Indian",
    6: "Chinese",
    7: "Continental",
    8: "Dessert",
  };

  // Get filtered items based on selected category and search term
  const filteredItems = selectedCategory && foodItems[selectedCategory]
  ? foodItems[selectedCategory].filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Explore Food</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for food..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Menu */}
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box mb-6">
        {Object.entries(categories).map(([categoryId, categoryName]) => (
          <li key={categoryId}>
            <a
              className={selectedCategory === Number(categoryId) ? 'active' : ''}
              onClick={() => setSelectedCategory(Number(categoryId))}
            >
              {categoryName}
            </a>
          </li>
        ))}
      </ul>

      {/* Food Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.length > 0
          ? filteredItems.map((item, index) => <FoodCard key={index} item={item} />)
          : <p>No items found for the selected category.</p>}
      </div>
    </div>
  );
};

export default Explore;
