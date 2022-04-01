import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import css from "./reportModal.css";
import { PrimaryButton } from "ui/buttons";
import { sendReport } from "lib/api";
import { getLocalStorageItem } from "lib/localStorage";

function ReportModal({ pet, children }) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleReportClick = (pet) => {
    const token = getLocalStorageItem("token");
    console.log(token, "token");

    if (!token) {
      navigate("/login", { replace: true });
    } else {
      // abrir modal al estar logeado el user

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
        title: (
          <p className={css.title}>Reportar información sobre {pet.fullName}</p>
        ),
        width: "345px",
        position: "center",
        html: (
          <form
            onSubmit={handleReportSubmit}
            className={css["report-pet__form"]}
          >
            <label className={css["report-pet__label"]}>
              <span>TU NOMBRE</span>
              <input
                className={css["report-pet__input"]}
                type="text"
                name="name"
                required
              />
            </label>
            <label className={css["report-pet__label"]}>
              <span>TU TELEFONO</span>
              <input
                className={css["report-pet__input"]}
                type="phone"
                name="tel"
                required
              />
            </label>
            <label className={css["report-pet__label"]}>
              <span>¿DÓNDE LO VISTE?</span>
              <textarea
                className={css["report-pet__input"]}
                name="report"
                required
              ></textarea>
            </label>

            <PrimaryButton> Enviar Reporte </PrimaryButton>
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
      <div className="petContainer" onClick={() => handleReportClick(pet)}>
        {children}
      </div>
    </>
  );
}
export { ReportModal };
