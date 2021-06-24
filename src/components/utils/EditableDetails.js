import React from "react";

class Details extends React.Component {
  render() {
    //const id = props.match.params.id;
    const { items, edit } = this.props;

    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <button
              onClick={() => this.props.action()}
              className="waves-effect waves-light btn pink lighten-1 z-depth-0"
            >
              {edit ? "Save" : "Edit"}
            </button>
          </div>

          <div className="card-action white ligthen-4 grey-text">
            {Object.entries(items).map(([key, { value, label }], i) => {
              return (
                <div key={i}>
                  {edit ? (
                    <>
                      <label htmlFor={key}>{label}</label>
                      <input
                        id={key}
                        type="text"
                        value={value}
                        onChange={(e) =>
                          this.props.changeValue(key, e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <p>
                      {label}: <br />
                      {value}
                    </p>
                  )}
                </div>
              );
            })}
            {this.props.renderExtra?.()}
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
