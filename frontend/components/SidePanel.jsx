import React, { useState } from 'react';
import { ListGroup, Collapse, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/SidePanel.css';

const SidePanel = ({ onCategorySelect }) => {
  const [openHomeopathy, setOpenHomeopathy] = useState(true);
  const [openAyurveda, setOpenAyurveda] = useState(true);
  const [openBeautyMisc, setOpenBeautyMisc] = useState(true); // State for Beauty & MISC section
  const navigate = useNavigate();

  const handleCategoryClick = (category, subcategory) => {
    onCategorySelect(category, subcategory);
    console.log('Category:', category, 'Subcategory:', subcategory);
    navigate(`/category/${encodeURIComponent(category)}`);
  };

  return (
    <div className="categories-menu ps-0">
      <h5>Categories</h5>
      <ListGroup>
        {/* Homeopathy Section */}
        <ListGroup.Item>
          <Button
            variant="link"
            onClick={() => setOpenHomeopathy(!openHomeopathy)}
            aria-controls="homeopathy-collapse"
            aria-expanded={openHomeopathy}
          >
            {openHomeopathy ? '- Homeopathy' : '+ Homeopathy'}
          </Button>
          <Collapse in={openHomeopathy}>
            <div id="homeopathy-collapse" className="submenu">
              <ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Dr Reckeweg
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('homeopathy', 'dr reckeweg tinctures'); }}>
                    Dr Reckeweg Tinctures
                  </li>
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('homeopathy', 'dr reckeweg tablets'); }}>
                    Dr Reckeweg Tablets
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Adel Germany
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('homeopathy', 'adel tinctures'); }}>
                    Adel Tinctures
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Baksons
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('homeopathy', 'baksons tinctures'); }}>
                    Baksons Tinctures
                  </li>
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('homeopathy', 'baksons tablets'); }}>
                    Baksons Tablets
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  SBL India
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('homeopathy', 'sbl tinctures'); }}>
                    Tinctures 100ML (Value Packs)
                  </li>
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('sbl', 'sbl30mldrops'); }}>
                    Tinctures 30ML
                  </li>
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('sbl tabs', 'sbl'); }}>
                    SBL Tabs 25gms
                  </li>
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('sbl450gmstabs', 'sbl'); }}>
                    450gms Tabs
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Dr. Willmar Schwabe
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Willmar', 'Willmar Tinctures'); }}>
                    Willmar Tinctures
                  </li>
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Willmar', 'Willmar Tabs. MISC'); }}>
                    Willmar Tabs., MISC
                  </li>
                </ul>
              </ul>
            </div>
          </Collapse>
        </ListGroup.Item>

        {/* Ayurveda Section */}
        <ListGroup.Item>
          <Button
            variant="link"
            onClick={() => setOpenAyurveda(!openAyurveda)}
            aria-controls="ayurveda-collapse"
            aria-expanded={openAyurveda}
          >
            {openAyurveda ? '- Ayurveda' : '+ Ayurveda'}
          </Button>
          <Collapse in={openAyurveda}>
            <div id="ayurveda-collapse" className="submenu">
              <ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Baidyanath
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Baidyanath', 'Vatis, Tabs & Oils'); }}>
                    Vatis, Oils & Tabs
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Charak
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Charak', 'Vatis, Tabs'); }}>
                    Vatis, Tabs
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Dabur Products
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Dabur', 'Vatis, Oils & Tabs'); }}>
                    Vatis, Oils & Tabs
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Divya Patanjali Products
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Divya | Patanjali', 'Vatis, Oils & Tabs'); }}>
                    Vatis, Oils & Tabs
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Jiva Products
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Jiva Ayurveda', 'Ayurveda'); }}>
                    Vatis, Oils & Tabs
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Himalaya Products
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Himalaya', 'Ayurveda'); }}>
                    Vatis, Oils & Tabs
                  </li>
                </ul>
              </ul>
            </div>
          </Collapse>
        </ListGroup.Item>

        {/* Beauty & MISC Section */}
        <ListGroup.Item>
          <Button
            variant="link"
            onClick={() => setOpenBeautyMisc(!openBeautyMisc)}
            aria-controls="beauty-misc-collapse"
            aria-expanded={openBeautyMisc}
          >
            {openBeautyMisc ? '- Beauty & MISC' : '+ Beauty & MISC'}
          </Button>
          <Collapse in={openBeautyMisc}>
            <div id="beauty-misc-collapse" className="submenu">
              <ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Beauty Products
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Homeopath Beauty', 'Beauty Products'); }}>
                    Homeopath Beauty
                  </li>
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Eye Care', 'Beauty Products'); }}>
                    Eye Care
                  </li>
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Khadi', 'Beauty Products'); }}>
                    Khadi Shampoos...
                  </li>
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Shahnaz', 'Beauty Products'); }}>
                    Shahnaz
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Personal Care
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Personal Care', 'Wellness'); }}>
                    Wellness
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Teas
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Indian Teas', 'Teas'); }}>
                    Indian Teas
                  </li>
                </ul>
                <li
                  className="parent-item"
                  onClick={(event) => {
                    event.stopPropagation(); // Stop event propagation
                    event.preventDefault(); // Prevent default behavior
                  }}
                >
                  Unani
                </li>
                <ul className="submenu">
                  <li onClick={(event) => { event.stopPropagation(); handleCategoryClick('Hamdard', 'Unani'); }}>
                    Hamdard
                  </li>
                </ul>
              </ul>
            </div>
          </Collapse>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default SidePanel;