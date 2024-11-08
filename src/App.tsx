import { AppBar } from "./app/shared/components/AppBar/AppBar";
import "./App.css";
import { TitlePage } from "./app/shared/components/TitlePage/TItlePage";
import { ToolPainel } from "./app/shared/components/ToolPanel/ToolPanel";
import { Button } from "@mui/material";
import { DataTable } from "./app/shared/components/DataTable/DataTable";
import { Modal } from "./app/shared/components/Modal/Modal";
import { Container } from "./app/shared/components/Container/Container";

function App() {
  return (
    <>
      <AppBar />
      <Container>
        {/* <Drawer
        applyFilter={() => alert("")}
        closeFilter={() => alert("")}
        open={true}
      >
        <Box>Teses</Box>
      </Drawer> */}
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
        <Modal
          buttons={<Button>Fechar</Button>}
          open={false}
          style={{ width: 800 }}
          title="Esse é o título"
        >
          Teste
        </Modal>
      </Container>
    </>
  );
}

export default App;
