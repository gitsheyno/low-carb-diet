import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchSingleRecipe from "../utils/fetchSingleRecipe";
import Steps from "../components/Steps";
import Ingredients from "../components/Ingredients";
import Descriptions from "../components/Descriptions";
import Spinner from "./Spinner";

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();

  const queryData = useQuery({
    queryKey: [
      "searchSingleRecipe",
      id as string,
      localStorage.getItem("token") as string,
    ],
    queryFn: fetchSingleRecipe,
  });

  const response = queryData?.data;

  if (queryData.isFetching) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Spinner />
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-lg text-gray-600">Recipe not found</p>
      </div>
    );
  }

  const totalTime = response.prepareTime + response.cookTime;

  return (
    <div className="bg-white min-h-screen">
      <div className="w-full h-64 md:h-80 lg:h-96 relative">
        <img
          src={response.image}
          alt={response.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 md:-mt-20 lg:-mt-24 relative z-10">
        <div className="bg-white rounded-t-3xl shadow-xl p-4 sm:p-6 lg:p-10">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {response.name}
            </h1>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-6 items-center text-xs sm:text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-1 sm:mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
                <span>Total: {totalTime} min</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-1 sm:mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5.25C8 4.56 8.56 4 9.25 4h5.5c.69 0 1.25.56 1.25 1.25v1.5C16 7.44 15.44 8 14.75 8h-5.5C8.56 8 8 7.44 8 6.75v-1.5zM12 12a2 2 0 100-4 2 2 0 000 4z M9.5 14h5c2.21 0 4 1.79 4 4v.5h-13V18c0-2.21 1.79-4 4-4z" />
                </svg>
                <span>Prep: {response.prepareTime} min</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-1 sm:mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.75 1.75a.75.75 0 0 0-1.5 0V4h-3A3.75 3.75 0 0 0 4.5 7.75v3a3.75 3.75 0 0 0 3.75 3.75H9v6.75a.75.75 0 0 0 1.5 0V14.5h3a3.75 3.75 0 0 0 3.75-3.75v-3A3.75 3.75 0 0 0 13.5 4h-3V1.75z" />
                </svg>
                <span>Cook: {response.cookTime} min</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-1 sm:mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.5 1.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zM12.5 18.5c-4.14 0-7.5-3.36-7.5-7.5s3.36-7.5 7.5-7.5 7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z M16 11h-2.5V8.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V11h-2.5c-.28 0-.5.22-.5.5s.22.5.5.5H13v2.5c0 .28.22.5.5.5s.5-.22.5-.5V12h2.5c.28 0 .5-.22.5-.5s-.22-.5-.5-.5z" />
                </svg>
                <span>{response.nutrients.caloriesKCal.toFixed()} cal</span>
              </div>
            </div>

            {/* Action buttons - improved for small screens */}
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mb-6 lg:mb-8">
              <a
                href="#recipe"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.25 4.5l-7.5 7.5 7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
                Jump to Recipe
              </a>
              <button className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition text-sm sm:text-base">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0z" />
                </svg>
                Save Recipe
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-8 lg:space-y-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 lg:mb-4">
                  About This Recipe
                </h2>
                <div className="prose max-w-none text-sm sm:text-base">
                  <Descriptions data={response.description} />
                </div>
              </div>

              <div id="recipe">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 lg:mb-4 flex items-center">
                  <span className="bg-orange-100 text-orange-500 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.25 5.337c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.036 1.007-1.875 2.25-1.875S15 2.34 15 3.375c0 .369-.128.713-.349 1.003-.215.283-.401.604-.401.959 0 .332.278.598.61.578 1.91-.114 3.79-.342 5.632-.676a.75.75 0 0 1 .878.645 49.17 49.17 0 0 1 .376 5.452.657.657 0 0 1-.66.664c-.354 0-.675-.186-.958-.401a1.647 1.647 0 0 0-1.003-.349c-1.035 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401.31 0 .557.262.534.571a48.774 48.774 0 0 1-.595 4.845.75.75 0 0 1-.61.61c-1.82.317-3.673.533-5.555.642a.58.58 0 0 1-.611-.581c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.035-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959a.641.641 0 0 1-.658.643 49.118 49.118 0 0 1-4.708-.36.75.75 0 0 1-.645-.878c.293-1.614.504-3.257.629-4.924A.53.53 0 0 1 5.337 15c.355 0 .676.186.959.401.29.221.634.349 1.003.349 1.036 0 1.875-1.007 1.875-2.25S8.336 11.25 7.3 11.25c-.369 0-.713.128-1.003.349-.283.215-.604.401-.959.401a.656.656 0 0 1-.658-.663 49.03 49.03 0 0 1 .31-4.82.75.75 0 0 1 .878-.643c1.515.263 3.062.45 4.636.55a.55.55 0 0 0 .546-.547Z" />
                    </svg>
                  </span>
                  Ingredients
                </h2>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                  <Ingredients data={response.ingredients} />
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 lg:mb-4 flex items-center">
                  <span className="bg-orange-100 text-orange-500 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Preparation Steps
                </h2>
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                  <Steps data={response.steps} />
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:sticky lg:top-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 flex items-center">
                  <span className="bg-orange-100 text-orange-500 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z M11 6h2v8h-2z M11 16h2v2h-2z" />
                    </svg>
                  </span>
                  Nutrition Facts
                </h3>

                <div className="space-y-1 text-sm sm:text-base">
                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-base sm:text-lg text-gray-900">
                      Calories
                    </h4>
                    <span className="text-base sm:text-lg font-bold text-orange-500">
                      {response.nutrients.caloriesKCal.toFixed()} kcal
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <h4 className="text-gray-700">Protein</h4>
                    <span className="font-medium">
                      {response.nutrients.protein.toFixed()} g
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <h4 className="text-gray-700">Fats</h4>
                    <span className="font-medium">
                      {response.nutrients.fat.toFixed()} g
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <h4 className="text-gray-700">Fiber</h4>
                    <span className="font-medium">
                      {response.nutrients.fiber.toFixed()} g
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <h4 className="text-gray-700">Sugar</h4>
                    <span className="font-medium">
                      {response.nutrients.sugar.toFixed()} g
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200">
                    <h4 className="text-gray-700">Vitamin A</h4>
                    <span className="font-medium">
                      {response.nutrients.vitaminA.toFixed()} g
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 sm:py-3">
                    <h4 className="text-gray-700">Calcium</h4>
                    <span className="font-medium">
                      {response.nutrients.calcium.toFixed()} g
                    </span>
                  </div>
                </div>

                {/* Time summary */}
                <div className="mt-6 sm:mt-8 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-800 mb-2 sm:mb-3">
                    Time Breakdown
                  </h4>

                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400 mr-2"></div>
                    <span className="text-gray-700 text-xs sm:text-sm">
                      Prep Time: {response.prepareTime} minutes
                    </span>
                  </div>

                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                    <span className="text-gray-700 text-xs sm:text-sm">
                      Cook Time: {response.cookTime} minutes
                    </span>
                  </div>

                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-gray-700 text-xs sm:text-sm">
                      Total Time: {totalTime} minutes
                    </span>
                  </div>
                </div>

                {/* Share buttons */}
                <div className="mt-6 sm:mt-8">
                  <h4 className="font-medium text-gray-800 mb-2 sm:mb-3">
                    Share This Recipe
                  </h4>
                  <div className="flex space-x-2">
                    <button className="p-1.5 sm:p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </button>
                    <button className="p-1.5 sm:p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.117 10.117 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                      </svg>
                    </button>
                    <button className="p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.5 19.5a.5.5 0 0 1-.5.5H8a.5.5 0 0 1-.5-.5v-12A.5.5 0 0 1 8 7h8a.5.5 0 0 1 .5.5v12z M7.5 6A1.5 1.5 0 0 1 9 4.5h6A1.5 1.5 0 0 1 16.5 6 1.5 1.5 0 0 1 15 7.5H9A1.5 1.5 0 0 1 7.5 6z" />
                      </svg>
                    </button>
                    <button className="p-1.5 sm:p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </button>
                    <button className="p-1.5 sm:p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0a12 12 0 00-12 12 12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm0 4.5c2.69 0 3.01.01 4.07.06 2.97.13 4.36 1.53 4.5 4.5.05 1.06.06 1.38.06 4.07 0 2.69-.01 3.01-.06 4.07-.13 2.97-1.53 4.36-4.5 4.5-1.06.05-1.38.06-4.07.06-2.69 0-3.01-.01-4.07-.06-2.97-.13-4.36-1.53-4.5-4.5-.05-1.06-.06-1.38-.06-4.07 0-2.69.01-3.01.06-4.07 0-2.69.01-3.01.06-4.07.13-2.97 1.53-4.36 4.5-4.5 1.06-.05 1.38-.06 4.07-.06zm0 6.75a.75.75 0 11-1.5 0v-4.5a.75.75 0 111.5 0v4.5zm0 6a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
