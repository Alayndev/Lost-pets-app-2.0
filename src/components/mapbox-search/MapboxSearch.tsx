import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { petLngState, petLatState, setLSItem } from "hooks/useUserPets";

import { Alert } from "@mui/material";
import { useRecoilState } from "recoil";
import { getLocalStorageItem } from "hooks/useLocalStorage";
import { MapboxButton } from "ui/buttons";
import css from "./mapboxSearch.css";

// Función básica: Setiar lat y lng en LS/Atom para hacer llamadas a 2 endpoints con esos valores - HECHO
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYWxheW5kZXYiLCJhIjoiY2t6c3J1OWRuM3VzMTJvcXI1bWlqeXh2ciJ9.DmF6gsJAMsSyaFkLWatPfA",
});

type MapBoxSearchProps = {
  onChange?: (any) => any;
  lat?: number;
  lng?: number;
  loc?: string;
};

function MapboxSearch(props: MapBoxSearchProps) {
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

  const [petLng, setPetLgn] = useRecoilState(petLngState);
  const [petLat, setPetLat] = useRecoilState(petLatState);

  const [alert, setAlert] = useState(false);

  async function search() {
    const data = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        query +
        ".json?country=ar&types=place%2Caddress%2Clocality%2Cneighborhood%2Cregion%2Cdistrict&postcode%2Cpoi&autocomplete=true&fuzzyMatch=true&routing=true&access_token=" +
        "pk.eyJ1IjoiYWxheW5kZXYiLCJhIjoiY2t6c3J1OWRuM3VzMTJvcXI1bWlqeXh2ciJ9.DmF6gsJAMsSyaFkLWatPfA"
    ).then((r) => r.json());

    console.log(data.features[0], "data");

    // TODO: NO funciona con esta API limitada a Arg., hay que encontrar la manera de que si el user ingresa un lugar y Mapbox NO obtiene resultados, NO se rompa la page y le avise al user. Un alert() quizá o Swal libreria
    // if (data.error) {
    //   setAlert(true);
    // }

    const lon = parseFloat(data.features["0"]?.geometry.coordinates[0]);
    const lat = parseFloat(data.features["0"]?.geometry.coordinates[1]);
    const newCoords = [lon, lat];

    // Seteamos Lng y Lat en Atom/LS
    setCoords(newCoords);
    setPetLgn(lon);
    setPetLat(lat);
    setLSItem("petLng", lon);
    setLSItem("petLat", lat);

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
      <div className={css.inputAndButtonCont}>
        <input
          type="text"
          name="geoloc"
          onChange={inputChangeHandler}
          onKeyDown={keydownInputHandler}
          defaultValue={query}
          required
        />
        <div onClick={search}>
          <MapboxButton>Buscar</MapboxButton>
        </div>
      </div>
    </div>
  );
}

export { MapboxSearch };
