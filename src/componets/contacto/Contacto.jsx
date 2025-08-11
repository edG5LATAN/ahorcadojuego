import React, { useState } from "react";
import "./Contacto.css";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import emailjs from '@emailjs/browser';

function Contacto() {
  const [formularioEnviado, setFormularioEnviado] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState(false);

  const enviarCorreo = (valores) => {

    const serviceID = import.meta.env.VITE_MSJ_SERVICE_ID
    const templateID = import.meta.env.VITE_MSJ_TEMPLATE_ID
    const userID = import.meta.env.VITE_MSJ_USER_ID


    emailjs.send(serviceID, templateID, valores, userID)
      .then(() => {
        setFormularioEnviado(true);
        setTimeout(() => setFormularioEnviado(false), 3000);
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        setErrorEnvio(true);
        setTimeout(() => setErrorEnvio(false), 3000);
      });
  };

  return (
    <div className="contacto_contenedor">
      <div className="contacto_contenedor_box">
        <h1>Contacto</h1>
        <Formik
          initialValues={{
            nombre: "",
            correo: "",
            cuerpo: "",
          }}
          validate={(valores) => {
            let errores = {};

            //validacion nombre
            if (!valores.nombre) {
              errores.nombre = "no dejes nombre vacio";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
              errores.nombre = "no puede tener carcateres especiales solo letras";
            }

            //validacion correo
            if (!valores.correo) {
              errores.correo = "no dejes correo vacio";
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                valores.correo
              )
            ) {
              errores.correo = "correo con caracteres invalidos";
            }

            //validacion mensaje
            if (!valores.cuerpo || valores.cuerpo.trim() === "") {
              errores.cuerpo = "No dejes vacío este campo";
            } else if (valores.cuerpo.length < 50) {
              errores.cuerpo = "Mínimo 50 caracteres";
            } else if (valores.cuerpo.length > 200) {
              errores.cuerpo = "Máximo 200 caracteres";
            }

            return errores;
          }}
          onSubmit={(valores, { resetForm }) => {
            enviarCorreo(valores);
            resetForm();
          }}
        >
          {({ errors }) => (
            <Form>
              <div className="contacto_contenedor_input">
                <label htmlFor="nombre">nombre</label>
                <Field
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="ingrese su nombre"
                />
                <ErrorMessage
                  name="nombre"
                  component={() => (
                    <p className="contacto_contenedor_errores">
                      {errors.nombre}
                    </p>
                  )}
                />
              </div>
              <div className="contacto_contenedor_input">
                <label htmlFor="correo">correo</label>
                <Field
                  type="text"
                  name="correo"
                  id="correo"
                  placeholder="ingrese correo"
                />
                <ErrorMessage
                  name="correo"
                  component={() => (
                    <p className="contacto_contenedor_errores">
                      {errors.correo}
                    </p>
                  )}
                />
              </div>
              <div className="contacto_contenedor_input">
                <label htmlFor="cuerpo">Mensaje</label>
                <Field
                  as="textarea"
                  rows="6"
                  name="cuerpo"
                  id="cuerpo"
                  placeholder="ingrese su mensaje"
                />
                <ErrorMessage
                  name="cuerpo"
                  component={() => (
                    <p className="contacto_contenedor_errores">
                      {errors.cuerpo}
                    </p>
                  )}
                />
              </div>

              <motion.button
                className="button_contacto"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                type="submit"
              >
                Enviar
              </motion.button>
              
              {formularioEnviado && (
                <p className="contacto_contenedor_input_ok">
                  Mensaje enviado con éxito ✔️
                </p>
              )}
              
              {errorEnvio && (
                <p className="contacto_contenedor_errores">
                  Error al enviar el mensaje ❌
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}


export default Contacto;