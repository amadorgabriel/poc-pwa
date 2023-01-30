import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center">Página Home</h1>

        <div className="common-text">
          <p>
            Esse aplicativo está funcionando no modo{" "}
            {navigator.onLine ? (
              <b className="text-emerald-700 font-bold">online</b>
            ) : (
              <b className="text-rose-700 font-bold">offline</b>
            )}
            .
          </p>

          <p>
            Esse browser
            {"serviceWorker" in navigator ? (
              <b className="text-rose-700"> não suporta </b>
            ) : (
              <b className="text-emerald-700"> suporta </b>
            )}
            Service Workers (SW).
          </p>
        </div>
      </div>

      <div className="text-base font-semibold text-center">
        <Link to="/scopes" className="button button-flat">
          Escopos &rarr;
        </Link>
      </div>
    </>
  );
}
