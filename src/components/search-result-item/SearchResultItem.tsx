import React from "react";
import { Link } from "react-router-dom";
import css from "./searchResultItem.css";

type SearchResultItemProps = {
  id: string;
  title: string;
  price: number;
  img: string;
  link: string;
  stock: number;
  sold: number;
  condition: string;
};

function SearchResultItem(props: SearchResultItemProps) {
  console.log("render SearchResultItem");

  return (
    <>
      <Link
        className={css["result-item__main-container"]}
        to={"/item/" + props.id}
      >
        <div className={css["result-item"]}>
          <img src={props.img} alt="item" className={css["result-item-img"]} />
          <div className={css["result-item-subcontainer-content"]}>
            <h4 className={css["result-item-title"]}>Título: {props.title}</h4>
            <p className={props.condition == "new" ? css.new : css.used}>
              {props.condition === "new" ? "Nuevo" : "Usado"}
            </p>
            <p className={css["result-item-sold-quantity"]}>
              Vendidos: <span>{props.sold}</span>
            </p>
          </div>
          <div className={css["result-item-subcontainer-price-stock"]}>
            <div className={css["result-item-price"]}>
              Precio: ${props.price}
            </div>
            <p className={css["result-item-stock"]}>
              Stock: <span> {props.stock} </span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
}

export { SearchResultItem };
