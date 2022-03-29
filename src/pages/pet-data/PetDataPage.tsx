import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { petDataState } from "hooks/useUserPets";
import { PrimaryButton } from "ui/buttons";
import { MapboxSeach } from "components/mapbox-search/MapboxSearch";
import { Dropzone } from "components/dropzone/Dropzone";
import { createPet, editPet } from "hooks/useEditOrReportPet";
import { Alert } from "@mui/material";

// * Probar funcionamiento de la page y ver que falta. Comparar con dwf-m7

// Dependiendo de si tenemos petData o no en localStorage vamos a editar la pet (si tenemos id) o crear el report (si NO tenemos id)
function PetDataPage() {
  const [petData, setPetData] = useRecoilState(petDataState);
  console.log(petData, "petData Atom");

  const reportOrEdit = petData ? <span>Editar</span> : <span>Reportar</span>;

  // Componentizar en  PetDataPageForm, de acá hacia abajo
  const [formData, setFormData] = useState({});

  // Swal
  const [petEdited, setPetEdited] = useState(false);
  const [petEditedError, setPetEditedError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const allData = {
      formData,
      texto: e.target.geoloc.value,
    };
    console.log(allData, "allData");

    // API
    const fullName: string = e.target.name.value;
    const loc: string = e.target.geoloc.value;
    const description: string = e.target.description.value;

    if (petData) {
      // Editar Pet
      console.log("Editar");

      const editPetData = {
        id: petData.id,
        fullName,
        loc,
        description,
      };

      console.log(editPetData, "editPetData para la API");

      const res = await editPet(editPetData);

      console.log(res, "res editPet() en pet-data page");

      // Swal
      if (res) {
        setPetEdited(true);
        setPetData(null); // Vuelvo a null para poder editar una pet y luego reportar una nueva pet
      } else if (!res) {
        setPetEditedError(true);
      }
    } else if (!petData) {
      // Reportar Pet
      console.log("REPORTAR");

      const createPetReport = {
        fullName,
        loc,
        description,
      };

      const res = await createPet(createPetReport);

      console.log(res, "res createPet() en pet-data page 134");

      // Swal para no llenar de ternarios
      if (res) {
        console.log(
          "Su mascota ha sido reportada correctamente. Este atento a su casilla de correo, inclusive al spam, ya que por allí le llegarán los reportes de su mascota."
        );
      } else if (!res) {
        console.log(
          "El user tiene que completar todos los campos O el reporte YA EXISTE"
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
