import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
export default function FooterPage (){
    return (

      <footer className="page-footer font-small mdb-color pt-4">
        {/* Footer Links */}
        <div className="container text-center text-md-left">
          {/* Footer links */}
          <div className="row text-center text-md-left mt-3 pb-3">
            {/* Grid column */}
            {/* Grid column */}
            {/* Grid column */}
            <hr className="w-100 clearfix d-md-none" />
            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold"style={{ color: '#FFD1AA' }}>Enlaces útiles</h6>
              <p>
                <a href="https://usm.cl/"style={{ color: '#FFD1AA' }}>Página oficial UTFSM</a>
              </p>
              <p>
                <a href="/Ayuda"style={{ color: '#FFD1AA' }}>Ayuda</a>
              </p>
            </div>
            {/* Grid column */}
            <hr className="w-100 clearfix d-md-none" />
            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold"style={{ color: '#FFD1AA' }}>Contacto</h6>
              <p>
                <i className="fas fa-envelope mr-3" /><a style={{ color: '#FFD1AA' , textDecoration: "underline"}} href="mailto:soporte@gmail.com">soporte@gmail.com</a></p>
            </div>
            {/* Grid column */}
          </div>
          {/* Footer links */}
          <hr />
          {/* Grid row */}
          <div className="row d-flex align-items-center">
            {/* Grid column */}
            <div className="col-md-7 col-lg-8">
              {/*Copyright*/}
              <p className="text-center text-md-left"style={{ color: '#FFD1AA' }}>© 2021 Copyright:
                  <strong> Fukusuke Sushi-Delivery </strong>
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
        {/* Footer Links */}
      </footer>
    );
}
