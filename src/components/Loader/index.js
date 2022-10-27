import "./styled.css";

function Loader() {
  return (
    <div className="LoaderWrapper">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader;
