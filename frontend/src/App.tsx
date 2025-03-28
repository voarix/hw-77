import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Container, CssBaseline, Typography } from "@mui/material";
import Messages from "./features/messages/Messages.tsx";

const App = () => {
  return (
    <>
      <CssBaseline />
      <main>
        <Container maxWidth="xl" sx={{ mt: 5 }}>
          <Routes>
            <Route path="/" element={<Messages />} />
            <Route path="/messages" element={<Messages />} />
            <Route
              path="*"
              element={<Typography variant="h4">Not found page</Typography>}
            />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
