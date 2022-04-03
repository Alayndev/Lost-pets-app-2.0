import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { PrimaryButton } from "ui/buttons";
import { MapboxSearch } from "components/mapbox-search/MapboxSearch";
import { Dropzone } from "components/dropzone/Dropzone";
import { createPet, editPet, petFound } from "lib/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { petDataState, petLatState, petLngState } from "lib/atoms";
import css from "./petDataForm.css";
import { useDropzoneAtom } from "hooks/useDropzone";

// ! Dependiendo de si tenemos petData o no en el Atom State vamos a editar la pet (si tenemos id) o crear el report (si NO tenemos id)
function PetDataForm() {
  const [petData, setPetData] = useRecoilState(petDataState);
  console.log(petData, "petData Atom");

  const reportOrEdit = petData ? <span>Editar</span> : <span>Reportar</span>;

  const [formData, setFormData] = useState({});

  const [petLng, setPetLgn] = useRecoilState(petLngState);
  const [petLat, setPetLat] = useRecoilState(petLatState);
  console.log(petLng, petLat, "Hola");
  

  const [dropAtom, setDropAtom] = useDropzoneAtom();

  const navigate = useNavigate();

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
        lng: petLng,
        lat: petLat,
        dataURL: dropAtom.dropImage,
      };

      console.log(editPetData, "editPetData para la API");

      const res = await editPet(editPetData);

      console.log(res, "res editPet() en pet-data page");

      if (res) {
        Swal.fire({
          icon: "success",
          title: "Mascota editada correctamente",
        });

        navigate("/user-pets", { replace: true });

        setPetData(null);
        setDropAtom({ dropImage: null });
        setPetLat(null);
        setPetLgn(null);
      } else if (!res) {
        Swal.fire({
          icon: "error",
          title:
            "Su mascota NO ha sido actualizada. Por favor, ingrese la imagen de su mascota nuevamente",
        });
      }
    } else if (!petData) {
      // Reportar Pet
      console.log("REPORTAR");

      const createPetReport = {
        fullName,
        loc,
        description,
        lng: petLng,
        lat: petLat,
        dataURL: dropAtom.dropImage,
      };

      console.log(createPetReport, "createPetReport");

      const res = await createPet(createPetReport);

      console.log(res, "res createPet() en pet-data page 134");

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: res.success,
        });

        navigate("/user-pets", { replace: true });

        setDropAtom({ dropImage: null });
        setPetLat(null);
        setPetLgn(null);
      } else if (res.inputsIncompleted) {
        Swal.fire({
          icon: "error",
          title: res.inputsIncompleted,
        });
      } else if (res.error) {
        Swal.fire({
          icon: "error",
          title: res.error,
        });
      }
    }
  };

  const handleMapboxChange = (data) => {
    // voy agregando data al state interno del form
    setFormData({
      ...formData,
      mapbox: data,
    });

    console.log(formData, "formData");
  };

  // Flujo Cancelar o Reportar como encontrado:
  const formEl = useRef(null);

  const handleClick = async (e) => {
    e.preventDefault(); // Para que no suba al submit del form, submitHandler

    if (petData) {
      // Reportar como encontrado

      const res = await petFound(petData.id);
      console.log(res, "res");

      if (res) {
        Swal.fire({
          icon: "success",
          title: "Usted ha encontrado a su mascota! Felicitaciones!",
        });

        navigate("/user-pets", { replace: true });

        setPetData(null);
      } else if (!res) {
        Swal.fire({
          icon: "error",
          title: "Esta mascota ya ha sido reportada como encontrada",
        });
      }
    } else if (!petData) {
      // Cancelar
      formEl.current.reset();
    }
  };

  // Para que al apretar enter NO haga submit, sino que el submit lo decida con el button ya sea Editar o Reportar
  const keyPressInputHandler = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      <h1 className={css.title}>{reportOrEdit} mascota perdida</h1>

      <form
        ref={formEl}
        className="pet-data form card"
        onSubmit={submitHandler}
      >
        <div className={css.subContainer}>
          <label className="label">
            <div>NOMBRE: </div>
            <input
              defaultValue={petData?.fullName}
              type="text"
              name="name"
              className="is-success"
              onKeyPress={keyPressInputHandler}
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
              onKeyPress={keyPressInputHandler}
              required
            />
          </label>

          <p className={css.subtitle}>
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

        <div className={css.subContainer}>
          <span>UBICACION</span>
          <p className={css.subtitle}>
            BUSCÁ UN PUNTO DE REFERENCIA PARA REPORTAR A TU MASCOTA. PUEDE SER
            UNA DIRECCIÓN, UN BARRIO O UNA CIUDAD
          </p>

          {/* MapBox */}
          <MapboxSearch
            lat={petData?.lat}
            lng={petData?.lng}
            loc={petData?.loc}
            onChange={handleMapboxChange}
          />

          <div className="submit">
            <PrimaryButton>{reportOrEdit}</PrimaryButton>
          </div>

          <div onClick={handleClick}>
            <PrimaryButton>
              {petData ? "Reportar como encontrado" : "Cancelar"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </>
  );
}

export { PetDataForm };
