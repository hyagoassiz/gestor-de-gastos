import { PageHeader } from "@/components/PageHeader";
import { Tabs } from "./components/Tabs";

export const Settings: React.FC = () => {
  return (
    <>
      <PageHeader title="Configurações" subTitle="Personalize" />

      <Tabs />
    </>
  );
};
