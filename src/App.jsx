import { useEffect, useState } from "react";
import Input from "./components/input/Input";
import { CHECKLIST_DATA } from "./server/checklist-labels";
import Section from "./components/section/Section";

function App() {
  const [formData, setFormData] = useState({});

  const handleChange = (data, section) => {
    setFormData((prev) => {
      const newState = {
        ...prev,
        [section]: {
          ...prev[section],
          ...data,
        },
      };
      localStorage.setItem("formData", JSON.stringify(newState));
      return newState;
    });
  };

  const handleClear = () => {
    localStorage.removeItem("formData");
    setInitialData();
  };

  const setInitialData = () => {
    setFormData(() => {
      return CHECKLIST_DATA.checklists.reduce((acc, item) => {
        acc[item.name] = item.checkItems.reduce((a, i) => {
          a[i.name] = false;
          return a;
        }, {});
        return acc;
      }, {});
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const section = e.target.section.value;
    const value = e.target.elValue.value;
    if (!section || !value) {
      alert("No value entered");
      return;
    }
    setFormData((prev) => {
      const newState = {
        ...prev,
        [section]: {
          ...prev[section],
          [value]: false,
        },
      };
      localStorage.setItem("formData", JSON.stringify(newState));
      return newState;
    });

    e.target.reset();
  };

  useEffect(() => {
    if (localStorage.getItem("formData")) {
      setFormData(JSON.parse(localStorage.getItem("formData")));
      return;
    }
    setInitialData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {Object.keys(formData).map((section, index) => (
          <Section name={section} key={index}>
            {Object.keys(formData[section]).map((checklist, inIndex) => (
              <Input
                key={checklist + inIndex}
                type={"checkbox"}
                name={checklist}
                value={formData[section][checklist]}
                section={section}
                change={handleChange}
              />
            ))}
          </Section>
        ))}
      </div>
      <hr />
      <button type="button" className="btn btn-danger" onClick={handleClear}>
        Clear
      </button>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="section">Select Section:</label>
          <select className="form-control" id="section" name="section">
            {Object.keys(formData).map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="value">Enter Value:</label>
          <input
            type="text"
            className="form-control"
            id="value"
            name="elValue"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
