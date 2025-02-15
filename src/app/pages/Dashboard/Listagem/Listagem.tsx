import { TitlePage } from "../../../shared/components/TitlePage/TItlePage";
import { Graficos } from "./components/Graficos";
import { Totais } from "./components/Totais";

export const Listagem: React.FC = () => {
  return (
    <>
      <TitlePage title="Dashboard" />

      <Totais />

      <Graficos />
    </>
  );
};
