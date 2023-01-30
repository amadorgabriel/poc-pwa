import { ChangeEvent, useEffect, useState } from "react";
import { EvaluatedRequirement } from "../pages/Attendance";

interface RequirementProps {
  id: number;
  title: string;
  subTitle: string;
  defaultValue?: string;

  onChangeCallback?: ({
    requirementId,
    evaluation,
  }: EvaluatedRequirement) => void;
  editable?: boolean;
}

export const Requirement = ({
  id,
  title,
  subTitle,
  defaultValue,
  onChangeCallback,
  editable = false,
}: RequirementProps) => {
  const [selected, setSelected] = useState<string>();

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setSelected(e.target.value);

    onChangeCallback?.({ requirementId: id, evaluation: e.target.value });
  }

  useEffect(() => {
    if (defaultValue) setSelected(defaultValue);
  }, []);

  return (
    <section>
      <div className="mb-4 max-w-sm">
        <h3 className="font-bold" contentEditable={editable}>
          {title}
        </h3>
        <p contentEditable={editable}>{subTitle}</p>
      </div>

      <fieldset className="flex items-center justify-around mt-2 mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id={`low-${id}`}
            name={`intensity-${id}`}
            value="0"
            className="radio"
            checked={selected === "0"}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor={`low-${id}`} className="radio-label">
            Pouco
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id={`medium-${id}`}
            name={`intensity-${id}`}
            value="1"
            className="radio"
            checked={selected === "1"}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor={`medium-${id}`} className="radio-label">
            Médio
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id={`high-${id}`}
            name={`intensity-${id}`}
            value="2"
            className="radio"
            checked={selected === "2"}
            onChange={(e) => onChange(e)}
          />
          <label htmlFor={`high-${id}`} className="radio-label">
            Muito
          </label>
        </div>
      </fieldset>
    </section>
  );
};
