import { Box, Card, Typography, LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface GoalCardProps {
  titulo: string;
  dataConclusao: string;
  percentual: number;
  valorEsperado: number;
  valorAtual: number;
  moreOptions?: React.ReactNode;
}

export function GoalCard({
  titulo,
  dataConclusao,
  percentual,
  valorAtual,
  valorEsperado,
  moreOptions,
}: GoalCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        width: "100%",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mb: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          {titulo}
        </Typography>

        {moreOptions}
      </Box>

      <LinearProgress
        variant="determinate"
        value={Math.min(percentual, 100)}
        sx={{
          height: 10,
          borderRadius: 5,
        }}
      />

      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" fontWeight={600}>
          <NumericFormat
            value={valorAtual}
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
          />
        </Typography>

        <Typography
          variant="body1"
          fontWeight={600}
          color={percentual >= 100 ? "success.main" : "inherit"}
        >
          {percentual >= 100 ? "Concluído" : `${percentual.toFixed(0)}%`}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="body2"
          color="text.secondary"
          display="flex"
          alignItems="center"
          gap={0.5}
        >
          <EmojiEventsIcon fontSize="small" />
          <NumericFormat
            value={valorEsperado}
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
          />
        </Typography>

        {dayjs(dataConclusao).format("DD/MM/YYYY")}
      </Box>
    </Card>
  );
}
