import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { Inicio } from "./paginas/Inicio";
import { NuevoCliente } from "./paginas/NuevoCliente";
import { EditarCliente } from "./paginas/EditarCliente";
import { VerCliente } from "./paginas/VerCliente";

/* 
en la etiqueta Route: path indica la ruta y element indica el componente que queremos que se muestre.
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* con apertura y cierre indica un grupo de rutas */}
        <Route>
          {/* solo con etiqueta de cierre indica que es una sola ruta. y pertenece al grupo donde se encuentra  */}
          <Route path="/clientes" element={<Layout />}>
            <Route index element={<Inicio />} />
            <Route path="nuevo" element={<NuevoCliente />} />
            {/* la sintaxis con :id va esuchar un valor dinamico */}
            <Route path="editar/:id" element={<EditarCliente />} />
            <Route path=":id" element={<VerCliente />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
