import React, { useState } from 'react';
import './Menu.css';
import { BsAlignStart } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const aLaCarteMenu = [
  {
    section: 'Appetizers',
    title: 'Appetizers',
    items: [
      {
        name: 'Olive caserecce',
        description:
          'Sicilian olives, marinated in garlic, fresh chillies, parsley & extra virgin olive oil.',
        price: '£6.00',
      },
      {
        name: 'Bruschetta ai pomodorini',
        description:
          'Super sweet, fresh ripe Neapolitan cherry tomatoes, garlic, extra virgin olive oil, oregano & fresh basil on a slice of home-made char grilled bread.',
        price: '£7.50',
      },
      {
        name: 'Crostino al prosciutto',
        description: 'Pizza bread with mozzarella, ham & garlic.',
        price: '£9.50',
      },
      {
        name: 'Garlic bread',
        description:
          'Pizza bread with tomato, garlic & extra virgin olive oil.',
        price: '£9.50',
      },
      {
        name: 'Zucchine e melanzane fritte',
        description:
          'Crispy deep fried organic courgettes & aubergine batons served with tartar sauce.',
        price: '£10.50',
      },
      {
        name: 'Polpette della nonna',
        description:
          'Traditional beef meatballs in home-made tomato sauce served with Parmesan cheese & fresh basil.',
        price: '£11.00',
      },
    ],
  },
  {
    section: 'Starters',
    title: 'Starters',
    items: [
      {
        name: 'Melanzane alla Parmigiana',
        description:
          'Oven baked aubergines with tomato, Parmesan, mozzarella & basil.',
        price: '£13',
      },
      {
        name: 'Frittura di Calamari',
        description:
          'Deep fried baby squid served with home-made tartar sauce.',
        price: '£12',
      },
      {
        name: 'Caprese di Bufala',
        description:
          'Fresh mozzarella di buffalo served with sliced tomatoes, fresh basil leaves and dressed with extra virgin olive oil.',
        price: '£11.50',
      },
      {
        name: 'Antipasto Pagliaccio',
        description:
          'Parma ham, fresh “Mozzarella di Bufala”, a selection of salami, Parmigiano cheese, olives, served with “bruschetta” bread & rocket salad.',
        price: '£22',
      },
      {
        name: 'Zuppa di Cozze',
        description:
          'Fresh mussels cooked with extra virgin olive oil, garlic, parsley and a touch of tomato sauce.',
        price: '£12',
      },
      {
        name: 'Gamberoni allo Spumante',
        description:
          'Pan fried prawns cooked with fresh garlic, extra virgin olive oil & a touch of Prosecco.',
        price: '£16',
      },
      {
        name: 'Burrata e Prosciutto di Parma',
        description:
          'Fresh burrata from Campania topped with a home-made pesto sauce, fresh rocket & prosciutto di Parma.',
        price: '£14',
      },
    ],
  },
  {
    section: 'Vitello',
    title: 'Vitello',
    items: [
      {
        name: 'Vitello al Gorgonzola',
        description:
          'Pan fried veal escalope, cooked with Greco di Tufo white wine, finished with a delicious gorgonzola sauce.',
        price: '£23.50',
      },
      {
        name: 'Scaloppina ai Funghi',
        description:
          'Pan fried veal escalope, cooked in a porcini sauce with a touch of demi-glace, served with roast potatoes & seasonal vegetables.',
        price: '£23.50',
      },
      {
        name: 'Schiacciata Milanese',
        description:
          'Dutch topside of veal coated in breadcrumbs, pan-fried, served with spaghetti Napoli.',
        price: '£23.50',
      },
    ],
  },
  {
    section: 'Bistecca',
    title: 'Bistecca',
    items: [
      {
        name: 'Tagliata di Manzo',
        description:
          'Char grilled rib eye steak, sliced into strips served on a bed of wild rocket salad topped with Parmesan shavings.',
        price: '£28.50',
      },
      {
        name: 'Rib Eye Steak',
        description:
          'Char grilled rib eye steak served with seasonal vegetables & roast potatoes.',
        price: '£28.50',
      },
    ],
  },
  {
    section: 'Pesce',
    title: 'Pesce',
    items: [
      {
        name: 'Salmone Grigliato',
        description:
          'Fresh salmon marinated with mixed herbs, chargrilled, served with mixed salad.',
        price: '£21',
      },
      {
        name: 'Spigola alla Griglia',
        description:
          'Whole grilled fresh sea bass from Billingsgate fish market, served with potatoes & mixed salad.',
        price: '£21',
      },
      { name: 'Chips', description: 'Crispy chips.', price: '£5' },
    ],
  },
];

const setMenu25 = [
  {
    title: 'Appetizers (To Share on the Table)',
    items: [
      {
        name: 'Garlic Pizza Bread',
        description:
          'Pizza bread with tomato, garlic, and extra virgin olive oil',
      },
      {
        name: 'Olive Caserecce',
        description:
          'Sicilian olives, marinated in garlic, chillies, parsley, and olive oil',
      },
    ],
  },
  {
    title: 'Starters (To Share on the Table)',
    items: [
      {
        name: 'Funghi Trifolati',
        description:
          'Sautéed mushrooms with garlic, white wine, and parsley served with fresh rocket salad.',
      },
      {
        name: 'Caprese',
        description:
          'Tomato, Mozzarella with fresh mixed salad, extra virgin olive oil and fresh basil.',
      },
    ],
  },
  {
    title: 'Main Courses (THE CHOICE OF ONE)',
    items: [
      {
        name: 'Penne Sophia Loren',
        description:
          'Penne pasta with Italian Pancetta, artichoke hearts, Parmesan cheese, cream, parsley and a touch of tomato.',
      },
      {
        name: 'Lasagna Classica',
        description: 'Oven baked meat lasagna with tomato and bechamel sauce.',
      },
      {
        name: 'Pollo alla Milanese',
        description:
          'Bread crumbed and pan-fried chicken breast served with salad.',
      },
    ],
  },
  {
    title: 'Desserts (THE CHOICE OF ONE)',
    items: [
      { name: 'Selection of Italian Ice Cream' },
      { name: 'Tiramisu' },
      { name: 'Lemon Sorbet' },
    ],
  },
];

const Menu = () => {
  const [selectedSection, setSelectedSection] = useState(
    aLaCarteMenu[0].section,
  );
  const [isSetMenu, setIsSetMenu] = useState(false); // State to toggle between menus
  const [selectedMenu, setSelectedMenu] = useState('A La Carte'); // Track selected menu

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleMenuToggle = (menuType) => {
    setIsSetMenu(menuType === 'Set Menu');
    setSelectedMenu(menuType); // Update selected menu type
    setSelectedSection(
      menuType === 'Set Menu' ? setMenu25[0].title : aLaCarteMenu[0].section,
    );
  };

  const currentMenu = isSetMenu ? setMenu25 : aLaCarteMenu;
  const currentSection = currentMenu.find(
    (section) => section.title === selectedSection,
  );

  return (
    <div className="menu-page">
      <div className="menu-container">
        <div className="price-options">
          <p>
            <span
              onClick={() => handleMenuToggle('A La Carte')}
              style={{
                cursor: 'pointer',
                fontWeight: selectedMenu === 'A La Carte' ? 'bold' : 'normal',
                color: selectedMenu === 'A La Carte' ? '#b29d79' : '#6a553d', // Highlight color
              }}
            >
              A La Carte Menu
            </span>
          </p>
          <p>
            <span
              onClick={() => handleMenuToggle('Set Menu')}
              style={{
                cursor: 'pointer',
                fontWeight: selectedMenu === 'Set Menu' ? 'bold' : 'normal',
                color: selectedMenu === 'Set Menu' ? '#b29d79' : '#6a553d', // Highlight color
              }}
            >
              Set Menu
            </span>{' '}
            £25
          </p>
        </div>
        <div className="booknow text-left">

        <Link
            to="/bookings"
            className="block text-gray-500 hover:underline"
          >
           Click Here Book Now
          </Link>

        </div>
        <div className="dropdown-container">
          <label className="dropdown-label" htmlFor="menuSectionDropdown">
            Select Menu Section:
          </label>
          
          <select
            id="menuSectionDropdown"
            className="styled-dropdown"
            onChange={handleSectionChange}
            value={selectedSection}
            title="Select a menu section to see the items available."
          >
            {currentMenu.map((section) => (
              <option key={section.title} value={section.title}>
                {section.title}
              </option>
            ))}
          </select>
        </div>

        <div className="menu-section">
          <div className="divider"></div>
          <p className="menu-section-title">{currentSection.title}</p>
          <div className="divider"></div>
          {currentSection.items.map((item) => (
            <div key={item.name} className="menu-item">
              <div className="menu-item-body">
                <p className="menu-item-title">{item.name}</p>
                {item.description && (
                  <p className="menu-item-description">{item.description}</p>
                )}
                {item.price && <p className="menu-price">{item.price}</p>}
              </div>
              <div className="divider"></div> {/* Divider after each item */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
