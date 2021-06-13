const ErrorsBlock = ({ errors }: { errors: {} }) =>
  Object.keys(errors).length > 0 ? (
    <div className="ui error message" data-testid="errors-block">
      <ul className="list">
        {Object.values(errors).map((error: any) => (
          <li key={error} data-testid="errors-block-error">
            {error}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <></>
  );

export { ErrorsBlock };
