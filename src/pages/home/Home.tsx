import React, { useState } from "react";
import css from "./home.css";
import { LocationButton } from "components/location-button/LocationButton";
import { PetCard } from "components/pet-card/PetCard";
import { getPetsAround } from "hooks/usePets";
import { useRecoilState } from "recoil";
import { petDataState } from "hooks/useUserPets";
import { useNavigate } from "react-router-dom";
import { getLocalStorageItem } from "hooks/useLocalStorage";
import Swal from "sweetalert2";
import { sendReport } from "hooks/useSendReport";
import withReactContent from "sweetalert2-react-content";

function Home() {
  const [showButton, setShowButton] = useState(true);

  const pets = getPetsAround();
  console.log(pets, "pets home");

  const handleClick = () => {
    setShowButton(false);
  };

  // Componentizar ModalReport
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleReportClick = (pet) => {
    const token = getLocalStorageItem("token");
    console.log(token, "token");

    if (!token) {
      navigate("/login", { replace: true });
    } else {
      // abrir modal al estar logeado el user
      console.log("Modal");

      const handleReportSubmit = async (e) => {
        e.preventDefault();
        console.log("Hola");

        // API
        const report = {
          petId: pet.objectID,
          petName: pet.fullName,
          fullName: e.target.name.value,
          phoneNumber: e.target.tel.value,
          report: e.target.report.value,
        };
        console.log(report, "report");

        try {
          const reportSent = await sendReport(report, token);

          console.log(reportSent);

          if (reportSent.error) {
            Swal.fire({
              icon: "error",
              text: `${reportSent.error}. ${report.fullName}, agredecemos la información que intenta brindar acerca de ${report.petName}, pero la misma ya ha sido reportada.`,
            });
          } else {
            Swal.fire({
              icon: "success",
              text: `${report.fullName}, muchas gracias por reportar información acerca de ${report.petName}. Se le envió un mail al dueñx con la información brindada, quizá sea contactado al teléfono brindado o puede contactar al dueñx vía email. Email del dueñx: ${reportSent.petAndOwner.user.email}.`,
            });
          }
        } catch (error) {
          console.error(error);
        }
      };

      MySwal.fire({
        title: <p>Reportar info de {pet.fullName}</p>,
        html: (
          <form onSubmit={handleReportSubmit}>
            <label className="report-pet__label">
              <span>TU NOMBRE</span>
              <input
                className="report-pet__input input is-large"
                type="text"
                name="name"
                required
              />
            </label>
            <label className="report-pet__label">
              <span>TU TELEFONO</span>
              <input
                className="report-pet__input input is-large"
                type="phone"
                name="tel"
                required
              />
            </label>
            <label className="report-pet__label">
              <span>¿DÓNDE LO VISTE?</span>
              <textarea
                className="report-pet__input textarea"
                name="report"
                required
              ></textarea>
            </label>

            <button> Enviar Reporte </button>
          </form>
        ),
        showDenyButton: true,
        showConfirmButton: false,
        denyButtonText: `Cancelar`,
      });
    }
  };

  return (
    <>
      {showButton ? (
        <div onClick={handleClick} className={css.homeContainer}>
          <LocationButton />
        </div>
      ) : null}

      <div className={css.mainContainer}>
        {!showButton ? (
          <>
            <h1>Mascotas perdidas cerca tuyo: {pets.length} </h1>
            <div className={css.petsContainer}>
              {pets.map((pet) => (
                // aca modal?
                <div
                  key={pet.objectID}
                  className="petContainer"
                  onClick={() => handleReportClick(pet)}
                >
                  <PetCard
                    key={pet.objectID}
                    picture={pet.pictureURL}
                    name={pet.fullName}
                    description={pet.description}
                    loc={pet.loc}
                    type={"Reportar"}
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export { Home };
