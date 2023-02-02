import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RequirementType } from "../Scopes";

const Requirement = React.lazy(() => import("../../components"));

export type EvaluatedRequirement = {
  requirementId: number;
  evaluation: string;
};

export default function AttendancePage() {
  const { id } = useParams();
  const { state } = useLocation();

  const navigate = useNavigate();

  const [evaluatedRequirements, setEvaluateRequirements] = useState<
    EvaluatedRequirement[]
  >([]);

  const saveAttendance = (e: FormEvent) => {
    e.preventDefault();

    if (!evaluatedRequirements || evaluatedRequirements.length === 0) return;

    try {
      Promise.all(
        evaluatedRequirements.map(async (req) => {
          const updatedRequirement = {
            evaluation: {
              evaluated: req.evaluation,
            },
          };

          await fetch(
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
    } catch (error) {
      console.log(`Falha em salvar avaliação :( - ${error}`);
      console.log("Os dados foram salvos para para sincronização futura");
    }
  };

  return (
    <>
      <form className="grid gap-6" onSubmit={(e) => saveAttendance(e)}>
        <header className="text-center">
          <h1 className="text-3xl font-bold">Iniciar Atendimento</h1>

          <p className="common-text">Preencha os resultados.</p>
        </header>

        {state?.requirements?.map((req: RequirementType) => (
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
