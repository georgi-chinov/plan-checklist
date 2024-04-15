const Section = ({ name, children }) => {
  return (
    <div className="col-6">
      <div className="row">
        <h3>{name}</h3>
      </div>
      {children}
    </div>
  );
};

export default Section;
