import React, { useState, useEffect } from 'react';

// Importación de tus imágenes locales desde assets
import tacosAsadaImg from './assets/tacosAsada.webp';
import tacosAlPastorImg from './assets/tacosAlPastor.webp';
import tacosCabezaImg from './assets/TacosDeCabeza.webp';
import tortaImg from './assets/torta.webp';
import quesadillasImg from './assets/quesadillas.webp';
import quesaTacoImg from './assets/quesaTaco.webp';
import tostitosCarneImg from './assets/tostitosCarne.webp';
import sodasImg from './assets/sodas.webp';
import aguasImg from './assets/aguas.webp';

const MENU_ITEMS = [
  // --- CATEGORÍA: TACOS ---
  { id: 1, name: "Tacos de Asada", price: 35, category: "Tacos", description: "Carne asada al carbón de mezquite en tortilla recién hecha.", img: tacosAsadaImg },
  { id: 2, name: "Tacos al Pastor", price: 35, category: "Tacos", description: "El clásico trompo adobado con su jardín de verdura y piña.", img: tacosAlPastorImg },
  { id: 3, name: "Tacos de Cabeza", price: 38, category: "Tacos", description: "Carne de cabeza al vapor, suavecita y bien sazonada.", img: tacosCabezaImg },
  
  // --- CATEGORÍA: TORTAS Y ANTOJITOS ---
  { id: 4, name: "Torta", price: 75, category: "Tortas", description: "Telera calientita con tu carne favorita, aguacate, tomate y mayonesa.", img: tortaImg },
  { id: 7, name: "Tostitos con Carne", price: 60, category: "Tortas", description: "Tostitos preparados con carne asada, queso derretido y salsas.", img: tostitosCarneImg },

  // --- CATEGORÍA: QUESADILLAS ---
  { id: 5, name: "Quesadilla", price: 60, category: "Quesadillas", description: "Tortilla grande con queso asadero derretido y tu carne favorita.", img: quesadillasImg },
  { id: 6, name: "QuesaTaco", price: 45, category: "Quesadillas", description: "Tortilla de taco con costra de queso crujiente por dentro.", img: quesaTacoImg },

  // --- CATEGORÍA: BEBIDAS ---
  { id: 8, name: "Soda", price: 35, category: "Bebidas", description: "Refrescos embotellados bien helados.", img: sodasImg },
  { id: 9, name: "Aguas Frescas", price: 35, category: "Bebidas", description: "Aguas naturales del día, refrescantes y preparadas al momento.", img: aguasImg }
];

export default function MenuScreen({ initialCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [initialCategory]);

  const filteredItems = selectedCategory 
    ? MENU_ITEMS.filter(item => item.category === selectedCategory)
    : MENU_ITEMS;

  return (
    <div className="space-y-6 min-h-[60vh] flex flex-col justify-start text-brand-dark">
      
      {/* Selector de categorías visual en texto (Solo lectura / informativo) */}
      <div className="flex flex-col space-y-4 py-4 animate-fadeIn">
        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
            {selectedCategory ? `Menú / ${selectedCategory}` : "Nuestro Menú Completo"}
          </h2>
          {selectedCategory && (
            <button 
              onClick={() => setSelectedCategory(null)} 
              className="text-xs font-bold text-brand-red bg-brand-cream px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            >
              Ver Todo el Menú
            </button>
          )}
        </div>
        
        {/* Cuadrícula de platillos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((dish) => (
            <div key={dish.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
              <div>
                <img 
                  src={dish.img} 
                  alt={dish.name} 
                  className="w-full h-48 object-cover rounded-xl mb-3" 
                />
                
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-md font-black text-gray-900">{dish.name}</h3>
                  {!selectedCategory && (
                    <span className="text-[9px] bg-brand-cream text-gray-500 px-2 py-0.5 rounded-md font-bold uppercase whitespace-nowrap">
                      {dish.category}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{dish.description}</p>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Precio</span>
                <span className="text-xl font-black text-brand-red">${dish.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}