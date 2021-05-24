const ErrorsBlock = ({ errors }: { errors: {} }) =>
  Object.keys(errors).length > 0 ? (
    <div className="ui error message">
      <ul className="list">
        {Object.values(errors).map((error: any) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  ) : null;

export { ErrorsBlock };
