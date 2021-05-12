import "./Loader.css";

function Loader({ message }) {
  return (
    //   https://loading.io/css/
    // for a different loader go to the link above
    // Copy their loader code, replace the one inside main
    <main className="loader">
      <section>
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <p className="loader__message">{message || ""}</p>
      </section>
    </main>
  );
}

export default Loader;
