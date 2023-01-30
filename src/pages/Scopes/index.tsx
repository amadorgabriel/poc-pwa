import { Link } from "react-router-dom";

export default function ScopePage() {
  return (
    <>
      <header className="text-center">
        <div>
          <h1 className="text-3xl font-bold">Lista de Escopos</h1>
        </div>

        <p className="common-text">
          Clique em um escopo para iniciar o atendimento.
        </p>
      </header>

      <main>
        <Link to="/attendance/1">
          <div className="scope-item">
            <div className="flex align-middle">
              <h3 className="font-bold mr-2">Titulo</h3>
              <small>Atendido</small>
            </div>
            <p>Descrição de um escopo</p>
          </div>
        </Link>
      </main>

      <footer className="mt-2 flex justify-center">
        <Link to="create" className="button button-flat">
          <p className="pr-2">&#43;</p>
          Novo escopo
        </Link>
      </footer>
    </>
  );
}
