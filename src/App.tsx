import { useEffect } from "react";
import cityApi from "./api/cityApi";

export default function App() {
  useEffect(() => {
    cityApi
      .getAll()
      .then((res) => res.data.forEach((i) => console.log(i.name)));
  });
  return <div>App</div>;
}
