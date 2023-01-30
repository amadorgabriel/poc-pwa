interface RequirementProps {
  editable?: boolean;
}

export const Requirement = ({ editable = false }: RequirementProps) => {
  return (
    <section>
      <div className="mb-4 max-w-sm">
        <h3 className="font-bold" contentEditable={editable}>
          #1 Mais de um funcionário reclama de dores nas costas?
        </h3>
        <p contentEditable={editable}>Auditoria</p>
      </div>

      <fieldset className="flex items-center justify-around mt-2 mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="low"
            name="intensity"
            value="0"
            className="radio"
          />
          <label htmlFor="low" className="radio-label">
            Pouco
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="medium"
            name="intensity"
            value="1"
            className="radio"
          />
          <label htmlFor="medium" className="radio-label">
            Médio
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="radio"
            id="high"
            name="intensity"
            value="2"
            className="radio"
          />
          <label htmlFor="high" className="radio-label">
            Muito
          </label>
        </div>
      </fieldset>
    </section>
  );
};
