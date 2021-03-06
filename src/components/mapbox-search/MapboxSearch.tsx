import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { Alert } from "@mui/material";
import { useRecoilState } from "recoil";
import { MapboxButton } from "ui/buttons";
import css from "./mapboxSearch.css";
import { getLocalStorageItem } from "lib/localStorage";
import { petLatState, petLngState } from "lib/atoms";

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

  // ! De este modo el user NO necesariamente debe cambiar la ubicacion de la pet para editar la misma
  useEffect(() => {
    if (props.lat && props.lng) {
      setPetLgn(props.lng);
      setPetLat(props.lat);
    }
  }, []);

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

    // Seteamos Lng y Lat en Atom
    console.log(newCoords, "newCoords");

    setCoords(newCoords);
    setPetLgn(lon);
    setPetLat(lat);

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

  function keyPressInputHandler(e) {
    // si no es con form, tengo que agregar esto
    if (e.key == "Enter") {
      e.preventDefault();

      search();
    }
  }

  return (
    <>
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

      <label className={css.inputAndButtonCont}>
        <input
          type="text"
          name="geoloc"
          onChange={inputChangeHandler}
          onKeyPress={keyPressInputHandler}
          defaultValue={query}
          required
        />
        <div onClick={search}>
          <MapboxButton>Buscar</MapboxButton>
        </div>
      </label>
    </>
  );
}

export { MapboxSearch };
