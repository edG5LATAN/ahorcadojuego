import React from "react";
import "./Mas.css";

function Mas() {
  return (
    <div className="mas_contenedor">
      <div className="mas_contenedor_caja">
        <img src="" alt="" />
        <h2>proyecto de juegos</h2>
        <p>
          Bienvenido a mi juego del ahorcado donde te mostraré una palabra al
          azar y tendrás que adivinarla antes de que se te agoten los 5 intentos
          y finalice el juego. También te doy la opción para que puedas escribir
          la palabra correcta si la conoces y ganar antes de agotar los
          intentos.
          <br />
          <br />
          Tambien te dejo mi <a className="mas_contenedor_a" href="https://proyectos-creados.vercel.app/">Proyecto Juegos</a>
          <br />
          <br />
          Juegos online donde te muestro una página web con los mejores juegos
          online que he desarrollado en mi camino como programador full stack.
          Te presento tanto aplicaciones web como mis proyectos de desarrollo,
          como por ejemplo una aplicación del clima...
          <br />
          <br />
          En este proyecto también aprovecho a mostrarte algunos proyectos
          backend que he implementado en mis trabajos, algunos desplegados
          online y otros disponibles solo en videos de YouTube.
        </p>
      </div>
    </div>
  );
}

export default Mas;
