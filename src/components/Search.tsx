import searchStyle from "../components/Search.module.css";

export default function Search() {
  return (
    <form className={searchStyle.searchContainer}>
      <div className={searchStyle.search}>
        <input placeholder="Search your Recipe..." />
        <i className="fa fa-search"></i>
      </div>
    </form>
  );
}
