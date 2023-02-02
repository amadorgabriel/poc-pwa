import React from "react";
import { useNavigate } from "react-router-dom";

const Requirement = React.lazy(() => import("../../../components"));

export default function CreateScopePage() {
  const navigate = useNavigate();

  return (
    <>
      <form className="grid gap-6">
        <header>
          <h1 className="text-3xl font-bold text-center">Novo Escopo</h1>

          <p className="common-text text-center">
            Cadastre um novo escopo com requisitos customizados.
          </p>
        </header>

        <main>
          <Requirement
            id={999}
            editable
            title="Digite um título aqui"
            subTitle="E uma descrição também"
          />
        </main>

        <footer className="justify-center grid grid-cols-2 gap-4">
          <button className="button button-flat flex">
            <p className="pr-2">&#43;</p>
            Novo Requisito
          </button>

          <button
            onClick={() => navigate("/")}
            type="submit"
            className="button button-flat flex"
          >
            <p className="pr-2">&darr;</p>
            Salvar Escopo
          </button>
        </footer>
      </form>
    </>
  );
}
