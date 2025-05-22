import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  const [numGuests, setNumGuests] = useState<number>(1);
  const [guestError, setGuestError] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [timeError, setTimeError] = useState<string>('');

  const handleGuestsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    
    if (isNaN(value)) {
      setNumGuests(1);
      setGuestError('');
    } else if (value > 20) {
      setNumGuests(20);
      setGuestError('Il numero massimo di persone è 20.');
    } else if (value < 1) {
      setNumGuests(1);
      setGuestError('Il numero minimo di persone è 1.');
    } else {
      setNumGuests(value);
      setGuestError('');
    }
  };
  
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBookingTime(value);
    
    // Convert to minutes for easier comparison
    const [hours, minutes] = value.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    
    const openTime = 12 * 60; // 12:00
    const closeTime = 22 * 60 + 30; // 22:30
    
    if (totalMinutes < openTime) {
      setTimeError('L\'orario di prenotazione deve essere dopo le 12:00');
    } else if (totalMinutes > closeTime) {
      setTimeError('L\'orario di prenotazione deve essere prima delle 22:30');
    } else {
      setTimeError('');
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Check for validation errors before proceeding
    if (timeError || guestError) {
      alert('Per favore, correggi gli errori nel modulo prima di inviare la prenotazione.');
      return;
    }
    
    // Validate time again to make sure it's within range
    if (bookingTime) {
      const [hours, minutes] = bookingTime.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      const openTime = 12 * 60; // 12:00
      const closeTime = 22 * 60 + 30; // 22:30
      
      if (totalMinutes < openTime || totalMinutes > closeTime) {
        alert('L\'orario di prenotazione deve essere tra le 12:00 e le 22:30');
        return;
      }
    } else {
      alert('Per favore, seleziona un orario di prenotazione');
      return;
    }
    
    const formData = new FormData(event.currentTarget);
    const bookingData = {
      name: formData.get('name'),
      email: formData.get('email'),
      date: formData.get('date'),
      time: bookingTime,
      guests: numGuests, // Use the state value instead of form data
      notes: formData.get('notes'),
    };
    
    // Logica di invio della prenotazione (simulata)
    console.log('Dati della prenotazione:', bookingData);
    alert(`Prenotazione confermata per ${bookingData.name}! Una mail di conferma è stata inviata a ${bookingData.email}. (Logica di invio reale da implementare)`);
    onClose(); // Chiudi il modale dopo l'invio
  };return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white p-3 sm:p-5 rounded-lg shadow-lg max-w-md w-full transform transition-all my-2 sm:my-0">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl sm:text-2xl font-bold text-red-700">Prenota il Tuo Tavolo</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Chiudi modale"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="text-sm">
          <div className="mb-3">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-1">Nome e Cognome</label>
            <input type="text" id="name" name="name" required className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
            <input type="email" id="email" name="email" required className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500" placeholder="tuamail@esempio.com" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-semibold mb-1">Data</label>
              <input type="date" id="date" name="date" required className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500" />
            </div>            <div>
              <label htmlFor="time" className="block text-gray-700 text-sm font-semibold mb-1">Ora</label>
              <input 
                type="time" 
                id="time" 
                name="time" 
                min="12:00" 
                max="22:30" 
                value={bookingTime}
                onChange={handleTimeChange}
                required 
                className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500" 
              />
              {timeError ? (
                <p className="text-xs text-red-500 mt-0.5">{timeError}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-0.5">12:00 - 22:30</p>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="guests" className="block text-gray-700 text-sm font-semibold mb-1">Numero di Persone (max. 20)</label>
            <input 
              type="number" 
              id="guests" 
              name="guests" 
              min="1" 
              max="20" 
              value={numGuests} 
              onChange={handleGuestsChange} 
              required 
              className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500" 
            />
            {guestError && <p className="text-xs text-red-500 mt-0.5">{guestError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="block text-gray-700 text-sm font-semibold mb-1">Note (opzionale)</label>
            <textarea id="notes" name="notes" rows={2} className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-1.5 px-4 rounded-md transition-colors text-sm"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-1.5 px-4 rounded-md transition-colors text-sm"
            >
              Prenota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
