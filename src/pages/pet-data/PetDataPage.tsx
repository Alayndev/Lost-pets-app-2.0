import React from "react";
import { useRecoilState } from "recoil";
import { petDataState } from "hooks/useUserPets";
import { getLocalStorageItem, useLocalStorage } from "hooks/useLocalStorage";
import { PrimaryButton } from "ui/buttons";

// Dependiendo de si tenemos petData o no en localStorage vamos a editar la pet (si tenemos id) o crear el report (si NO tenemos id)
function PetDataPage() {
  // petData
  const [petData, setPetData] = useRecoilState(petDataState);
  console.log(petData, "petData Atom"); // Ya tengo la pet data y me ahorro una llamada a la API, llenar formulario con estos datos (nombre, descripcion, imagen)

  const reportOrEdit = petData ? <span>Editar</span> : <span>Reportar</span>;

  return (
    <>
      <h1>{reportOrEdit} mascota perdida</h1>

      <form className="pet-data form card">
        {/* Dropzone */}
        <div className="sub-container">
          <label className="label">
            <div>NOMBRE: </div>
            <input type="text" name="name" className="is-success" required />
          </label>

          <label className="label">
            <div> DESCRIPCIÓN: </div>
            <input type="text" name="description" className="is-success" />
          </label>

          <label className="label" id="img">
            {/* Dropzone */}
            <span className="imgURL">
              <img className="imgUrlPet pet-card__img" />
            </span>

            <br />
            <p className="subtitle">
              Imagen hasta 60kB. Haga click arriba para seleccionar la imagen.
            </p>
            <p className="subtitle">
              Si su imagen es más pesada, asegúrese de achicarla, de otro modo
              el reporte NO se realizará. Hágalo en segundos con
              <a href="https://www.achicarimagenes.com.ar/" target="_blank">
                esta web
              </a>
            </p>
            <div id="buttonImg">
              <PrimaryButton> Agregar/Modificar foto</PrimaryButton>
            </div>
          </label>
        </div>

        {/* MapBox */}
        <label className="label sub-container">
          <span>UBICACION</span>
          <p className="subtitle">
            BUSCÁ UN PUNTO DE REFERENCIA PARA REPORTAR A TU MASCOTA. PUEDE SER
            UNA DIRECCIÓN, UN BARRIO O UNA CIUDAD
          </p>

          {/* MapBox */}
          <div
            id="map"
            style={{ width: "335px", height: "335px", background: "blue" }}
          ></div>
          <input type="text" name="geoloc" className="search-geoloc" required />

          <span className="loader-container"> </span>

          <div className="submit">
            <PrimaryButton>{reportOrEdit}</PrimaryButton>
          </div>

          <div className={petData ? "finded" : "cancel"}>
            <PrimaryButton>
              {petData ? "Reportar como encontrado" : "Cancelar"}
            </PrimaryButton>
          </div>
        </label>
      </form>
    </>
  );
}

export { PetDataPage };
