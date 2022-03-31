import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Alerta } from "./Alerta";
import { Spinner } from "./Spinner";

export const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  //Validación del formulario con Yup
  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("El email no es válido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .integer("El número no es válido")
      .positive("El número no es válido")
      .typeError("El número no es válido"),
  });

  //Envio del formulario
  const handleSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        //Editando un registro
        const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;

        //cuando crear, eliminamos o actualizamos parasamos un segundo parametro para configurar la petición. Por defecto es un methodo GET
        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //Nuevo Registro
        const url = import.meta.env.VITE_API_URL;

        //cuando crear, eliminamos o actualizamos parasamos un segundo parametro para configurar la petición. Por defecto es un methodo GET
        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      await respuesta.json(); //Nos retorna la respuesta como json
      navigate("/clientes"); //nos redirige al path correspondiente
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          //Nullish coalescing operator: si viene el valor de nombre en cliente lo agrega, sino deja un string vacio.
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values); //Espera a que la funcion se complete y luego resetea el formulario
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-600" htmlFor="nombre">
                  Nombre:{" "}
                </label>
                <Field
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />
                {/* el mensaje se puede hacer con la validacion o con el componente */}

                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}

                {/* <ErrorMessage
                  name="nombre"
                  component="div"
                  className="bg-red-800 text-white"
                /> */}
              </div>
              <div className="mb-4">
                <label className="text-gray-600" htmlFor="empresa">
                  Empresa:{" "}
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-600" htmlFor="email">
                  Email:{" "}
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  placeholder="Email del cliente"
                  name="email"
                />
                {errors.email && touched.email && (
                  <Alerta>{errors.email}</Alerta>
                )}
              </div>
              <div className="mb-4">
                <label className="text-gray-600" htmlFor="telefono">
                  Teléfono:{" "}
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-200"
                  placeholder="Teléfono del cliente (opcional)"
                  name="telefono"
                />
                {errors.telefono && touched.telefono && (
                  <Alerta>{errors.telefono}</Alerta>
                )}
              </div>
              <div className="mb-4">
                <label className="text-gray-600" htmlFor="notas">
                  Notas:{" "}
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-200 h-40"
                  placeholder="Notas del cliente (opcional)"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className=" mt-5 w-full p-3 text-white uppercase font-bold text-lg bg-blue-900"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};
