import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Spinner from "./Spinner";
import fetchSearch from "../utils/fetchSearch";
import sty from "../components/Dashboard.module.css";
import styles from "./Cards.module.css";

export default function NewRecipes() {
  const [searchParams] = useSearchParams();
  const { user } = useParams();
  const queryData = useQuery({
    queryKey: [
      "search",
      searchParams.get("q") as string,
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchSearch,
  });

  if (queryData.isLoading) {
    return <Spinner />;
  }

  const response = queryData?.data ?? [];
  console.log(response);

  return (
    <>
      {response ? (
        <div className={sty.recipesContainer}>
          {response.map((item) => (
            <Card key={item.id}>
              <CardActionArea
                component={Link}
                to={`/dashboard/${user}/recipe/${item.id}`}
                className={styles.img}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={item.image}
                  alt={item.name}
                  className={styles.img}
                />
                <CardContent>
                  <Typography gutterBottom component="div">
                    <p>{item.name}</p>
                  </Typography>
                  <div className={styles.infoContainer}>
                    <div className={styles.cardInfos}>
                      <div>
                        <p>Cal</p>
                        <p>{item.nutrients.caloriesKCal}</p>
                      </div>
                      <div>
                        <p>Protein</p>
                        <p>{item.nutrients.protein}</p>
                      </div>
                      <div>
                        <p>Fats</p>
                        <p>{item.nutrients.fat}</p>
                      </div>
                      <div>
                        <p>Carbs</p>
                        <p>{item.nutrients.totalCarbs}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CardActionArea>
              <Button>View Recipe</Button>
            </Card>
          ))}
        </div>
      ) : (
        <p>no</p>
      )}
    </>
  );
}
