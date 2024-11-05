import { AppBar } from "./app/shared/components/AppBar/AppBar";
import "./App.css";
import { TitlePage } from "./app/shared/components/TitlePage/TItlePage";
import { ToolPainel } from "./app/shared/components/ToolPanel/ToolPanel";
import { Button } from "@mui/material";
import { DataTable } from "./app/shared/components/DataTable/DataTable";

function App() {
  return (
    <>
      <AppBar />
      <TitlePage title="Título" subTitle="Sub-Título" />
      <ToolPainel buttons={<Button>Adicionar</Button>} />
      <DataTable
        columns={[{ key: "1", label: "Coluna I" }]}
        data={[
          { "1": "Teste", teste: 1 },
          { "1": "Teste2", teste: 2 },
          { "1": "Teste3", teste: 3 },
          { "1": "Teste4", teste: 4 },
        ]}
        textForEmptyData="teste"
      />
    </>
  );
}

export default App;
