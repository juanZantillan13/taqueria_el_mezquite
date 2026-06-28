import React, { useState } from 'react';

export default function CheckoutScreen({ cart, onUpdateQuantity, onClearCart }) {
  const [deliveryMethod, setDeliveryMethod] = useState('domicilio');
  
  // Estados de los datos de envío
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Estados de los datos bancarios (Cobro en Línea)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Estados para manejar los mensajes de error de validación
  const [errors, setErrors] = useState({});

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  // Validaciones manuales antes de procesar el formulario
  const validateForm = (isPayingInStore) => {
    const tempErrors = {};

    // 1. Validación de Nombre (Mínimo 3 letras, máximo 255)
    const nameRegex = /^[a-zA-ZÁéíóúáéíóúÑñ\s]{3,255}$/;
    if (!nameRegex.test(name.trim())) {
      tempErrors.name = "Ingresa un nombre válido (mínimo 3 letras, máximo 255).";
    }

    // 2. Validación de Teléfono (Exactamente 10 números)
    if (phone.length !== 10) {
      tempErrors.phone = "El teléfono debe contener exactamente 10 dígitos.";
    }

    // 3. Validación de Dirección (Solo si es a domicilio, mínimo 10 caracteres, máximo 255)
    if (deliveryMethod === 'domicilio') {
      if (address.trim().length < 10 || address.trim().length > 255) {
        tempErrors.address = "Especifica mejor tu dirección (mínimo 10 caracteres, máximo 255).";
      }
    }

    // 4. Validaciones de Tarjeta (SÓLO si el pago no es en sucursal)
    if (!isPayingInStore) {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (cleanCard.length !== 16) {
        tempErrors.cardNumber = "Número de tarjeta inválido (deben ser 16 dígitos).";
      }

      const expiryRegex = /^(0[1-2]|1[0-2])\/?([0-9]{2})$/;
      if (!expiryRegex.test(cardExpiry)) {
        tempErrors.cardExpiry = "Usa el formato válido MM/AA.";
      }

      if (cardCvv.length < 3 || cardCvv.length > 4) {
        tempErrors.cardCvv = "CVV inválido (3 o 4 dígitos).";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Filtro estricto para teléfono: Bloquea cualquier cosa que no sea número al escribir
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Elimina letras y símbolos instantáneamente
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  // Formato automático de tarjeta
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formatted.length <= 19) setCardNumber(formatted);
  };

  // Formato automático de expiración
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    if (value.length <= 5) setCardExpiry(value);
  };

  const handleSubmitOrder = (e, isPayingInStore = false) => {
    e.preventDefault();
    
    // Pasa la bandera de si es pago en caja para saltarse la validación bancaria
    if (!validateForm(isPayingInStore)) return;

    const orderSummary = {
      cliente: { name, phone },
      metodoEntrega: deliveryMethod,
      direccion: deliveryMethod === 'domicilio' ? address : 'Recoge en Tienda Física',
      metodoPago: isPayingInStore ? 'Pago en Sucursal' : 'Pago en Línea',
      articulos: cart,
      total: calculateTotal()
    };

    console.log("Pedido confirmado:", orderSummary);

    if (isPayingInStore) {
      alert(`🍔 ¡Pedido Confirmado!\nTotal a pagar en sucursal: $${calculateTotal()} MXN.\nPasa por tu orden en 20 minutos.`);
    } else {
      alert(`💳 ¡Pago en Línea Procesado!\nTotal cobrado: $${calculateTotal()} MXN.\n¡Tu pedido ya está en cocina!`);
    }
    
    onClearCart();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn text-brand-dark pb-12">
      
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
          Finalizar mi Pedido
        </h2>
        <div className="w-16 h-1 bg-brand-red mx-auto mt-2 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
        
        {/* COLUMNA IZQUIERDA: RESUMEN DE LA ORDEN */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest border-b border-gray-100 pb-2">
            FINAL ORDE:
          </h3>
          
          {cart.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <span className="text-4xl block">🛒</span>
              <p className="text-gray-400 text-sm font-bold">No hay productos en tu orden.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="py-4 flex justify-between items-center group">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-black text-brand-red bg-brand-cream w-8 h-8 rounded-xl flex items-center justify-center border border-brand-red/5">
                      {item.quantity}x
                    </span>
                    <div>
                      <h4 className="text-sm font-black leading-snug">{item.name}</h4>
                      <p className="text-xs text-gray-400 font-bold">${item.price} c/u</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-black">${item.price * item.quantity}</span>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-0.5 space-x-1">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-xs hover:bg-white text-gray-500 hover:text-brand-red w-5 h-5 rounded-md font-black cursor-pointer">-</button>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-xs hover:bg-white text-gray-500 hover:text-brand-yellow w-5 h-5 rounded-md font-black transition-colors cursor-pointer">+</button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 mt-2 flex justify-between items-center text-md font-black border-t border-gray-100">
                <span className="uppercase text-gray-400 tracking-wider text-xs">Total:</span>
                <span className="text-brand-red text-2xl tracking-tight">${calculateTotal()} MXN</span>
              </div>
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: FORMULARIO */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
          <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest border-b border-gray-100 pb-2">
            TU PEDIDO Y DATOS DE PAGO:
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button"
              onClick={() => { setDeliveryMethod('domicilio'); setErrors({}); }}
              className={`p-3.5 rounded-2xl font-black flex items-center justify-center space-x-2 border text-xs tracking-wider transition-all cursor-pointer ${
                deliveryMethod === 'domicilio' ? 'bg-brand-red text-white border-brand-red' : 'bg-gray-50 text-gray-400 border-gray-200'
              }`}
            >
              <span>🏠</span> <span>PEDIDO A DOMICILIO</span>
            </button>
            <button 
              type="button"
              onClick={() => { setDeliveryMethod('tienda'); setErrors({}); }}
              className={`p-3.5 rounded-2xl font-black flex items-center justify-center space-x-2 border text-xs tracking-wider transition-all cursor-pointer ${
                deliveryMethod === 'tienda' ? 'bg-brand-red text-white border-brand-red' : 'bg-gray-50 text-gray-400 border-gray-200'
              }`}
            >
              <span>🏪</span> <span>RECOGER EN TIENDA</span>
            </button>
          </div>

          <form className="space-y-4 pt-2" onSubmit={(e) => handleSubmitOrder(e, false)} noValidate>
            
            {/* Input Nombre (Límite 255) */}
            <div className="space-y-1">
              <label className="flex items-center space-x-1.5 text-xs font-black text-gray-600 uppercase tracking-wide">
                <span className="text-brand-red">🔴</span>
                <span>Nombre</span>
              </label>
              <input 
                type="text" 
                maxLength="255" // <-- Límite de caracteres
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm font-semibold ${
                  errors.name ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:ring-brand-red/20 focus:border-brand-red'
                }`}
                placeholder="Ingresa tu nombre completo" 
              />
              {errors.name && <p className="text-red-500 text-[11px] font-bold animate-fadeIn">{errors.name}</p>}
            </div>

            {/* Input Teléfono (Límite 10, Sólo números) */}
            <div className="space-y-1">
              <label className="flex items-center space-x-1.5 text-xs font-black text-gray-600 uppercase tracking-wide">
                <span className="text-brand-red">🔴</span>
                <span>Teléfono</span>
              </label>
              <input 
                type="text" 
                inputMode="numeric"
                maxLength="10" // <-- Límite de caracteres numéricos
                value={phone}
                onChange={handlePhoneChange} // <-- Bloqueo de letras activo
                className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm font-semibold ${
                  errors.phone ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:ring-brand-red/20 focus:border-brand-red'
                }`}
                placeholder="Ej. 6531234567" 
              />
              {errors.phone && <p className="text-red-500 text-[11px] font-bold animate-fadeIn">{errors.phone}</p>}
            </div>

            {/* Dirección o Info Sucursal */}
            {deliveryMethod === 'domicilio' ? (
              <div className="space-y-1 animate-fadeIn">
                <label className="flex items-center space-x-1.5 text-xs font-black text-gray-600 uppercase tracking-wide">
                  <span className="text-brand-red">🔴</span>
                  <span>Dirección de Entrega</span>
                </label>
                <input 
                  type="text" 
                  maxLength="255" // <-- Límite de caracteres
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm font-semibold ${
                    errors.address ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:ring-brand-red/20 focus:border-brand-red'
                  }`}
                  placeholder="Calle, Número Exterior, Colonia o Entre Calles" 
                />
                {errors.address && <p className="text-red-500 text-[11px] font-bold animate-fadeIn">{errors.address}</p>}
              </div>
            ) : (
              <div className="bg-yellow-50/40 border border-brand-yellow/10 p-4 rounded-2xl space-y-1 animate-fadeIn">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📍</span>
                  <span className="text-xs font-black text-brand-yellow uppercase tracking-wider">Ubicación de Tienda Física</span>
                </div>
                <p className="text-xs font-bold text-gray-700 mt-1 pl-6">Av. Reforma 1234, Ciudad Estrella, CP 83400</p>
                <div className="pl-6 pt-1">
                  <button type="button" onClick={() => alert("Abriendo Google Maps...")} className="text-xs font-black text-brand-red underline hover:text-red-700 transition-colors cursor-pointer">VER EN MAPA</button>
                </div>
              </div>
            )}

            {/* SECCIÓN PAGO EN LÍNEA: Desaparece visualmente si el usuario elige pagar en tienda */}
            {deliveryMethod === 'domicilio' && (
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-4 animate-fadeIn">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">💳</span>
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Información de Pago en Línea</h4>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-600 uppercase tracking-wide block">Número de Tarjeta</label>
                  <input 
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm font-semibold tracking-widest ${
                      errors.cardNumber ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:ring-brand-red/20 focus:border-brand-red'
                    }`}
                    placeholder="0000 0000 0000 0000"
                  />
                  {errors.cardNumber && <p className="text-red-500 text-[11px] font-bold animate-fadeIn">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-600 uppercase tracking-wide block">Expiración</label>
                    <input 
                      type="text"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm font-semibold text-center ${
                        errors.cardExpiry ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:ring-brand-red/20 focus:border-brand-red'
                      }`}
                      placeholder="MM/AA"
                    />
                    {errors.cardExpiry && <p className="text-red-500 text-[11px] font-bold animate-fadeIn">{errors.cardExpiry}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-600 uppercase tracking-wide block">CVV</label>
                    <input 
                      type="password"
                      maxLength="4"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 transition-all text-sm font-semibold text-center tracking-widest ${
                        errors.cardCvv ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:ring-brand-red/20 focus:border-brand-red'
                      }`}
                      placeholder="***"
                    />
                    {errors.cardCvv && <p className="text-red-500 text-[11px] font-bold animate-fadeIn">{errors.cardCvv}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                BOTONES ACCIÓN DE ENVÍO DINÁMICOS
                ======================================================== */}
            {deliveryMethod === 'domicilio' ? (
              /* BOTÓN ESTÁNDAR: Para envíos obligatorios a domicilio con cobro online */
              <button 
                type="submit" 
                disabled={cart.length === 0}
                className="w-full bg-brand-red text-white cursor-pointer font-black text-xs uppercase tracking-widest py-4 rounded-2xl border-2 border-brand-yellow hover:bg-red-700 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed mt-6 flex justify-between items-center px-6"
              >
                <span>PEDIR Y PAGAR EN LÍNEA</span>
                <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">${calculateTotal()}</span>
              </button>
            ) : (
              /* BOTONES INTERACTIVOS: Si el usuario va a recoger a la sucursal */
              <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fadeIn">
                <button 
                  type="button"
                  disabled={cart.length === 0}
                  onClick={(e) => handleSubmitOrder(e, true)} // <-- Activa la bandera de saltar tarjeta
                  className="flex-1 bg-brand-yellow hover:bg-yellow-500 text-white cursor-pointer font-black text-xs uppercase tracking-widest py-4 rounded-2xl border-2 border-white shadow-md disabled:opacity-40 transition-all text-center"
                >
                  🏪 Realizar pago en la sucursal (${calculateTotal()})
                </button>
                
                <button 
                  type="button"
                  disabled={cart.length === 0}
                  onClick={() => alert("Desplegar formulario para ingresar tarjeta si el usuario prefiere adelantar el pago en línea...")}
                  className="flex-1 bg-brand-red hover:bg-red-700 text-white cursor-pointer font-black text-xs uppercase tracking-widest py-4 rounded-2xl border-2 border-brand-yellow shadow-md disabled:opacity-40 transition-all text-center"
                >
                  💳 Pagar en línea ahora
                </button>
              </div>
            )}

          </form>

        </div>

      </div>
    </div>
  );
}