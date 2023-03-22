import { useEffect } from "react";
import cityApi from "./api/cityApi";

export default function App() {
  useEffect(() => {
    cityApi.getAll().then((res) => console.log(res));
  });
  return <div>App</div>;
}
