import { useGetMovies } from "@/api/get-movies";

const Protected = () => {
  const { data } = useGetMovies();

  return (
    <>
      <h1 className="page-header">Not Protected</h1>
      {Object.keys(data || {}).map((key) => {
        const { countryCode, name } = data[key];
        return (
          <div key={key}>
            <h2>{name}</h2>
            <p>{countryCode}</p>
          </div>
        );
      })}
    </>
  );
};

export default Protected;
