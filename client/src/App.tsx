import { AuthContextProvider } from "./contexts/AuthContext/AuthContextProvider";
import { Router } from "./routes/route";
import { SWRConfig } from "swr";
import { SwrOptions } from "./lib/swr/config";

function App() {
  return (
    <>
      <SWRConfig value={SwrOptions}>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </SWRConfig>
    </>
  );
}

export default App;