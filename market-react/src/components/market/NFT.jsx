import React from 'react';

export const NFT = ({ token_id, image, price, list_id, name, description }) => {
  return (
    <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="px-4 py-2">
            <h1 className="text-3xl font-bold text-gray-800 uppercase dark:text-white">{ name }</h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{ description }</p>
        </div>

        <img className="object-cover w-full h-48 mt-2" src={ image } alt={token_id}/>

        <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
            <h1 className="text-lg font-bold text-white">$ {price}</h1>
            <button 
              className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase bg-white rounded transition-colors duration-200 transform hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
            >
            Add to cart
            </button>
        </div>
    </div>
  );
}
