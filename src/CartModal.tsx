import React, { useState } from 'react'; // Added useState

// Define MenuItemProps and CartItem interfaces (can be moved to a shared types file later)
interface MenuItemProps {
  id?: string;
  name: string;
  price: string;
  description?: string;
  image?: string;
  ingredients?: string;
  allergens?: string[];
}

interface CartItem {
  item: MenuItemProps;
  quantity: number;
}

interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemName: string, newQuantity: number) => void;
  onRemoveItem: (itemName: string) => void;
  onPlaceOrder: (paymentDetails: PaymentDetails) => void; // Modified to accept paymentDetails
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State for payment form visibility
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  if (!isOpen) return null;

  const handlePaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrderClick = () => {
    setShowPaymentForm(true); // Show payment form
  };

  const handlePayNowClick = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    // Basic validation (can be expanded)
    if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      alert('Per favore, compila tutti i campi della carta.');
      return;
    }
    console.log('Payment Details:', paymentDetails);
    onPlaceOrder(paymentDetails); // Pass payment details
    setShowPaymentForm(false); // Hide payment form after "paying"
    setPaymentDetails({ cardNumber: '', expiryDate: '', cvv: '' }); // Reset form
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => {
      const priceNumber = parseFloat(cartItem.item.price.replace('€', '').replace(',', '.'));
      return total + priceNumber * cartItem.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-11/12 md:w-full max-w-lg md:max-w-2xl max-h-[90vh] flex flex-col transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalFadeInScale">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-red-700">{showPaymentForm ? 'Dettagli Pagamento' : 'Il Tuo Ordine'}</h2>
          <button onClick={() => {
            if (showPaymentForm) {
              setShowPaymentForm(false); // Go back to cart view
            } else {
              onClose(); // Close modal
            }
          }} className="text-gray-500 hover:text-gray-800 text-3xl md:text-4xl leading-none">&times;</button>
        </div>

        {!showPaymentForm ? (
          <>
            {cartItems.length === 0 ? (
              <p className="text-gray-700 text-center py-8 text-lg">Il tuo carrello è vuoto.</p>
            ) : (
              <div className="overflow-y-auto flex-grow mb-4 pr-2 space-y-4">
                {cartItems.map((cartItem, index) => (
                  <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4">
                    <div className="mb-2 sm:mb-0">
                      <h4 className="font-semibold text-lg text-gray-800">{cartItem.item.name}</h4>
                      <p className="text-md text-gray-700">{cartItem.item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.name, cartItem.quantity - 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-md disabled:opacity-50"
                        disabled={cartItem.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={cartItem.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          if (!isNaN(newQuantity)) {
                            // Clamp value between 1 and 10
                            const clampedQuantity = Math.max(1, Math.min(10, newQuantity));
                            onUpdateQuantity(cartItem.item.name, clampedQuantity);
                          }
                        }}
                        onBlur={(e) => { // Handle cases where input might be empty or invalid on blur
                          const newQuantity = parseInt(e.target.value, 10);
                          if (isNaN(newQuantity) || newQuantity < 1) {
                            onUpdateQuantity(cartItem.item.name, 1); // Reset to 1 if invalid
                          } else if (newQuantity > 10) {
                            onUpdateQuantity(cartItem.item.name, 10); // Reset to 10 if too high
                          }
                        }}
                        min="1"
                        max="10"
                        className="px-2 py-1 border border-gray-300 rounded-md w-16 text-center focus:outline-none focus:ring-1 focus:ring-red-500"
                      />
                      <button
                        onClick={() => onUpdateQuantity(cartItem.item.name, cartItem.quantity + 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-md disabled:opacity-50"
                        disabled={cartItem.quantity >= 10}
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(cartItem.item.name)}
                        className="ml-2 sm:ml-4 text-red-500 hover:text-red-700 font-semibold text-sm"
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cartItems.length > 0 && (
              <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800">Totale:</h3>
                  <p className="text-xl md:text-2xl font-bold text-amber-600">€{calculateTotalPrice()}</p>
                </div>
                <button
                  onClick={handleConfirmOrderClick} // Changed to show payment form
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
                >
                  Conferma Ordine e Paga
                </button>
              </div>
            )}
            <button
              onClick={onClose}
              className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {cartItems.length > 0 ? 'Continua lo Shopping' : 'Chiudi'}
            </button>
          </>
        ) : (
          // Payment Form
          <form onSubmit={handlePayNowClick} className="space-y-4 flex-grow">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Numero Carta</label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                placeholder="0000 0000 0000 0000"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Scadenza (MM/AA)</label>
                <input
                  type="text"
                  name="expiryDate"
                  id="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handlePaymentInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="MM/AA"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  id="cvv"
                  value={paymentDetails.cvv}
                  onChange={handlePaymentInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <div className="border-t pt-6 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Totale da Pagare:</h3>
                <p className="text-lg font-semibold text-amber-600">€{calculateTotalPrice()}</p>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
              >
                Paga Ora €{calculateTotalPrice()}
              </button>
              <button
                type="button"
                onClick={() => setShowPaymentForm(false)}
                className="mt-2 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Annulla Pagamento
              </button>
            </div>
          </form>
        )}
      </div>
      {/* Basic CSS for modal animation - consider moving to a CSS file */}
      <style>
        {`
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-modalFadeInScale {
            animation: fadeInScale 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default CartModal;
