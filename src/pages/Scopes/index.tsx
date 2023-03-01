import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Scope = {
  id: number;
  name: string;
  description: string;
  active: boolean;
  requirements: RequirementType[];
};

export type RequirementType = {
  id: number;
  scopeId: number;
  title: string;
  subTitle: string;
  evaluation: {
    evaluated?: string;
  };
};

export default function ScopePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [scopes, setScopes] = useState<Scope[]>([]);

  const fetchScopes = async () => {
    try {
      setIsLoading(true);

      await fetch(`${process.env.REACT_APP_API_URL}/scope`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setScopes(data);
        });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScopes();
  }, []);

  return (
    <>
      <header className="text-center">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold">Lista de Escopos</h1>
          <button
            className="button button-flat"
            onClick={() => {
              window.location.reload();
            }}
          >
            <p>&#x21bb;</p>
          </button>
        </div>

        <p className="common-text">
          Clique em um escopo para iniciar o atendimento.
        </p>
      </header>

      <main className="grid gap-y-4">
        {isLoading ? (
          <p>Loading</p>
        ) : (
          scopes?.map((scope) => (
            <Link
              key={scope.id}
              to={`/attendance/${scope.id}`}
              state={{ requirements: scope.requirements }}
            >
              <div className="scope-item">
                <div className="flex justify-between">
                  <h3 className="font-bold mr-2">{scope.name}</h3>
                  <small>{scope.active ? "Atendido" : "Não Atendido"}</small>
                </div>
                <p>{scope.description}</p>
              </div>
            </Link>
          ))
        )}
      </main>

      <footer className="mt-2 flex justify-center mb-6">
        <Link to="create" className="button button-flat">
          <p className="pr-2">&#43;</p>
          Novo escopo
        </Link>
      </footer>
    </>
  );
}
