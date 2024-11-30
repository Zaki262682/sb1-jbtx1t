import React from 'react';
import { useStore } from '../store/useStore';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-600 mt-2">Start shopping to add items to your cart</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 rounded hover:bg-gray-100"
              >
                <Minus size={20} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <Plus size={20} />
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between text-xl font-semibold">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full mt-4 bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};