import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export const VerCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  const { nombre, empresa, email, telefono, notas } = cliente;

  //El hook useParams nos permite leer los parametros de la url
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }

      setCargando(!cargando);
    };

    obtenerClienteAPI();
  }, []);

  return cargando ? (
    <Spinner />
  ) : (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Cliente: {nombre}</h1>
      <p className="mt-3">Información del cliente</p>
      {/* <p className="text-4xl text-gray-500 mt-10">
        <span className="text-gray-700 uppercase font-bold">Cliente:</span>{" "}
        {nombre}
      </p> */}
      <p className="text-2xl text-gray-500 mt-4">
        <span className="text-gray-700 uppercase font-bold">Email:</span>{" "}
        {email}
      </p>
      {telefono && (
        <p className="text-2xl text-gray-500 mt-4">
          <span className="text-gray-700 uppercase font-bold">Teléfono:</span>{" "}
          {telefono}
        </p>
      )}
      <p className="text-2xl text-gray-500 mt-4">
        <span className="text-gray-700 uppercase font-bold">Empresa:</span>{" "}
        {empresa}
      </p>
      {notas && (
        <p className="text-2xl text-gray-500 mt-4">
          <span className="text-gray-700 uppercase font-bold">Notas:</span>{" "}
          {notas}
        </p>
      )}
    </div>
  );
};
