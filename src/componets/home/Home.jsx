import React, { useEffect, useState } from "react";
import "./Home.css";
import { listaPalabras } from "../service/Listas";
import { motion } from "framer-motion";


function Home() {
  const [gano, setGano] = useState("");
  const [palabra, setPalabra] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [letrasAdivinadas, setLetrasAdivinadas] = useState([]);
  const [respuestCompleta, setRespuestaCompleta] = useState("");
  const [contador, setContador] = useState(0);
  useEffect(() => {}, []);

  const buscarPalabra = () => {
    const indexPalabra = Math.floor(Math.random() * listaPalabras.length);
    const nuevaPalabra = listaPalabras[indexPalabra];
    setPalabra(nuevaPalabra);
    setLetrasAdivinadas(new Array(nuevaPalabra.length).fill(false)); 
  };

  const recorrerPalabra = () => {
  if (!inputValue || !palabra) return;

  const nuevaLetrasAdivinadas = [...letrasAdivinadas];
  let letraAdivinada = false;

  Array.from(palabra).forEach((letra, index) => {
    if (letra.toLowerCase() === inputValue.toLowerCase()) {
      nuevaLetrasAdivinadas[index] = true;
      letraAdivinada = true;
    }
  });

  if (!letraAdivinada) {
    const nuevoContador = contador + 1;
    setContador(nuevoContador);

    if (nuevoContador >= 5) {
      setGano(false);
    }
  }

  setLetrasAdivinadas(nuevaLetrasAdivinadas);
  setInputValue("");

  if (nuevaLetrasAdivinadas.every((letra) => letra)) {
    setGano(true);
  }
};

  const verificarRespuestaCompleta = () => {
    if (!palabra) return;

    setContador((prev) => prev + 1);

    if (contador + 1 >= 5) {
      setGano(false);
    }
    if (palabra.toLowerCase() == respuestCompleta.toLowerCase()) {
      setGano(true);
    }
    setContador(contador++);
  };

  const reset = () => {
    setGano("");
    // setPalabra("");
    setInputValue("");
    setLetrasAdivinadas([]);
    setRespuestaCompleta("");
    setContador(0);
    buscarPalabra();
  };

  return (
    <div className="main">
      <div class="main_contenedor">
        <div className="intentos_contenedor">
          <p className="intentos">Intento numero {contador}</p>
          <motion.button
          whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }} onClick={reset} className="intentos_boton">
            reset
          </motion.button>
        </div>

        <h2>Juego del ahorcado</h2>
        <p className="main_contenedor_p1">
          Adivina la palabra antes de que se te termine tus 5 intentos.
        </p>
        <div class="main_caja">
          <img
            src={`./img/ahorcado${contador}.png`}
            alt="imagen de contenedor"
          />
          <div class="main_letras">
            {palabra == "" ? (
              <>
                <p>a</p>
                <p>h</p>
                <p>o</p>
                <p>r</p>
                <p>c</p>
                <p>a</p>
                <p>d</p>
                <p>o</p>
              </>
            ) : (
              <>
                {Array.from(palabra).map((letra, index) => (
                  <div key={index} className="main_caja_letra">
                    <p className="main_contenedor_p2">
                      {letrasAdivinadas[index] ? letra : "_"}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="main_caja_boton">
          <input
            readOnly={contador >= 5}
            className="main_caja_boton_input"
            type="text"
            name="caracter"
            id="caracter"
            maxLength={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={contador >= 5 || gano == true}
            className="main_caja_boton_boton"
            onClick={recorrerPalabra}
          >
            verificar
          </button>
          <br />
          <div className="respuesta_contenedor">
            <input
              value={respuestCompleta}
              readOnly={contador === 5}
              className="respuesta"
              type="text"
              name="respuesta"
              id="respuesta"
              onChange={(e) => setRespuestaCompleta(e.target.value)}
            />
            <button
              disabled={contador >= 5 || gano == true}
              onClick={verificarRespuestaCompleta}
              className="respuesta_contenedor_button"
            >
              respuesta
            </button>
          </div>
          {gano === null || gano === "" ? (
            <></>
          ) : gano == true ? (
            <div className="main_caja_mensaje">
              <p>Congratulations, you are the winner!</p>
            </div>
          ) : (
            <div className="main_caja_mensaje">
              <p>You lose, try again! " {palabra} "</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

