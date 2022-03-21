import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "ui/buttons";
import { TextField } from "ui/text-field";
import css from "./searchForm.css";

function SearchForm() {
  console.log("render SearchForm");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = e.target.product.value;
    console.log(product, "product submit");

    navigate("/search/" + product, { replace: true });
  };

  return (
    <>
      <form className={css["search-form"]} onSubmit={handleSubmit}>
        <TextField
          name="product"
          type="text"
          placeholder=" Buscar productos, marcas y más..."
        ></TextField>

        <Button>BUSCAR</Button>
      </form>
    </>
  );
}

export { SearchForm };
