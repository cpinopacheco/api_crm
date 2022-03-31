import { Outlet, Link, useLocation } from "react-router-dom";
/* 
  Cuando se utiliza react-router-dom no se ocupan las etiquetas <a></a> porque el navegador recarga. Para eso se ocuapan los componentes Link o Navlink.

  tampoco se utiliza el atributo href, en cambio utilizamos el atributo to. 

  Outlet renderiza lo que se le indica el la definicion de rutas.

  useLocation : Es un hook que nos permite obtener informacion de la url.
*/

export const Layout = () => {
  const location = useLocation();

  const urlActual = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-blue-900 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">
          CRM - Clientes
        </h2>

        <nav className="mt-10">
          {/* verificar como estan las rutas en el react-router-dom */}
          <Link
            to="/clientes"
            className={` ${
              urlActual === "/clientes" ? "text-blue-300" : "text-white"
            } text-white text-2xl block mt-2 hover:text-blue-300`}
          >
            Clientes
          </Link>
          <Link
            to="/clientes/nuevo"
            className={`${
              urlActual === "/clientes/nuevo" ? "text-blue-300" : "text-white"
            } text-white text-2xl block mt-2 hover:text-blue-300`}
          >
            Nuevo Cliente
          </Link>
        </nav>
      </div>
      <div className="md:w-3/4 p-10 bg-slate-200 md:h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};
