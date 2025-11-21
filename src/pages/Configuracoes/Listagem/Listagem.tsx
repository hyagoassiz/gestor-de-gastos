import { PageHeader } from "@/components/PageHeader";
import { COMPONENTS_TABS } from "./constants/constants";
import { BaseTabs } from "@/components/BaseTabs";

export const Listagem: React.FC = () => {
  return (
    <>
      <PageHeader title="Configurações" />

      <BaseTabs items={COMPONENTS_TABS} />
    </>
  );
};
