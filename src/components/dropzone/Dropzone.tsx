import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneButton } from "ui/buttons";
import { useDropzoneAtom } from "hooks/useDropzone";
import { setLSItem } from "hooks/useUserPets";

const styleBox: any = {
  width: "333px",
  height: "auto",
  padding: "5px",
  border: "2px dashed #ccc",
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
};

type dropProps = {
  initPreview?: string;
};

export function Dropzone(props: dropProps) {
  const { initPreview } = props;

  console.log(props, "props Dropzone");

  const [preview, setPreview]: any = useState(
    initPreview
      ? initPreview
      : "https://lost-pet-finder-app.herokuapp.com/no-img.09beee79.png"
  );
  const [dropAtom, setDropAtom] = useDropzoneAtom();

  const { getRootProps, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    onDrop: (acceptedFiles) => {
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        console.log(e.target.result, "dataURL Dropzone");

        // Actualizamos la view para que el user vea la imagen elegida
        setPreview(e.target.result);

        // Guardarmos la dataURL en Atom/LS
        setLSItem("dataURL", e.target.result);
        setDropAtom({ dropImage: e.target.result });
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  return (
    <div {...getRootProps()}>
      <img src={preview} style={styleBox} onClick={open} />

      <div onClick={open}>
        <DropzoneButton>Agregar/cambiar imagen</DropzoneButton>
      </div>
    </div>
  );
}
