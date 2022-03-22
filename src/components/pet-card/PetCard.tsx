import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import css from "./petCard.css";

type PetCardProps = {
  picture: string;
  name: string;
  description: string;
  loc: string;
};

function PetCard(props: PetCardProps) {
  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={props.picture}
          alt="pet-image"
        />

        <CardContent className={css.cardContent}>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>

          <Typography gutterBottom variant="subtitle1" component="div">
            {props.loc}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Button size="small" color="primary">
          Reportar información
        </Button>
      </CardActions>
    </Card>
  );
}

export { PetCard };
