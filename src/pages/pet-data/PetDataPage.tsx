import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { petDataState } from "hooks/useUserPets";
import { PrimaryButton } from "ui/buttons";
import { MapboxSeach } from "components/mapbox-search/MapboxSearch";
import { Dropzone } from "components/dropzone/Dropzone";
import { createPet, editPet } from "hooks/useEditOrReportPet";
import { Alert } from "@mui/material";

// Dependiendo de si tenemos petData o no en localStorage vamos a editar la pet (si tenemos id) o crear el report (si NO tenemos id)
function PetDataPage() {
  const [petData, setPetData] = useRecoilState(petDataState);
  console.log(petData, "petData Atom");

  const reportOrEdit = petData ? <span>Editar</span> : <span>Reportar</span>;

  const [formData, setFormData] = useState({});

  const [petEdited, setPetEdited] = useState(false);
  const [petEditedError, setPetEditedError] = useState(false);

  // ! Problema: Toma el submit de Mapbox - Cambio la imagen de Dropzone y tambien toma el submit. Dropzone ademas se abre dos veces si haces click, una cagada. USAR BUTTON AGREGAR/EDITAR. Además al buscar con Mapbox (button o enter) se abre Dropzone
  const submitHandler = async (e) => {
    e.preventDefault();
    const allData = {
      formData,
      texto: e.target.geoloc.value,
    };
    console.log(allData, "allData");

    // API
    if (petData) {
      // Editar Pet
      console.log("Editar");

      const editPetData = {
        id: petData.id,
        fullName: e.target.name.value,
        loc: e.target.geoloc.value,
        description: e.target.description.value,
      };

      console.log(editPetData, "editPetData para la API");

      const res = await editPet(editPetData);

      console.log(res, "res editPet() en pet-data page");

      if (res) {
        setPetEdited(true);
      } else if (!res) {
        setPetEditedError(true);
      }
    } else if (!petData) {
      // Reportar Pet
      console.log("REPORTAR");

      const createPetReport = {
        fullName: e.target.name.value,
        loc: e.target.geoloc.value,
        description: e.target.description.value,
      };

      const res = await createPet(createPetReport);

      console.log(res, "res createPet() en pet-data page 134");

      if (res.petCreated === false) {
        console.log(
          "Este reporte ya existe. Asegúrese de completar los campos correctamente."
        );
      } else {
        console.log(
          "Su mascota ha sido reportada correctamente. Este atento a su casilla de correo, inclusive al spam, ya que por allí le llegarán los reportes de su mascota."
        );
      }
    }
  };

  const handleMapboxChange = (data) => {
    setPetEditedError(false);

    // voy agregando data al state interno del form
    setFormData({
      ...formData,
      mapbox: data,
    });

    console.log(formData, "formData");
  };

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
              required
            />
          </label>

          <label className="label">
            <div> DESCRIPCIÓN: </div>
            <input
              defaultValue={petData?.description}
              type="text"
              name="description"
              className="is-success"
              required
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

          <span className="loader-container"> </span>

          {petEdited ? (
            <Alert severity="success"> Mascota editada correctamente </Alert>
          ) : null}

          {petEditedError ? (
            <Alert severity="error">
              Su mascota NO ha sido actualizada. Por favor, intente nuevamente
            </Alert>
          ) : null}

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
