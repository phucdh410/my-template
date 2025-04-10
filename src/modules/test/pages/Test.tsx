import { Paper, Stack } from "@mui/material";

const TestPage = () => {
  return (
    <>
      <Paper sx={{ maxWidth: 680 }}>
        <Stack p={4} gap={5}>
          <svg width="300" height="100">
            <text
              x="10"
              y="50"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              fontSize="40"
              fontFamily="'Caveat', cursive"
            >
              Hello
              <animate
                attributeName="stroke-dashoffset"
                from="1000"
                to="0"
                dur="3s"
                fill="freeze"
              />
            </text>
          </svg>
        </Stack>
      </Paper>
    </>
  );
};
export default TestPage;
