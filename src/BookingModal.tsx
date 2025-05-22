import React from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bookingData = {
      name: formData.get('name'),
      email: formData.get('email'), // Added email
      date: formData.get('date'),
      time: formData.get('time'),
      guests: formData.get('guests'),
      notes: formData.get('notes'),
    };
    // Logica di invio della prenotazione (simulata)
    console.log('Dati della prenotazione:', bookingData);
    alert(`Prenotazione confermata per ${bookingData.name}! Una mail di conferma è stata inviata a ${bookingData.email}. (Logica di invio reale da implementare)`);
    onClose(); // Chiudi il modale dopo l'invio
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-700">Prenota il Tuo Tavolo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Chiudi modale"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Nome e Cognome</label>
            <input type="text" id="name" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="mb-4"> {/* Added Email Field */}
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input type="email" id="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="tuamail@esempio.com" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-semibold mb-2">Data</label>
              <input type="date" id="date" name="date" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
            <div>
              <label htmlFor="time" className="block text-gray-700 text-sm font-semibold mb-2">Ora</label>
              <input type="time" id="time" name="time" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="guests" className="block text-gray-700 text-sm font-semibold mb-2">Numero di Persone</label>
            <input type="number" id="guests" name="guests" min="1" max="20" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </div>
          <div className="mb-6">
            <label htmlFor="notes" className="block text-gray-700 text-sm font-semibold mb-2">Note (opzionale)</label>
            <textarea id="notes" name="notes" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-md transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-md transition-colors"
            >
              Conferma Prenotazione
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
