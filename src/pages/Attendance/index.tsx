import React from "react";
import { useNavigate } from "react-router-dom";

const Requirement = React.lazy(() => import("../../components"));

export default function AttendancePage() {
  const navigate = useNavigate();

  return (
    <>
      <form className="grid gap-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold">Iniciar Atendimento</h1>

          <p className="common-text">Preencha os resultados.</p>
        </header>

        <Requirement />

        <footer className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            type="submit"
            className="button button-flat block justify-end"
          >
            Salvar alterações
          </button>
        </footer>
      </form>
    </>
  );
}
