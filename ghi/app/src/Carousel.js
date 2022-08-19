import { Carousel } from "react-bootstrap";
import red from "./images/red.jpg";
// import white from "./images/white.jpg";

function CarouselFade() {
  return (
    <Carousel fade className="carousel" interval={6000} >
      <Carousel.Item style={{ zIndex: -1 }}>
        <Carousel.Caption>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-on-image" style={{fontSize: "25px", fontStyle: "italic"}}>
              The premiere solution for automobile dealership management
            </h1>
          </div>
        </Carousel.Caption>
        <img
          className="d-block"
          style={{ overflow: "hidden" }}
          src={red}
          alt="First slide"
        />
      </Carousel.Item>

      {/* <Carousel.Item style={{ zIndex: -1 }}>
        <Carousel.Caption>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-on-image">
              CarCar
            </h1>
            <p className="carousel-p">
              The premiere solution for automobile dealership management
            </p>
          </div>
        </Carousel.Caption>
        <img
          className="d-block"
          style={{ overflow: "hidden" }}
          src={white}
          alt="Second slide"
        />
      </Carousel.Item> */}

      {/* <Carousel.Item style={{ zIndex: -1 }}>
        <Carousel.Caption>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-on-image">
              CarCar
            </h1>
            <p>
              The premiere solution for automobile dealership management!
            </p>
          </div>
        </Carousel.Caption>
        <img
          className="d-block"
          style={{ overflow: "hidden" }}
          src={nycSkyline}
          alt="Third slide"
        />
      </Carousel.Item> */}
    </Carousel>
  );
}

export default CarouselFade;
