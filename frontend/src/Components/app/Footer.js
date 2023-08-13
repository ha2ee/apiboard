import { Link } from "react-router-dom";

function Footer() {
	return (
        <footer className="py-3 my-4">
        <div className="container">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
            <li className="nav-item"><Link to="/board" className="nav-link px-2 text-muted">Board</Link></li>
          </ul>
          <p className="text-center text-muted">&copy; 2023 Company, Inc</p>
        </div>
      </footer>
	);
}

export default Footer;