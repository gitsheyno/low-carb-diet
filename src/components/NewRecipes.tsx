import { Link, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Spinner from "./Spinner";
import fetchSearch from "../utils/fetchSearch";

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

  if (queryData.isFetching) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Spinner />
      </div>
    );
  }

  const response = queryData?.data ?? [];

  return (
    <>
      {response.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 w-full">
          {response.map((item) => (
            <Card
              key={item.id}
              className="flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <Link
                to={`/dashboard/${user}/recipe/${item.id}`}
                className="flex flex-col flex-1 no-underline text-inherit"
              >
                <div className="relative w-full pb-[66%] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-4">
                  <h3 className="text-base font-semibold mb-3 overflow-hidden text-ellipsis line-clamp-2 h-10">
                    {item.name}
                  </h3>

                  <div className="flex justify-between items-center mt-2 bg-gray-50 rounded-md p-2">
                    <div className="text-center px-1">
                      <span className="text-xs text-gray-500 block">Cal</span>
                      <span className="text-sm font-medium">
                        {item.nutrients.caloriesKCal}
                      </span>
                    </div>
                    <div className="text-center px-1">
                      <span className="text-xs text-gray-500 block">
                        Protein
                      </span>
                      <span className="text-sm font-medium">
                        {item.nutrients.protein}g
                      </span>
                    </div>

                    <div className="text-center px-1">
                      <span className="text-xs text-gray-500 block">Carbs</span>
                      <span className="text-sm font-medium">
                        {item.nutrients.totalCarbs}g
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4 pt-0">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  to={`/dashboard/${user}/recipe/${item.id}`}
                >
                  View Recipe
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <h3 className="text-lg font-medium">No recipes found</h3>
          <p className="text-sm text-gray-500 mt-2">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </>
  );
}
