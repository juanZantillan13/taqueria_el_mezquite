// 1. Promisificación de la API de Geolocalización (GPS del navegador)
/*export const obtenerCoordenadasGPS = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalización no soportada por el navegador"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude }),
      (error) => reject(error)
    );
  });
};

// 2. Fetch a una API externa (Geolocalización por IP pública si falla el GPS)
export const obtenerCiudadPorIP = async () => {
  const respuesta = await fetch("https://ipapi.co/json/");
  if (!respuesta.ok) throw new Error("No se pudo consultar la API de IP");
  const datos = await respuesta.json();
  return { ciudad: datos.city, region: datos.region };
};

// 3. Fetch a un recurso local de tu servidor (Archivo de configuración/avisos)
export const obtenerAvisoDelServidor = async () => {
  try {
    const respuesta = await fetch('/aviso.json');
    if (!respuesta.ok) throw new Error();
    return await respuesta.json();
  } catch (error) {
    return { mensaje: "¡Bienvenidos al auténtico sabor al carbón de mezquite!" };
  }
};

// 4. Verificación basada en la hora local del sistema
export const verificarHorarioReal = async () => {
  const horaActual = new Date().getHours();
  const horaApertura = 14; // 2:00 PM
  const horaCierre = 23;   // 11:00 PM
  return horaActual >= horaApertura && horaActual < horaCierre;
};

// 5. Concurrencia con Promise.all
export const inicializarDatosLandingReales = async () => {
  const [estaAbierto, aviso, ubicacionIP] = await Promise.all([
    verificarHorarioReal(),
    obtenerAvisoDelServidor(),
    obtenerCiudadPorIP().catch(() => ({ ciudad: "San Luis Río Colorado", region: "Sonora" }))
  ]);

  let distanciaKm = null;
  try {
    const gps = await obtenerCoordenadasGPS();
    const taqueriaLat = 32.4630; 
    const taqueriaLon = -114.7770;
    
    distanciaKm = Math.sqrt(
      Math.pow(gps.lat - taqueriaLat, 2) + Math.pow(gps.lon - taqueriaLon, 2)
    ) * 111;
    distanciaKm = parseFloat(distanciaKm.toFixed(1));
  } catch (e) {
    console.log("El usuario no compartió GPS, se usará la aproximación por IP.");
  }

  return { estaAbierto, aviso, ubicacionIP, distancia: distanciaKm };
};
*/