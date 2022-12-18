import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useUserSlice } from "@redux/getSlices.js";

import "./InstallPrompt.css";

const InstallPrompt = () => {
  const [, dispatch] = useUserSlice();
  const [installEvent, setInstallEvent] = useState(null);

  const handleInstallClick = async (e) => {
    e.preventDefault();

    installEvent.prompt();

    document
      .getElementById("installApp__btn")
      .addEventListener("click", async (btnEvent) => {
        btnEvent.preventDefault();

        window.addEventListener("beforeinstallprompt", async (e) => {
          e.preventDefault();
          e.prompt();
          const outcome = await e.userChoice;
          if (outcome?.outcome !== "dismissed")
            dispatch({
              type: "SET_INSTALL_PROMPT",
              payload: { installPrompt: true },
            });
        });
      });
  };

  const handleCloseClick = () => {
    dispatch({
      type: "SET_INSTALL_PROMPT",
      payload: { installPrompt: false },
    });
  };

  useEffect(() => {
    console.log("wHY ARE YOU NOT BEING CALLED MATE");
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      // console.log(e);
      setInstallEvent(e);

      // Optionally, send analytics event that PWA install promo was shown.
      console.log(`'beforeinstallprompt' event was fired.`);
    });

    window.addEventListener("appinstalled", (event) => {
      localStorage.setItem("pwaInstalled", "1");
    });
  }, [setInstallEvent, dispatch]);

  return (
    <div className="installApp__overlay">
      <div className="installApp">
        <h4>Install Qampus</h4>
        <p>Install Qampus on your device for a better experience</p>
        <button id="installApp__btn" onClick={handleInstallClick}>
          Install App
        </button>
        <div className="closeBtn">
          <span
            role="button"
            onClick={handleCloseClick}
            className="icon-container"
          >
            <CloseIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
