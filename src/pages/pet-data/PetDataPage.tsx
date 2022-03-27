import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { petDataState } from "hooks/useUserPets";
import { PrimaryButton } from "ui/buttons";
import { MapboxSeach } from "components/mapbox-search/MapboxSearch";
import { Dropzone } from "components/dropzone/Dropzone";

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

  // Situacion Actual: ya tengo en Atom/LS dataURL (Dropzone) y petLngLat (Mapbox). Ahora hacer llamdas a la API dependiendo si voy a Editar o Reportar (esto en submitHandler). if(petData) { Editar } else { Reportar }. Guiarme con MyDataForm.tsx

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

          <p className="subtitle">
            La imagen debe pesar hasta 60kB. Si su imagen es más pesada,
            asegúrese de achicarla, de otro modo el reporte NO se realizará.
            Hágalo en segundos con <span> </span>
            <a href="https://www.achicarimagenes.com.ar/" target="_blank">
              esta web
            </a>
          </p>
          <label className="label" id="img">
            {/* Dropzone */}

            <Dropzone initPreview={petData?.pictureURL} />
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
