import React, { useState, useEffect } from 'react';
import { obtenerRespuestasAutomaticas, obtenerTiposSolicitudes } from '../mock/respuestasAutomaticas';

const RespuestasAutomaticas = ({ onSelectRespuesta, solicitudTipo }) => {
  const [respuestas, setRespuestas] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(solicitudTipo || '');
  const [tiposSolicitudes, setTiposSolicitudes] = useState([]);

  // Cargar tipos de solicitudes al montar el componente
  useEffect(() => {
    const tipos = obtenerTiposSolicitudes();
    setTiposSolicitudes(tipos);
    
    // Si ya tenemos un tipo de solicitud, cargamos sus respuestas
    if (solicitudTipo) {
      const respuestasDisponibles = obtenerRespuestasAutomaticas(solicitudTipo);
      setRespuestas(respuestasDisponibles);
      setTipoSeleccionado(solicitudTipo);
    }
  }, [solicitudTipo]);

  // Manejar cambio de tipo de solicitud
  const handleTipoChange = (e) => {
    const nuevoTipo = e.target.value;
    setTipoSeleccionado(nuevoTipo);
    
    if (nuevoTipo) {
      const respuestasDisponibles = obtenerRespuestasAutomaticas(nuevoTipo);
      setRespuestas(respuestasDisponibles);
    } else {
      setRespuestas([]);
    }
  };

  // Manejar selección de respuesta
  const handleSelectRespuesta = (respuesta) => {
    if (onSelectRespuesta) {
      onSelectRespuesta(respuesta);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Respuestas Automáticas</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de solicitud
        </label>
        <select
          value={tipoSeleccionado}
          onChange={handleTipoChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">Seleccione un tipo</option>
          {tiposSolicitudes.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
          <option value="general">Respuesta general</option>
        </select>
      </div>

      {respuestas.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Respuestas disponibles
          </label>
          <div className="space-y-2">
            {respuestas.map((respuesta, index) => (
              <div 
                key={index}
                onClick={() => handleSelectRespuesta(respuesta)}
                className="p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm text-gray-600">{respuesta}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RespuestasAutomaticas;
