import React, { useState, useEffect } from 'react';
import BookingModal from './BookingModal';
import CartModal from './CartModal'; // Import the CartModal component
import CookieConsentBanner from './CookieConsentBanner'; // Import the CookieConsentBanner component

// Importa le immagini che utilizzerai
// Assicurati che i percorsi siano corretti e che le immagini siano presenti in src/assets/immagini/
import heroBgImage from './assets/immagini/pizza-gourmet.jpg';

import margheritaImage from './assets/immagini/margherita.jpg';
import marinaraImage from './assets/immagini/marinara.jpg';
import diavolaImage from './assets/immagini/diavola gialla.jpg';
import capricciosaImage from './assets/immagini/capricciosa.jpg';
import bufalaaImage from './assets/immagini/bufalaa.jpg';
import tonnoCipolleImage from './assets/immagini/pizza-tonno-cipolle-800.webp';
import wurstelPatatineImage from './assets/immagini/pizza-wurstel-e-patatine-768x512.jpg';
import fioriZuccaImage from './assets/immagini/pizza-fiori-di-zucca.jpg'; // For pizza
import vegetarianaImage from './assets/immagini/vegetariana.jpg';
import veganaImage from './assets/immagini/vegana.jpg';
import napoliImage from './assets/immagini/napoli.jpg';
import normaImage from './assets/immagini/norma.jpg';
import crudoParmigianoImage from './assets/immagini/crudo san daniele e parmi.jpg';
import amatricianaGiallaImage from './assets/immagini/amatriciana gialla.jpg';
import ndujaImage from "./assets/immagini/'nduja.jpg";
import quattroFormaggiImage from './assets/immagini/1045822.jpg';
import salameVentricinaPlaceholderImage from './assets/immagini/images.jpg'; // Placeholder
import bismarkImage from './assets/immagini/bismark.jpg'; // Added Bismark image import

// Sfizi images
import bruschetteImage from './assets/immagini/bruschette.jpg';
import suppliImage from './assets/immagini/supli.webp';
import fiorDiZuccaaaaaImage from './assets/immagini/fior di zuccaaaaa.jpg';
import patatineFritteImage from './assets/immagini/patatine fritte.jpg';
import pollettiImage from './assets/immagini/polletti-2020-i-009.jpg';

// Insalate images
import capreseImage from './assets/immagini/caprese.jpg';
import insalataMistaImage from './assets/immagini/insalata mista.jpg';
import insalataGrecaImage from './assets/immagini/insalata greca.jpg';

// Dolci images
import tiramisuImage from './assets/immagini/tiramisu.jpg'; // Corrected filename
import pannaCottaImage from './assets/immagini/panna cotta.jpg';
import cannoloImage from './assets/immagini/cannolo-siciliano-senza-glutine_2_795x600.jpeg';

// Bevande images
import acquaImage from './assets/immagini/acqua.jpg';
import cocaImage from './assets/immagini/coca.jpg';
import birraImage from './assets/immagini/birra.jpg';
import vinoRossoImage from './assets/immagini/vino rosso.jpg';
import teAllaPescaImage from './assets/immagini/pesca the.jpg';
import fantaImage from './assets/immagini/fanta.jpeg';

const menuData = {
  pizze: [
    { name: "Margherita", ingredients: "Pomodoro, mozzarella, basilico", price: "€7.00", image: margheritaImage, allergens: ["glutine", "lattosio"] },
    { name: "Marinara", ingredients: "Pomodoro, aglio, origano", price: "€6.00", image: marinaraImage, allergens: ["glutine"] },
    { name: "Diavola", ingredients: "Pomodoro, mozzarella, salame piccante", price: "€8.50", image: diavolaImage, allergens: ["glutine", "lattosio"] },
    { name: "Capricciosa", ingredients: "Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi, olive", price: "€9.50", image: capricciosaImage, allergens: ["glutine", "lattosio"] },
    { name: "Bufala", ingredients: "Pomodoro, mozzarella di bufala, basilico", price: "€9.00", image: bufalaaImage, allergens: ["glutine", "lattosio"] },
    { name: "Quattro formaggi", ingredients: "Mozzarella, gorgonzola, fontina, parmigiano", price: "€9.00", image: quattroFormaggiImage, allergens: ["glutine", "lattosio"] },
    { name: "Tonno e Cipolla", ingredients: "Pomodoro, mozzarella, tonno, cipolla", price: "€8.50", image: tonnoCipolleImage, allergens: ["glutine", "lattosio", "pesce"] },
    { name: "Wurstel e Patatine", ingredients: "Pomodoro, mozzarella, wurstel, patatine fritte", price: "€8.50", image: wurstelPatatineImage, allergens: ["glutine", "lattosio"] },
    { name: "Fiori di Zucca e Alici", ingredients: "Mozzarella, fiori di zucca, alici", price: "€9.00", image: fioriZuccaImage, allergens: ["glutine", "lattosio", "pesce"] },
    { name: "Vegetariana", ingredients: "Pomodoro, mozzarella, verdure grigliate miste", price: "€9.00", image: vegetarianaImage, allergens: ["glutine", "lattosio"] },
    { name: "Vegana", ingredients: "Crema di ceci, verdure di stagione, olive taggiasche, pomodori secchi", price: "€10.00", image: veganaImage, allergens: ["glutine"] },
    { name: "Napoli", ingredients: "Pomodoro, mozzarella, acciughe, capperi, origano", price: "€8.00", image: napoliImage, allergens: ["glutine", "lattosio", "pesce"] },
    { name: "Norma", ingredients: "Pomodoro, melanzane fritte, ricotta salata, basilico", price: "€9.50", image: normaImage, allergens: ["glutine", "lattosio"] },
    { name: "Crudo San Daniele e Parmigiano", ingredients: "Mozzarella, prosciutto crudo San Daniele, scaglie di Parmigiano Reggiano", price: "€11.00", image: crudoParmigianoImage, allergens: ["glutine", "lattosio"] },
    { name: "Amatriciana Gialla", ingredients: "Mozzarella, guanciale, pomodorini gialli, pecorino romano", price: "€10.50", image: amatricianaGiallaImage, allergens: ["glutine", "lattosio"] },
    { name: "Salame ventricina e friggitelli", ingredients: "Mozzarella, salame ventricina, friggitelli", price: "€10.00", image: salameVentricinaPlaceholderImage, allergens: ["glutine", "lattosio"] }, // Placeholder
    { name: "'Nduja e Stracciatella", ingredients: "Base bianca, 'nduja, stracciatella, basilico", price: "€11.00", image: ndujaImage, allergens: ["glutine", "lattosio"] },
    { name: "Bismark", ingredients: "Pomodoro, mozzarella, uova, Prosciutto Cotto Stella", price: "€7.00", image: bismarkImage, allergens: ["uova", "glutine", "lattosio"] },
  ],
  sfizi: [
    { name: "Bruschette al pomodoro", ingredients: "Pane tostato, pomodoro fresco, aglio, basilico, olio EVO", price: "€5.00", image: bruschetteImage, allergens: ["glutine"] },
    { name: "Supplì", ingredients: "Riso al ragù, mozzarella, panatura croccante (2 pezzi)", price: "€4.00", image: suppliImage, allergens: ["glutine", "lattosio", "uova"] },
    { name: "Fiori di zucca", ingredients: "Fiori di zucca pastellati e fritti, ripieni di mozzarella e alici (3 pezzi)", price: "€6.00", image: fiorDiZuccaaaaaImage, allergens: ["glutine", "lattosio", "pesce", "uova"] },
    { name: "Patatine fritte", ingredients: "Patate fresche tagliate a mano e fritte", price: "€4.50", image: patatineFritteImage, allergens: [] },
    { name: "Poletti", ingredients: "farina, uova, pollo", price: "€6.00", image: pollettiImage, allergens: ["glutine", "uova"] },
  ],
  insalate: [
    { name: "Insalata Caprese", ingredients: "Pomodoro, mozzarella di bufala, basilico, origano, olio EVO", price: "€8.00", image: capreseImage, allergens: ["lattosio"] },
    { name: "Insalata Mista", ingredients: "Lattuga, rucola, carote, pomodorini, mais, olive", price: "€7.00", image: insalataMistaImage, allergens: [] },
    { name: "Insalata Greca", ingredients: "Pomodori, cetrioli, cipolla rossa, olive Kalamata, feta, origano, olio EVO", price: "€9.00", image: insalataGrecaImage, allergens: ["lattosio"] },
  ],
  dolci: [
    { name: "Tiramisù", ingredients: "Savoiardi, caffè, mascarpone, cacao", price: "€6.00", image: tiramisuImage, allergens: ["glutine", "lattosio", "uova"] },
    { name: "Panna Cotta", ingredients: "Panna fresca, zucchero, vaniglia, coulis di frutti di bosco", price: "€5.50", image: pannaCottaImage, allergens: ["lattosio"] },
    { name: "Cannolo Siciliano", ingredients: "Cialda croccante, ricotta dolce, gocce di cioccolato, canditi", price: "€6.50", image: cannoloImage, allergens: ["glutine", "lattosio", "frutta a guscio"] },
  ],
  bevande: [
    { name: "Acqua Naturale/Frizzante", ingredients: "0.75L", price: "€2.50", image: acquaImage, allergens: [] },
    { name: "Coca Cola / Coca Cola Zero", ingredients: "Lattina 33cl", price: "€3.00", image: cocaImage, allergens: [] },
    { name: "Te alla Pesca", ingredients: "Tè freddo al gusto pesca", price: "€3.00", image: teAllaPescaImage, allergens: [] },
    { name: "Fanta", ingredients: "Aranciata", price: "€3.00", image: fantaImage, allergens: [] },
    { name: "Birra Artigianale Locale", ingredients: "Bionda / Rossa / IPA (0.33L)", price: "€5.00", image: birraImage, allergens: ["glutine"] },
    { name: "Vino Rosso/Bianco della Casa", ingredients: "Calice", price: "€4.00", image: vinoRossoImage, allergens: ["solfiti"] },
  ]
};

interface MenuItemProps {
  id?: string;
  name: string;
  price: string;
  description?: string;
  image?: string;
  ingredients?: string;
  allergens?: string[];
}

// Define CartItem interface
interface CartItem {
  item: MenuItemProps;
  quantity: number;
}

// Define PaymentDetails interface (can be moved to a shared types file)
interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const MenuItemCard: React.FC<MenuItemProps & { onAddToCart: (item: MenuItemProps) => void }> = (props) => {
  const { name, price, ingredients, image, allergens, id, description, onAddToCart } = props;

  const handleAddItemToCart = () => {
    const itemData: MenuItemProps = {
      name,
      price,
      ingredients,
      image,
      allergens,
      ...(id && { id }),
      ...(description && { description }),
    };
    onAddToCart(itemData);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between">
      <div>
        {image && <img src={image} alt={name} className="w-full h-40 sm:h-48 object-cover"/>}
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg sm:text-xl font-semibold text-red-700">{name}</h3>
            {id && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">{id}</span>}
          </div>
          <p className="text-xl sm:text-2xl font-bold text-amber-500 mb-2 sm:mb-3">{price}</p>
          <p className="text-gray-600 text-xs sm:text-sm mb-3">{ingredients}</p>
        </div>
      </div>
      <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-0">
        <button
          onClick={handleAddItemToCart}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm sm:text-base"
        >
          Aggiungi +
        </button>
      </div>
    </div>
  );
};

interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
  id: string;
  bgColor?: string;
  titleColor?: string;
  sectionImage?: string;
  onAddToCart: (item: MenuItemProps) => void; // Added onAddToCart
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, id, bgColor = 'bg-gray-50', titleColor = 'text-red-700', sectionImage, onAddToCart }) => (
  <section id={id} className={`py-8 sm:py-12 md:py-16 ${bgColor}`}>
    <div className="container mx-auto px-4">
      <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-4 ${titleColor}`}>{title}</h2>
      {sectionImage && <img src={sectionImage} alt={title} className="w-full h-36 sm:h-48 object-cover rounded-lg mb-8 sm:mb-12 shadow-md"/>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {items.map(item => <MenuItemCard key={item.name} {...item} onAddToCart={onAddToCart} />)} {/* Passed onAddToCart */}
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // State for cart modal

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const openCartModal = () => setIsCartModalOpen(true);
  const closeCartModal = () => setIsCartModalOpen(false);

  const handleAddToCart = (itemData: MenuItemProps) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.item.name === itemData.name);
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        // Ensure quantity does not exceed 10 when adding to existing item
        if (updatedCart[existingItemIndex].quantity < 10) {
          updatedCart[existingItemIndex].quantity += 1;
        }
        return updatedCart;
      } else {
        return [...prevCart, { item: itemData, quantity: 1 }];
      }
    });
    openCartModal(); // Open cart modal when an item is added
  };

  const handleUpdateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemName);
    } else if (newQuantity <= 10) { // Ensure new quantity does not exceed 10
      setCart(prevCart =>
        prevCart.map(cartItem =>
          cartItem.item.name === itemName ? { ...cartItem, quantity: newQuantity } : cartItem
        )
      );
    }
  };

  const handleRemoveItem = (itemName: string) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.item.name !== itemName));
  };

  const handlePlaceOrder = (paymentDetails: PaymentDetails) => {
    // Placeholder for order placement logic
    console.log('Order placed with payment details:', cart, paymentDetails);
    alert('Ordine inviato e pagamento simulato! (Funzionalità di pagamento non implementata realmente)');
    setCart([]); // Clear cart after placing order
    closeCartModal();
  };

  useEffect(() => {
    if (cart.length > 0) {
      console.log('Cart updated:', cart);
    }
  }, [cart]);

  const navLinks = [
    { href: '#pizze', label: 'Pizze' },
    { href: '#sfizi', label: 'Sfizi' },
    { href: '#insalate', label: 'Insalate' },
    { href: '#dolci', label: 'Dolci' },
    { href: '#bevande', label: 'Bevande' },
    { href: '#allergeni', label: 'Allergeni' },
    { href: '#contatti', label: 'Dove Siamo' },
  ];

  const getTotalCartItems = () => {
    return cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  };

  return (
    <div className="font-serif flex flex-col min-h-screen"> {/* MODIFIED: Removed mx-auto max-w-screen-xl, added flex flex-col min-h-screen */}
      {/* Navbar */}
      <nav className="bg-red-700 shadow-lg sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3 flex justify-between items-center">
          <a href="#" className="text-2xl sm:text-3xl font-bold text-white">Pizzeria Lalos</a>
          <div className="hidden md:flex space-x-2 lg:space-x-4 items-center">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="text-white hover:text-amber-300 transition-colors text-sm lg:text-base">{link.label}</a>
            ))}
            <button onClick={openBookingModal} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors text-sm">Prenota</button>
            {/* Cart Icon/Button */}
            <button onClick={openCartModal} className="relative text-amber-400 hover:text-amber-300 transition-colors p-1.5 sm:p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {getTotalCartItems() > 0 && (
                <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalCartItems()}
                </span>
              )}
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             {/* Cart Icon/Button for Mobile */}
            <button onClick={openCartModal} className="relative text-amber-400 hover:text-amber-300 transition-colors p-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {getTotalCartItems() > 0 && (
                <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {getTotalCartItems()}
                </span>
              )}
            </button>
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu Links */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-red-600 py-2">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="block px-6 py-2 text-white hover:bg-red-500 transition-colors" onClick={toggleMobileMenu}>{link.label}</a>
            ))}
            <button onClick={() => { openBookingModal(); toggleMobileMenu(); }} className="block w-full text-left mt-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors">Prenota</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header 
        className="relative min-h-[60vh] sm:min-h-[75vh] bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBgImage})` }}
      >
        <div className="text-center px-4 py-6" style={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}> 
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">Benvenuti alla Pizzeria Lalos</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 italic">"C'è solo un modo per fare la pizza, ed è farla bene."</p>
          <button onClick={openBookingModal} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-lg sm:text-xl transition-colors">
            Prenota Ora
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full"> {/* ADDED: flex-grow w-full */}
        {/* Menu Quick Links */}
        <section className="bg-red-700 py-4 sm:py-6">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4 sm:mb-6">Il Menù Lalos</h2>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {navLinks.slice(0, -2).map(link => (
                  <a key={link.label} href={link.href} className="bg-white hover:bg-gray-100 text-red-700 font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-md shadow-md transition-colors text-center text-xs sm:text-sm">
                      {link.label}
                  </a>
              ))}
            </div>
          </div>
        </section>
        
        <MenuSection title="Pizze" items={menuData.pizze} id="pizze" onAddToCart={handleAddToCart} />
        <MenuSection title="Sfizi" items={menuData.sfizi} id="sfizi" bgColor="bg-gray-100" onAddToCart={handleAddToCart} />
        <MenuSection title="Insalate" items={menuData.insalate} id="insalate" onAddToCart={handleAddToCart} />
        <MenuSection title="Dolci" items={menuData.dolci} id="dolci" bgColor="bg-gray-100" onAddToCart={handleAddToCart} />
        <MenuSection title="Bevande" items={menuData.bevande} id="bevande" onAddToCart={handleAddToCart} />

        {/* Allergeni Section */}
        <section id="allergeni" className="py-8 sm:py-12 md:py-16 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-4 sm:mb-8">Informazioni Allergeni</h2>
            <div className="max-w-3xl mx-auto bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg"> 
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Si premette che la nostra attività elabora e somministra, utilizzando un' unico laboratorio e un'unica dispensa, 
                prodotti di gastronomia di qualsiasi specie, non destinati ad alimenti particolari per popolazioni allergiche od intolleranti. 
                Per cui la possibilità di contaminazione diretta o indiretta è possibile in ogni piatto/prodotto per qualsiasi allergene presente in azienda.
              </p>
              <h3 className="text-lg sm:text-xl font-semibold text-red-600 mt-4 sm:mt-6">Lista Allergeni</h3>
              <p className="text-gray-600 text-xs sm:text-sm">(Per informazioni dettagliate sugli allergeni specifici presenti nei piatti, si prega di chiedere al personale)</p>
            </div>
          </div>
        </section>

        {/* Contatti Section */}
        <section id="contatti" className="py-12 sm:py-16 md:py-20 bg-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Dove Siamo?</h2>
            <p className="text-xs sm:text-sm mb-2">Milano Corso Buenos Aires 28</p>
            {/* Google Maps Embed */}
            <div className="mt-4 sm:mt-6 mb-6 sm:mb-8 flex justify-center">
              <iframe
                src="https://maps.google.com/maps?q=Milano%20Corso%20Buenos%20Aires%2028&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="90%" 
                height="200"
                style={{ border:0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mappa Pizzeria Lalos"
                className="rounded-lg shadow-lg sm:h-[250px] md:w-[80%]"
              ></iframe>
            </div>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">Orari di Apertura:</h3>
              <p className="text-sm sm:text-base">Lun-Ven: 12.30 – 14.40 / 19.30 – 23.30</p>
              <p className="text-sm sm:text-base">Sab-Dom: 12.30 – 15.00 / 19.30 – 23.45</p>
            </div>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8">Telefono: <a href="tel:0265457859" className="hover:underline">02 65457859</a></p>
            <button onClick={openBookingModal} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-lg text-lg sm:text-xl transition-colors">
              Prenota il Tuo Tavolo!
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-xs sm:text-sm w-full">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">
            <a href="#" className="hover:text-white">Privacy & Cookie Policy</a>
          </p>
          <div className="flex justify-center space-x-4 mb-3">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Facebook</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Pizzeria Lalos. Tutti i diritti riservati.</p>
        </div>
      </footer>

      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={closeCartModal}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onPlaceOrder={handlePlaceOrder}
      />
      <CookieConsentBanner />
    </div>
  );
}

export default App;
