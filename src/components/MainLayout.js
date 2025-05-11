import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import ChatbotAssistant from './ChatbotAssistant';
import SolicitudesManager from './SolicitudesManager';
import Foro from './Foro';

// Componente para la sección de inicio
const HomeSection = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Datos de ejemplo para reservas (reemplazar con API real)
  const espacios = [
    {
      id: 1,
      nombre: "Auditorio Principal",
      imagen: "https://media.gettyimages.com/id/521064316/es/foto/empty-theater-stage.jpg?s=612x612&w=0&k=20&c=_Rg2toxqulGgYNg_jGHayM_MKyNU2BL0YforZ5IaWeM=",
      capacidad: "200 personas"
    },
    {
      id: 2,
      nombre: "Sala de Conferencias",
      imagen: "https://images.unsplash.com/photo-1628062699790-7c45262b82b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhbGElMjBkZSUyMHJldW5pb25lc3xlbnwwfHwwfHx8MA%3D%3D",
      capacidad: "50 personas"
    },
    {
      id: 3,
      nombre: "Laboratorio de Computación",
      imagen: "https://img.freepik.com/foto-gratis/cientifico-profesional-gafas-realidad-virtual-innovacion-medica-laboratorio-equipo-investigadores-que-trabajan-equipo-dispositivo-futuro-medicina-salud-profesional-vision-simulador_482257-12838.jpg?semt=ais_hybrid&w=740",
      capacidad: "30 personas"
    },
    {
      id: 4,
      nombre: "Coliseo",
      imagen: "https://images.unsplash.com/photo-1630420598913-44208d36f9af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnV0c2FsfGVufDB8fDB8fHww",
      capacidad: "1000 personas"
    },
    {
      id: 5,
      nombre: "Cancha de Fútbol 11 (Grama Sintética)",
      imagen: "https://images.unsplash.com/photo-1510051640316-cee39563ddab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FuY2hhJTIwZGUlMjBmdXRib2x8ZW58MHx8MHx8fDA%3D",
      capacidad: "22 jugadores"
    },
    {
      id: 6,
      nombre: "Canchas de Tenis de Campo",
      imagen: "https://media.istockphoto.com/id/2155734323/es/foto/clay-tennis-court.webp?a=1&b=1&s=612x612&w=0&k=20&c=9-OUi8A7r5l3G_o4vQV2fV0IuVpRGwj0vCdCEmNHOFw=",
      capacidad: "4 personas por cancha"
    },
    {
      id: 7,
      nombre: "Laboratorio de Electrónica",
      imagen: "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3Ryb25pY2F8ZW58MHx8MHx8fDA%3D",
      capacidad: "25 personas"
    }
  ];

  // Función para avanzar al siguiente conjunto de tarjetas
  const scrollRight = () => {
    if (currentIndex < espacios.length - 3) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Volver al principio si llegamos al final
    }
  };

  // Función para retroceder al conjunto anterior de tarjetas
  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(espacios.length - 3); // Ir al final si estamos en el principio
    }
  };

  // Se ha eliminado el intervalo de cambio automático
  // para que las imágenes solo cambien cuando se presionan los botones

  // Simulación de API de noticias
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        // En producción, reemplazar con:
        // const response = await fetch('https://api.udem.edu.co/noticias');
        // const data = await response.json();
        
        // Datos de ejemplo
        const data = [
          {
            id: 1,
            titulo: "Semana de la Innovación",
            fecha: "2025-05-15",
            resumen: "Charlas y talleres sobre innovación tecnológica"
          },
          {
            id: 2,
            titulo: "Nuevo laboratorio de IA",
            fecha: "2025-05-19",
            resumen: "Ya puedes inscribirte para usar el nuevo laboratorio de Inteligencia Artificial."
          }
        ];
        setNoticias(data);
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  // Obtener los elementos visibles actualmente en el carrusel
  const visibleEspacios = espacios.slice(currentIndex, currentIndex + 3);
  
  // Si no hay suficientes elementos para mostrar 3, completar con elementos del principio
  if (visibleEspacios.length < 3) {
    const remainingCount = 3 - visibleEspacios.length;
    const additionalItems = espacios.slice(0, remainingCount);
    visibleEspacios.push(...additionalItems);
  }
  // Estado para controlar el formulario de reserva activo
const [formularioActivo, setFormularioActivo] = useState(null);

// Estado para los datos del formulario
const [reservaDatos, setReservaDatos] = useState({
  nombre: '',
  fecha: '',
  hora: ''
});

// Manejador para cambios en los inputs del formulario
const handleChange = (e) => {
  const { name, value } = e.target;
  setReservaDatos({ ...reservaDatos, [name]: value });
};

// Manejador de envío del formulario
const handleSubmit = (e) => {
  e.preventDefault();
  alert(`Reserva realizada para: ${reservaDatos.nombre} - ${reservaDatos.fecha} a las ${reservaDatos.hora}`);
  setFormularioActivo(null); // Ocultar formulario después de enviar
  setReservaDatos({ nombre: '', fecha: '', hora: '' }); // Reset
};


  return (
    <div className="space-y-8">
      {/* Sección de Noticias UDEM */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-6">Noticias UDEM</h2>
        {loading ? (
          <p>Cargando noticias...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {noticias.map(noticia => (
              <div key={noticia.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-red-700">{noticia.titulo}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(noticia.fecha).toLocaleDateString('es-ES')}
                </p>
                <p className="text-gray-700">{noticia.resumen}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Sección de Reserva de Espacios con Carrusel */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-6">Reserva de Espacios</h2>
        
        <div className="relative">
          {/* Botón Anterior */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-red-600 text-white rounded-full p-2 shadow-md hover:bg-red-700 focus:outline-none"
            aria-label="Anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Contenedor del Carrusel */}
          <div 
            ref={scrollContainerRef}
            className="grid grid-cols-3 gap-6 px-10 transition-all duration-300 ease-in-out"
          >
            {visibleEspacios.map(espacio => (
              <div key={`visible-${espacio.id}`} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={espacio.imagen} 
                  alt={espacio.nombre} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-red-700">{espacio.nombre}</h3>
                  <p className="text-gray-600 mb-4">Capacidad: {espacio.capacidad}</p>
                  <button 
  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
  onClick={() => setFormularioActivo(espacio.id)}
>
  Reservar
</button>

{formularioActivo === espacio.id && (
  <form onSubmit={handleSubmit} className="mt-4 space-y-2">
    <input 
      type="text" 
      name="nombre" 
      placeholder="Tu nombre" 
      value={reservaDatos.nombre} 
      onChange={handleChange} 
      className="w-full p-2 border rounded"
      required
    />
    <input 
      type="date" 
      name="fecha" 
      value={reservaDatos.fecha} 
      onChange={handleChange} 
      className="w-full p-2 border rounded"
      required
    />
    <input 
      type="time" 
      name="hora" 
      value={reservaDatos.hora} 
      onChange={handleChange} 
      className="w-full p-2 border rounded"
      required
    />
    <div className="flex justify-end gap-2">
      <button 
        type="submit" 
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirmar
      </button>
      <button 
        type="button" 
        onClick={() => setFormularioActivo(null)} 
        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
      >
        Cancelar
      </button>
    </div>
  </form>
)}

                </div>
              </div>
            ))}
          </div>
          
          {/* Botón Siguiente */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-red-600 text-white rounded-full p-2 shadow-md hover:bg-red-700 focus:outline-none"
            aria-label="Siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Indicadores de página */}
        <div className="flex justify-center mt-4 space-x-2">
          {espacios.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
              }`}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

const MainLayout = ({ onCreateSolicitud }) => {
  const [currentView, setCurrentView] = useState('home'); // Cambiado a 'home' como vista inicial
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con color rojo */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Universidad de Medellín</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('profile')}
              className="flex items-center space-x-2 hover:bg-red-700 px-3 py-1 rounded transition"
            >
              <span className="w-8 h-8 rounded-full bg-white text-red-800 flex items-center justify-center font-bold">
                {user?.nombre?.charAt(0)}
              </span>
              <span>{user?.nombre}</span>
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white text-red-800 rounded-lg hover:bg-gray-100 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Barra de navegación con color rojo */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto flex space-x-4 p-2 overflow-x-auto">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'home'
                ? 'bg-red-100 text-red-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setCurrentView('chatbot')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'chatbot'
                ? 'bg-red-100 text-red-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Asistente Virtual
          </button>
          <button
            onClick={() => setCurrentView('solicitudes')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'solicitudes'
                ? 'bg-red-100 text-red-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Solicitudes
          </button>
          <button
            onClick={() => setCurrentView('foro')}
            className={`px-4 py-2 rounded-lg transition whitespace-nowrap ${
              currentView === 'foro'
                ? 'bg-red-100 text-red-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Foro
          </button>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="container mx-auto p-4 md:p-8">
        {currentView === 'home' && <HomeSection />}
        {currentView === 'chatbot' && <ChatbotAssistant />}
        {currentView === 'solicitudes' && (
          <SolicitudesManager onCreateSolicitud={onCreateSolicitud} />
        )}
        {currentView === 'foro' && <Foro />}
      </main>
    </div>
  );
};

export default MainLayout;