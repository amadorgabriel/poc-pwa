import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Requirement = React.lazy(() => import("../../components"));

export type EvaluatedRequirement = {
  requirementId: number;
  evaluation: string;
};

type RequirementType = {
  id: number;
  scopeId: number;
  title: string;
  subTitle: string;
  evaluation: {
    evaluated: string;
  };
};

export default function AttendancePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState<RequirementType[]>([]);
  const [evaluatedRequirements, setEvaluateRequirements] = useState<
    EvaluatedRequirement[]
  >([]);

  const fetchRequirementsFromScopeId = () => {
    try {
      fetch(`${process.env.REACT_APP_API_URL}/scope/${id}/requirements`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setRequirements(data);
        });
    } catch (e) {
      console.log("Falha ao carregar a lista de requisitos ;(");
      console.log(e);
    }
  };

  const saveAttendance = (e: FormEvent) => {
    e.preventDefault();

    if (!evaluatedRequirements || evaluatedRequirements.length === 0) return;

    try {
      Promise.all(
        evaluatedRequirements.map((req) => {
          const updatedRequirement = {
            evaluation: {
              evaluated: req.evaluation,
            },
          };

          fetch(
            `${process.env.REACT_APP_API_URL}/scope/${id}/requirements/${req.requirementId}`,
            {
              method: "PUT",
              body: JSON.stringify(updatedRequirement),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        })
      );

      console.log("Avaliações salvas com sucesso!");

      navigate("/");
    } catch (e) {
      console.log("Falha ao salvar as avaliações ;(");
      console.log(e);
    }
  };

  useEffect(() => {
    fetchRequirementsFromScopeId();
  }, []);

  return (
    <>
      <form className="grid gap-6" onSubmit={(e) => saveAttendance(e)}>
        <header className="text-center">
          <h1 className="text-3xl font-bold">Iniciar Atendimento</h1>

          <p className="common-text">Preencha os resultados.</p>
        </header>

        {requirements?.map((req) => (
          <Requirement
            key={req.id}
            id={req.id as number}
            title={req.title}
            defaultValue={req.evaluation?.evaluated}
            subTitle={req.subTitle}
            onChangeCallback={({ requirementId, evaluation }) => {
              setEvaluateRequirements([
                ...evaluatedRequirements,
                { requirementId, evaluation },
              ]);
            }}
          />
        ))}

        <footer className="flex justify-center pb-6">
          <button
            type="submit"
            className="button button-flat block justify-end"
          >
            <p className="pr-2">&darr;</p>
            Salvar alterações
          </button>
        </footer>
      </form>
    </>
  );
}
