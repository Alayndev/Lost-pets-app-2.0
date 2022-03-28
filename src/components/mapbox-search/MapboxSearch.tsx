import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { petLngLatState, setLSItem } from "hooks/useUserPets";

import { Alert } from "@mui/material";
import { useRecoilState } from "recoil";
import { getLocalStorageItem } from "hooks/useLocalStorage";

// Función básica: Setiar lat y lng en LS/Atom para hacer llamadas a 2 endpoints con esos valores - HECHO
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYWxheW5kZXYiLCJhIjoiY2t6c3J1OWRuM3VzMTJvcXI1bWlqeXh2ciJ9.DmF6gsJAMsSyaFkLWatPfA",
});

const boxStyles = {
  padding: 10,
  fontSize: 20,
};

type MapBoxSearchProps = {
  onChange?: (any) => any;
  lat?: number;
  lng?: number;
  loc?: string;
};

function MapboxSeach(props: MapBoxSearchProps) {
  const { onChange } = props;

  const [query, setQuery] = useState(props.loc);

  // Luego de que cumpla su función básica
  // TODO: Agrandar/Cambiar marcador --> https://www.youtube.com/watch?v=qWs-dJrRIXw
  // TODO: Pet a Editar con marcador

  const userLoc = getLocalStorageItem("userLoc");
  console.log(userLoc, "userLoc");

  const userLocOrBA = userLoc ? userLoc : [-58.4370894, -34.6075682];

  // Inicializamos el mapa con la ubicacion de la Pet si es para Editar o con la ubicacion del User si nos la dio si es para Reportar
  const initialCoordsValues =
    props.lat && props.lng ? [props.lng, props.lat] : userLocOrBA;

  console.log(initialCoordsValues, "initialCoordsValues");

  const initialCoords: any = initialCoordsValues;
  const [coords, setCoords] = useState(initialCoords);

  const [petLngLat, setPetLgnLat] = useRecoilState(petLngLatState);

  const [alert, setAlert] = useState(false);

  async function search() {
    const data = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=pk.bf4604bc2b3ea328e732de26a4387fa9&q=${query}&format=json`
    ).then((r) => r.json());
    console.log(data, "data");

    if (data.error) {
      setAlert(true);
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    const newCoords = [lon, lat];

    // Seteamos Lng y Lat en Atom/LS
    setCoords(newCoords);
    setPetLgnLat(newCoords);
    setLSItem("petLngLat", newCoords);

    // lo "tiro" hacia arriba para que reciban las coordenadas desde "afuera"
    if (onChange) {
      onChange({
        query: query,
        coords: newCoords,
      });
    }
  }

  function inputChangeHandler(e) {
    setAlert(false);
    setQuery(e.target.value);
  }

  function keydownInputHandler(e) {
    // si no es con form, tengo que agregar esto
    if (e.key == "Enter") {
      search();
    }
  }

  return (
    <div>
      {alert ? (
        <Alert severity="error"> El sitio ingresado NO existe </Alert>
      ) : null}

      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "300px",
          width: "300px",
          margin: "100px",
        }}
        zoom={[13]}
        center={coords}
        movingMethod="easeTo"
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={coords} />
        </Layer>
      </Map>
      <div>
        <input
          type="text"
          onChange={inputChangeHandler}
          onKeyDown={keydownInputHandler}
          defaultValue={query}
          style={boxStyles}
        />
        <button style={boxStyles} onClick={search}>
          Buscar
        </button>
      </div>
    </div>
  );
}

export { MapboxSeach };
