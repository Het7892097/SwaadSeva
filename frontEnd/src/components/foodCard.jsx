import React from 'react';
const altImageLink="https://media.istockphoto.com/id/185285647/photo/lemonade.jpg?s=612x612&w=0&k=20&c=ZrOxo14Q-6-RI2Rzz8eWtbvr6x14upffYjPx7YRgnKY=";

const FoodCard = ({item}) => {
    return (
      <div className="card card-compact bg-base-100 w-72 shadow-md p-3">
      <figure>
        <img src={item.imgLink? item.imgLink:altImageLink} alt="noImageFound" className="h-40 w-full object-cover" />
      </figure>
      <div className="card-body p-2">
        <h2 className="card-title text-lg">{item.name}</h2>
        <p className="text-sm">{item.desc}</p>
        <p className="text-sm font-bold">Price: ₹{item.price}</p>
    
        <div className="flex justify-between items-center mt-2">
          {/* Vegetarian Indicator */}
          <button className={`btn btn-sm ${item.veg ? 'btn-success' : 'btn-error'}`}>
            {item.veg ? 'Vegetarian' : 'Non-Veg'}
          </button>
    
          {/* Availability Indicator */}
          <button className={`btn btn-sm ${item.isAvailable ? 'btn-primary' : 'btn-secondary'}`}>
            {item.isAvailable ? 'Available' : 'Out of Stock'}
          </button>
        </div>
    
        {/* <div className="card-actions justify-end mt-2">
          <button className="btn btn-primary btn-sm">Order Now</button>
        </div> */}
      </div>
    </div>
    
    );
};

export default FoodCard;
