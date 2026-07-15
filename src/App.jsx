import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

// Importación de Logos e Imágenes locales basados en assets
import logoMezquite from './assets/logo.png';
import tacosAlPastorImg from './assets/tacosAlPastor.webp';
import quesadillasImg from './assets/quesadillas.webp';
import sodasImg from './assets/sodas.webp';
import tortaImg from './assets/torta.webp';

import MenuScreen from './MenuScreen';
import PromosScreen from './PromosScreen';

// Importación de la lógica asíncrona real
import { inicializarDatosLandingReales } from './taqueriaService';

// Categorías actualizadas con las imágenes locales de tus archivos
const categories = [
  { id: 1, name: "Tacos", img: tacosAlPastorImg },
  { id: 2, name: "Quesadillas", img: quesadillasImg },
  { id: 3, name: "Tortas", img: tortaImg },
  { id: 4, name: "Bebidas", img: sodasImg }
];

function MenuWrapper() {
  const { categoryName } = useParams();
  return <MenuScreen initialCategory={categoryName || null} />;
}

export default function App() {
  const navigate = useNavigate();

  // Estados para controlar las respuestas de las funciones asíncronas reales
  const [datosEnVivo, setDatosEnVivo] = useState(null);
  const [cargandoEstado, setCargandoEstado] = useState(true);

  useEffect(() => {
    const cargarInformacionReal = async () => {
      // Dispara la resolución en paralelo de las 5 operaciones asíncronas reales
      const datos = await inicializarDatosLandingReales();
      setDatosEnVivo(datos);
      setCargandoEstado(false);
    };
    cargarInformacionReal();
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-dark antialiased flex flex-col">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="bg-white shadow-xs sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
            <img 
              src={logoMezquite} 
              alt="Logo El Mezquite" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <span className="text-xl md:text-2xl font-black tracking-tight text-brand-red">
              TAQUERÍA <span className="text-black">EL MEZQUITE</span>
            </span>
          </Link>

          {/* Navegación limpia */}
          <nav className="flex space-x-6 lg:space-x-8 font-bold text-sm">
            <Link to="/" className="pb-1 cursor-pointer transition-colors text-gray-700 hover:text-brand-red">Inicio</Link>
            <Link to="/menu" className="pb-1 cursor-pointer transition-colors text-gray-700 hover:text-brand-red">Menú</Link>
            <Link to="/promociones" className="pb-1 cursor-pointer transition-colors text-gray-700 hover:text-brand-red">Promociones</Link>
          </nav>
        </div>
      </header>

      {/* ========================================================
          SISTEMA DE RUTAS DINÁMICAS
          ======================================================== */}
      <main className="flex-grow w-full px-4 py-8 md:py-12">
        <Routes>
          {/* RUTA: INICIO */}
          <Route path="/" element={
            <section className="w-full max-w-none px-6 md:px-16 lg:px-24 py-8 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fadeIn">
              
              {/* Contenedor de Imágenes Redondas */}
              <div className="relative flex justify-center order-2 md:order-1 md:col-span-5 w-full">
                <span className="absolute top-4 left-12 text-brand-red text-3xl font-bold animate-pulse">\\\</span>
                <span className="absolute bottom-12 right-12 text-brand-yellow text-3xl font-bold">///</span>
                
                <div className="flex -space-x-12 items-end w-full justify-center">
                  <img 
                    src={tacosAlPastorImg} 
                    alt="Tacos al Pastor" 
                    className="w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 object-cover rounded-full shadow-xl border-4 border-white transform -rotate-6 transition-transform hover:rotate-0 duration-300"
                  />
                  <img 
                    src={quesadillasImg} 
                    alt="Quesadillas Con Carne" 
                    className="w-48 md:w-60 lg:w-72 h-48 md:h-60 lg:h-72 object-cover rounded-full shadow-lg border-4 border-white transform rotate-3 z-10 hidden sm:block transition-transform hover:rotate-0 duration-300"
                  />
                </div>
              </div>

              {/* Contenedor de Textos del Hero */}
              <div className="space-y-6 md:space-y-8 order-1 md:order-2 md:col-span-7 text-center md:text-left pl-0 md:pl-8 flex flex-col items-center md:items-start">
                
                {/* INDICADOR EN VIVO BASADO EN TUS 5 FUNCIONES ASÍNCRONAS REALES */}
                {!cargandoEstado && datosEnVivo && (
                  <div className="bg-white/80 backdrop-blur-xs px-4 py-2 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center gap-3 text-xs font-black shadow-xs tracking-tight animate-fadeIn">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${datosEnVivo.estaAbierto ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                      {datosEnVivo.estaAbierto ? 'SUCURSAL ABIERTA AHORA' : 'SUCURSAL CERRADA POR AHORA'}
                    </span>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <span className="text-gray-500">
                      {datosEnVivo.distancia !== null 
                        ? `Estás a ${datosEnVivo.distancia} km de El Mezquite` 
                        : `Viendo el menú desde ${datosEnVivo.ubicacionIP.ciudad}, ${datosEnVivo.ubicacionIP.region}`}
                    </span>
                  </div>
                )}

                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brand-red tracking-tight leading-none uppercase text-center md:text-left">
                  ¡Los mejores tacos<br />a la plancha!
                </h2>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-brand-yellow italic text-center md:text-left">
                  El Verdadero Sabor del Mezquite
                </p>
        
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2 w-full sm:w-auto">
                  <Link to="/menu" className="bg-brand-red hover:bg-red-700 text-white cursor-pointer font-black px-10 py-4 rounded-full shadow-md border-2 border-brand-yellow tracking-wider text-sm sm:text-base transition-transform active:scale-95 text-center flex items-center justify-center">
                    EXPLORA EL MENÚ
                  </Link>
                </div>
              </div>

            </section>
          } />

          {/* RUTAS DEL CATÁLOGO */}
          <Route path="/menu" element={<MenuWrapper />} />
          <Route path="/menu/:categoryName" element={<MenuWrapper />} />
          <Route path="/promociones" element={<PromosScreen />} />          
        </Routes>
      </main>

      {/* ========================================================
          4. SECCIÓN INFERIOR / FOOTER
          ======================================================== */}
      <footer className="w-full bg-white border-t border-gray-200/60 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Accesos rápidos de categorías */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => navigate(`/menu/${cat.name}`)}
                  className="bg-brand-cream p-3 rounded-2xl flex flex-col items-center justify-center shadow-xs border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <img 
                    src={cat.img} 
                    alt={cat.name} 
                    className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-white group-hover:scale-105 transition-transform" 
                  />
                  <span className="text-xs font-black text-gray-800 tracking-tight flex items-center group-hover:text-brand-red">
                    {cat.name} <span className="text-brand-red ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Información Fija de la Tienda */}
            <div className="bg-brand-cream/40 p-4 rounded-2xl shadow-xs border border-gray-100 text-center lg:text-left space-y-3">
              <div>
                <h4 className="text-md font-black text-gray-900">Nuestras Ubicaciones</h4>
                <p className="text-xs font-medium text-gray-500 mt-1">
                 Av. Nuevo León y Calle 7, Col. Del Bosque, C.P. 83490<br/>
                 Av. Lázaro Cárdenas y Calle 32, Col. Altar, C.P. 83490
                </p>
              </div>
              
              <div className="flex justify-center lg:justify-start space-x-3 pt-1">
                <a href="#" className="w-7 h-7 bg-brand-red text-white flex items-center justify-center rounded-full text-xs font-bold hover:opacity-90">f</a>
                <a href="#" className="w-7 h-7 bg-brand-red text-white flex items-center justify-center rounded-full text-xs font-bold hover:opacity-90">i</a>
                <a href="#" className="w-7 h-7 bg-brand-red text-white flex items-center justify-center rounded-full text-xs font-bold hover:opacity-90">yt</a>
              </div>
            </div>
          </div>

          {/* NOTA AL PIE DE PÁGINA */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-[10px] md:text-xs font-bold text-gray-400 tracking-wider uppercase max-w-3xl mx-auto leading-relaxed">
              © 2026 TAQUERÍA EL MEZQUITE, INC. ALGUNOS PRODUCTOS ESTÁN SUJETOS A DISPONIBILIDAD DEPENDIENDO DEL RESTAURANTE Y/O CIUDAD.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}