import "./globals.css";
import { Route, Routes } from "react-router-dom";
import Home from "./_root/Home";
import GameStats from "./_root/GameStats";
import Landing from "./_root/Landing";

const App = () => {
  return (
    <>
      <header className="sticky top-0">
        <h1 className="px-5 text">Steamify</h1>
      </header>

      <main className="flex h-full w-screen">
        <Routes>
          {/* public routes */}
          {/* <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
          </Route> */}

          {/* private routes */}
          <Route index element={<Home />} />
          <Route path="/stats/:steamid/:appid" Component={GameStats} />
        </Routes>
        {/* <Toaster /> */}
      </main>
    </>
  );
};

export default App;
