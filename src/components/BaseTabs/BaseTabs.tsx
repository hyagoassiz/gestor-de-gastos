import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { TabItem } from "@/types";

interface BaseTabsProps {
  items: TabItem[];
}

export const BaseTabs: React.FC<BaseTabsProps> = ({ items }) => {
  const [tab, setTab] = useState<number>(0);

  function handleChange(_: React.SyntheticEvent, newValue: number): void {
    setTab(newValue);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        aria-label="Tabs Reutilizáveis"
        sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
      >
        {items.map((item, index) => (
          <Tab key={index} label={item.label} />
        ))}
      </Tabs>

      <Box mt={2}>{items[tab]?.content}</Box>
    </Box>
  );
};
