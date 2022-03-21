import React from "react";
import css from "./item.css";

type ItemProps = {
  title: string;
  price: number;
  pictures: any;
  link: string;
  warranty: string;
};

function Item(props: ItemProps) {
  console.log("render Item");

  const pictures =
    props.pictures.length > 10 ? props.pictures.slice(0, 13) : props.pictures;

  return (
    <>
      <div className={css.card}>
        <div className={css.card__data}>
          <h4 className={css["result-item-title"]}>Título: {props.title}</h4>

          <p className={css["result-item-sold-quantity"]}>
            <span>{props.warranty ? props.warranty : "Sin garantía"}</span>
          </p>

          <p className={css["result-item-price"]}>Precio: ${props.price}</p>

          <p className={css["result-item-stock"]}>
            <a href={props.link} target="_blank">
              Ver
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export { Item };
