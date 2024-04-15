const Input = ({ type = "text", change, name = "", section, value }) => {
  const handleChange = (e) => {
    if (type === "checkbox") {
      change({ [e.target.name]: e.target.checked }, section);
      return;
    }
    change({ [e.target.name]: e.target.value });
  };

  const checkBox = (
    <>
      <div className="form-check">
        <label>{name}</label>
        <input
          type={type}
          className="form-check-input"
          name={name}
          checked={value}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </>
  );
  const textInput = (
    <div className="form-control">
      <label>{name}</label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );

  return <>{type === "text" ? textInput : checkBox}</>;
};

export default Input;
{
  //   <div className={type === "checkbox" ? "form-check" : "form-control"}>
  // <label>{name}</label>
  // <input
  //   type={type}
  //   className={type === "checkbox" ? "form-check-input" : "form-control"}
  //   name={name}
  //   value={type === "text" && value}
  //   checked={type === "checkbox" && value}
  //   onChange={(e) => handleChange(e)}
  // />
  // </div>
}
