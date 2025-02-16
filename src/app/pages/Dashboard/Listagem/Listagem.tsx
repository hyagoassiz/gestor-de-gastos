import { TitlePage } from "../../../shared/components/TitlePage/TItlePage";
import { Graficos } from "./components/Graficos";
import { Totais } from "./components/Totais";

export const Listagem: React.FC = () => {
  return (
    <>
      <TitlePage title="Dashboard" subTitle="Bem vindo à sua Dashboard" />

      <Totais />

      <Graficos />
    </>
  );
};
