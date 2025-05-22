import React, { useState } from 'react';
import BookingModal from './BookingModal'; // Importa il componente modale

// Importa le immagini che utilizzerai
// Assicurati che i percorsi siano corretti e che le immagini siano presenti in src/assets/immagini/
import heroBgImage from './assets/immagini/pizza-gourmet.jpg';
// import pizzeSectionImage from './assets/immagini/impostare-lo-sfondo-della-pizza-vari-tipi-di-italiana-fast-food-top-view-265118910.webp';
// import sfiziSectionImage from './assets/immagini/in-forma-perfetta-con-la-pizza.jpg';
// import insalateSectionImage from './assets/immagini/insalate.jpg'; // This is the general section image
// import dolciSectionImage from './assets/immagini/dolci.jpg'; // This is the general section image
// import bevandeSectionImage from './assets/immagini/bevande.jpg'; // This is the general section image

import margheritaImage from './assets/immagini/margherita.jpg';
import marinaraImage from './assets/immagini/marinara.jpg';
import diavolaImage from './assets/immagini/diavola gialla.jpg';
import capricciosaImage from './assets/immagini/capricciosa.jpg';
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

// Sfizi images
import bruschetteImage from './assets/immagini/bruschette.jpg';
import suppliImage from './assets/immagini/supli.webp';
import fioriDiZuccaSfizioImage from './assets/immagini/pizza-fiori-di-zucca.jpg'; // Re-using pizza image for sfizio
import patatineFritteImage from './assets/immagini/patatine fritte.jpg';

// Insalate images
import capreseImage from './assets/immagini/caprese.jpg';
import insalataMistaImage from './assets/immagini/insalata mista.jpg';
import insalataGrecaImage from './assets/immagini/insalata greca.jpg';

// Dolci images
import tiramisuImage from './assets/immagini/tiramisu.jpg';
import pannaCottaImage from './assets/immagini/panna cotta.jpg';
import cannoloImage from './assets/immagini/cannolo-siciliano-senza-glutine_2_795x600.jpeg';

// Bevande images
import acquaImage from './assets/immagini/acqua.jpg';
import cocaImage from './assets/immagini/coca.jpg';
import birraImage from './assets/immagini/birra.jpg';
import vinoRossoImage from './assets/immagini/vino rosso.jpg';

const menuData = {
  pizze: [
    { name: "Margherita", ingredients: "Pomodoro, mozzarella, basilico", price: "€7.00", image: margheritaImage, allergens: ["glutine", "lattosio"] },
    { name: "Marinara", ingredients: "Pomodoro, aglio, origano", price: "€6.00", image: marinaraImage, allergens: ["glutine"] },
    { name: "Diavola", ingredients: "Pomodoro, mozzarella, salame piccante", price: "€8.50", image: diavolaImage, allergens: ["glutine", "lattosio"] },
    { name: "Capricciosa", ingredients: "Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi, olive", price: "€9.50", image: capricciosaImage, allergens: ["glutine", "lattosio"] },
    { name: "Bufala", ingredients: "Pomodoro, mozzarella di bufala, basilico", price: "€9.00", image: margheritaImage, allergens: ["glutine", "lattosio"] }, // Using Margherita for Bufala as placeholder
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
  ],
  sfizi: [
    { name: "Bruschette al pomodoro", ingredients: "Pane tostato, pomodoro fresco, aglio, basilico, olio EVO", price: "€5.00", image: bruschetteImage, allergens: ["glutine"] },
    { name: "Supplì", ingredients: "Riso al ragù, mozzarella, panatura croccante (2 pezzi)", price: "€4.00", image: suppliImage, allergens: ["glutine", "lattosio", "uova"] },
    { name: "Fiori di zucca", ingredients: "Fiori di zucca pastellati e fritti, ripieni di mozzarella e alici (3 pezzi)", price: "€6.00", image: fioriDiZuccaSfizioImage, allergens: ["glutine", "lattosio", "pesce", "uova"] },
    { name: "Patatine fritte", ingredients: "Patate fresche tagliate a mano e fritte", price: "€4.50", image: patatineFritteImage, allergens: [] },
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
    { name: "Birra Artigianale Locale", ingredients: "Bionda / Rossa / IPA (0.33L)", price: "€5.00", image: birraImage, allergens: ["glutine"] },
    { name: "Vino Rosso/Bianco della Casa", ingredients: "Calice / Bottiglia", price: "€4.00 / €15.00", image: vinoRossoImage, allergens: ["solfiti"] },
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

const MenuItemCard: React.FC<MenuItemProps> = ({ id, name, price, ingredients, image }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
    {image && <img src={image} alt={name} className="w-full h-48 object-cover"/>}
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-red-700">{name}</h3>
        {id && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">{id}</span>}
      </div>
      <p className="text-2xl font-bold text-amber-500 mb-3">{price}</p>
      <p className="text-gray-600 text-sm">{ingredients}</p>
    </div>
  </div>
);

interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
  id: string;
  bgColor?: string;
  titleColor?: string;
  sectionImage?: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items, id, bgColor = 'bg-gray-50', titleColor = 'text-red-700', sectionImage }) => (
  <section id={id} className={`py-16 ${bgColor}`}>
    <div className="container mx-auto px-4">
      <h2 className={`text-4xl font-bold text-center mb-4 ${titleColor}`}>{title}</h2>
      {sectionImage && <img src={sectionImage} alt={title} className="w-full h-48 object-cover rounded-lg mb-12 shadow-md"/>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => <MenuItemCard key={item.name} {...item} />)}
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen); // Function to toggle mobile menu

  const navLinks = [
    { href: '#pizze', label: 'Pizze' },
    { href: '#sfizi', label: 'Sfizi' },
    { href: '#insalate', label: 'Insalate' },
    { href: '#dolci', label: 'Dolci' },
    { href: '#bevande', label: 'Bevande' },
    { href: '#allergeni', label: 'Allergeni' },
    { href: '#contatti', label: 'Dove Siamo' },
  ];

  return (
    <div className="font-serif mx-auto max-w-screen-xl">
      {/* Navbar */}
      <nav className="bg-red-700 shadow-lg sticky top-0 z-50"> {/* Changed bg-white to bg-red-700 */}
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#" className="text-3xl font-bold text-white">Pizzeria Astrale</a> {/* Changed text-red-700 to text-white */}
          <div className="hidden md:flex space-x-4">
            {navLinks.map(link => (
              <a key={link.label} href={link.href} className="text-white hover:text-amber-300 transition-colors">{link.label}</a>
            ))}
            <button onClick={openBookingModal} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-md transition-colors">Prenota</button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white focus:outline-none"> {/* Changed text-gray-700 to text-white and added onClick */}
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
        className="relative min-h-[75vh] bg-cover bg-center flex flex-col justify-center items-center text-white" // Changed min-h-screen to min-h-[75vh]
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroBgImage})` }}
      >
        <div className="text-center p-4" style={{ textShadow: '0 0 5px rgba(0,0,0,0.7)' }}> 
          <h1 className="text-6xl font-bold mb-4">Pizzeria Astrale</h1>
          <p className="text-2xl mb-8 italic">"C'è solo un modo per fare la pizza, ed è farla bene."</p>
          <button onClick={openBookingModal} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors">
            Prenota Ora
          </button>
        </div>
      </header>

      {/* Menu Quick Links */}
      <section className="bg-red-700 py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Il Menù Astrale</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {navLinks.slice(0, -2).map(link => ( // Esclude "Dove Siamo" e "Allergeni" se si vuole un set diverso qui
                 <a key={link.label} href={link.href} className="bg-white hover:bg-gray-100 text-red-700 font-semibold px-6 py-3 rounded-md shadow-md transition-colors text-center">
                    {link.label}
                 </a>
            ))}
          </div>
        </div>
      </section>
      
      <MenuSection title="Pizze" items={menuData.pizze} id="pizze" />
      <MenuSection title="Sfizi" items={menuData.sfizi} id="sfizi" bgColor="bg-gray-100" />
      <MenuSection title="Insalate" items={menuData.insalate} id="insalate" />
      <MenuSection title="Dolci" items={menuData.dolci} id="dolci" bgColor="bg-gray-100" />
      <MenuSection title="Bevande" items={menuData.bevande} id="bevande" />

      {/* Allergeni Section */}
      <section id="allergeni" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-red-700 mb-8">Informazioni Allergeni</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg"> 
            <p className="text-gray-700 mb-4">
              Si premette che la nostra attività elabora e somministra, utilizzando un’ unico laboratorio e un’unica dispensa, 
              prodotti di gastronomia di qualsiasi specie, non destinati ad alimenti particolari per popolazioni allergiche od intolleranti. 
              Per cui la possibilità di contaminazione diretta o indiretta è possibile in ogni piatto/prodotto per qualsiasi allergene presente in azienda.
            </p>
            <h3 className="text-xl font-semibold text-red-600 mt-6">Lista Allergeni</h3>
            <p className="text-gray-600 text-sm">(Per informazioni dettagliate sugli allergeni specifici presenti nei piatti, si prega di chiedere al personale)</p>
          </div>
        </div>
      </section>

      {/* Contatti Section */}
      <section id="contatti" className="py-20 bg-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Dove Siamo?</h2>
          <p className="text-sm mb-2">Milano Via Plinio 6</p>
          {/* Google Maps Embed */}
          <div className="mt-6 mb-8">
            <iframe
              src="https://maps.google.com/maps?q=Milano%20Via%20Plinio%206&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border:0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mappa Pizzeria Astrale"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Orari di Apertura:</h3>
            <p>Lun-Ven: 12.30 – 14.40 / 19.30 – 23.30</p>
            <p>Sab-Dom: 12.30 – 15.00 / 19.30 – 23.45</p>
          </div>
          <p className="text-xl mb-8">Telefono: <a href="tel:022047117" className="hover:underline">02 2047117</a></p>
          <button onClick={openBookingModal} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-lg text-xl transition-colors">
            Prenota il Tuo Tavolo!
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-xs">Pizzalovers SRL Via corso buenos aires, 26 | 20135 Milano MI</p>
          <p className="mb-2 text-xs">
            <a href="#" className="hover:text-white">Privacy & Cookie Policy</a> – Made with love by Sinapps
          </p>
          <div className="flex justify-center space-x-4 mb-3">
            <a href="#" className="hover:text-white text-xs">Instagram</a>
            <a href="#" className="hover:text-white text-xs">Facebook</a>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} Pizzeria Astrale. Tutti i diritti riservati.</p>
        </div>
      </footer>

      <BookingModal isOpen={isBookingModalOpen} onClose={closeBookingModal} />
    </div>
  );
}

export default App;
