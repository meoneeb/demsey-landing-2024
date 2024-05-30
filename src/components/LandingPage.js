import Header from "./Header";
import Form from "./form";
import '../styles/styles.scss';

export default function LandingPage() {
  return (
    <>
      <div className="container">logo</div>
      <div>
        <Header />
    </div>
      <div className="container py-5">
        <div className="row" style={{ background: "#fff" }}>
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}
