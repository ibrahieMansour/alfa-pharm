const AuthHeading = ({ head, desc }) => (
  <div className="auth-heading">
    <h2 className="head">{head}</h2>
    {desc.map((e) => (
      <p key={e} className="desc">
        {e}
      </p>
    ))}
  </div>
);

export default AuthHeading;
