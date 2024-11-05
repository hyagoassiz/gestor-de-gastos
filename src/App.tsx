import { AppBar } from "./app/shared/components/AppBar/AppBar";
import "./App.css";
import { TitlePage } from "./app/shared/components/TitlePage/TItlePage";
import { ToolPainel } from "./app/shared/components/ToolPanel/ToolPanel";
import { Button } from "@mui/material";
import { AddIcCallOutlined } from "@mui/icons-material";

function App() {
  return (
    <>
      <AppBar />
      <TitlePage title="Título" subTitle="Sub-Título" />
      <ToolPainel
        buttons={<Button>Testes</Button>}
        icons={<AddIcCallOutlined color="error" />}
      />
    </>
  );
}

export default App;
