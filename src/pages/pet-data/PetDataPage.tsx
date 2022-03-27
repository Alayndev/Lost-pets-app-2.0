import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { petDataState } from "hooks/useUserPets";
import { PrimaryButton } from "ui/buttons";
import { MapboxSeach } from "components/mapbox-search/MapboxSearch";

// Dependiendo de si tenemos petData o no en localStorage vamos a editar la pet (si tenemos id) o crear el report (si NO tenemos id)
function PetDataPage() {
  // petData
  const [petData, setPetData] = useRecoilState(petDataState);
  console.log(petData, "petData Atom");

  const reportOrEdit = petData ? <span>Editar</span> : <span>Reportar</span>;

  // Biolerplate APX Mapbox
  const [formData, setFormData] = useState({});
  function submitHandler(e) {
    e.preventDefault();
    const allData = {
      formData,
      texto: e.target.geoloc.value,
    };
    console.log(allData, "allData");
  }

  function handleMapboxChange(data) {
    // voy agregando data al state interno del form
    setFormData({
      ...formData,
      mapbox: data,
    });

    console.log(formData, "formData");
  }
  return (
    <>
      <h1>{reportOrEdit} mascota perdida</h1>

      <form className="pet-data form card" onSubmit={submitHandler}>
        {/* Dropzone */}
        <div className="sub-container">
          <label className="label">
            <div>NOMBRE: </div>
            <input
              defaultValue={petData?.fullName}
              type="text"
              name="name"
              className="is-success"
            />
          </label>

          <label className="label">
            <div> DESCRIPCIÓN: </div>
            <input
              defaultValue={petData?.description}
              type="text"
              name="description"
              className="is-success"
            />
          </label>

          <label className="label" id="img">
            {/* Dropzone */}
            <span className="imgURL">
              <img
                className="imgUrlPet pet-card__img"
                style={{ width: "335px", height: "335px" }}
                src={petData?.pictureURL}
              />
            </span>

            <br />
            <p className="subtitle">
              Imagen hasta 60kB. Haga click arriba para seleccionar la imagen.
            </p>
            <p className="subtitle">
              Si su imagen es más pesada, asegúrese de achicarla, de otro modo
              el reporte NO se realizará. Hágalo en segundos con <span> </span>
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
          <MapboxSeach
            lat={petData?.lat}
            lng={petData?.lng}
            loc={petData?.loc}
            onChange={handleMapboxChange}
          />

          <input type="text" name="geoloc" className="search-geoloc" />

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
