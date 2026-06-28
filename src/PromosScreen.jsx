import React from 'react';

// Importación de tus imágenes locales desde assets
import tacosAlPastorImg from './assets/tacosAlPastor.webp';
import tacosAsadaImg from './assets/tacosAsada.webp';
import tostitosCarneImg from './assets/tostitosCarne.webp';

// === DATOS INTERNOS DE LAS PROMOCIONES TAQUERAS ===
const PROMOS_DATA = [
  {
    id: 'p1',
    name: "Paquete Mezquite Familiar",
    price: 390,
    description: "¡LA MEJOR OFERTA EN FAMILIA! Llévate 10 Tacos de tu carne favorita (Asada o Pastor), una orden grande de Tostitos con Carne para compartir y 4 Aguas Frescas del día bien heladas.",
    img: tacosAlPastorImg,
    tag: "¡EL COMBO REY DEL MEZQUITE!"
  },
  {
    id: 'p2',
    name: "Domingo de 3x2 en Tacos",
    price: 70, // Precio de 2 tacos ($35 c/u), el tercero va completamente gratis
    description: "¡Domingo taquero! Pide 3 tacos de Asada, Pastor o Cabeza y paga únicamente dos. La combinación perfecta para cerrar el fin de semana como se debe.",
    img: tacosAsadaImg,
    tag: "PROMOCIÓN 3X2 DOMINGUERO"
  },
  {
    id: 'p3',
    name: "Miércoles de Tostitos Especiales",
    price: 100, // Precio combo: Tostitos con carne ($60) + Soda ($35) en oferta especial
    description: "Para romper la semana: En la compra de tus Tostitos preparados con carne asada al carbón y queso derretido, te llevas tu Soda favorita por solo $40 pesos extras.",
    img: tostitosCarneImg,
    tag: "OFERTA OMBLIGO DE SEMANA"
  }
];

export default function PromosScreen() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-brand-dark pb-12">
      
      {/* Encabezado Principal */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase leading-none">
          Promociones de<br />la Semana
        </h2>
        <div className="w-16 h-1 bg-brand-red mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Contenedor de Tarjetas Promocionales */}
      <div className="space-y-8 pt-2">
        {PROMOS_DATA.map((promo) => {
          return (
            <div 
              key={promo.id} 
              className="bg-white rounded-3xl p-6 shadow-xs border border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center hover:shadow-sm transition-shadow relative overflow-hidden"
            >
              
              {/* Decoración visual de esquina */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-brand-yellow/30 rounded-tr-3xl"></div>
              
              {/* Columna Izquierda: Imagen */}
              <div className="md:col-span-5 w-full h-52 overflow-hidden rounded-2xl bg-brand-cream flex items-center justify-center relative">
                <img 
                  src={promo.img} 
                  alt={promo.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs w-8 h-8 rounded-full flex items-center justify-center text-md shadow-xs">
                  {promo.id === 'p3' ? '🥤' : '🌮'}
                </div>
              </div>

              {/* Columna Derecha: Información */}
              <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4 text-center md:text-left">
                
                <div className="space-y-2">
                  <span className="inline-block bg-brand-cream text-brand-yellow font-black text-xs px-3 py-1 rounded-full tracking-wider uppercase">
                    {promo.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-brand-red tracking-tight uppercase leading-tight">
                    {promo.name}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium">
                    {promo.description}
                  </p>
                </div>

                {/* Despliegue de Precio Fijo Informativo */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Precio Especial</span>
                  <span className="text-3xl font-black text-brand-red">
                    ${promo.price}
                  </span>
                </div>
                
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}