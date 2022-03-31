import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formulario } from "../components/Formulario";
import { Spinner } from "../components/Spinner";

export const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  //El hook useParams nos permite leer los parametros de la url
  const { id } = useParams();

  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }

      setCargando(false);
    };

    obtenerClienteAPI();
  }, []);
  return cargando ? (
    <Spinner />
  ) : (
    <>
      {cliente?.nombre ? (
        <>
          <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
          <p className="mt-3">
            Utiliza este formulario para editar los datos del cliente
          </p>
          <Formulario cliente={cliente} cargando={cargando} />
        </>
      ) : (
        <p className="bg-red-500 text-white font-bold p-2">
          No existe el usuario con ese ID
        </p>
      )}
    </>
  );
};
