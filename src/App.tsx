import { AppBar } from "./app/shared/components/AppBar/AppBar";
import "./App.css";
import { TitlePage } from "./app/shared/components/TitlePage/TItlePage";

function App() {
  return (
    <>
      <AppBar />
      <TitlePage title="Título" subTitle="Sub-Título" />
    </>
  );
}

export default App;
