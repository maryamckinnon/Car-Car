import { Carousel } from "react-bootstrap";
import red from "./images/red.jpg";
// import blue from "./images/blue.jpg";
import white from "./images/white.jpg";
import silver from "./images/silver.jpg";

function CarouselFade() {
  return (
    <Carousel fade className="carousel" interval={6000} >
      <Carousel.Item style={{ zIndex: -1 }}>
        <Carousel.Caption>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-on-image" style={{fontSize: "25px"}}>
              The premiere solution for automobile dealership management
            </h1>
          </div>
        </Carousel.Caption>
        <img
          className="d-block"
          style={{ overflow: "hidden" }}
          src={silver}
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item style={{ zIndex: -1 }}>
        <Carousel.Caption>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-on-image" style={{fontSize: "25px"}}>
              The premiere solution for automobile dealership management
            </h1>
          </div>
        </Carousel.Caption>
        <img
          className="d-block"
          style={{ overflow: "hidden" }}
          src={red}
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item style={{ zIndex: -1 }}>
        <Carousel.Caption>
          <div className="text-center">
            <h1 className="display-5 fw-bold text-on-image" style={{fontSize: "25px"}}>
            The premiere solution for automobile dealership management
            </h1>
          </div>
        </Carousel.Caption>
        <img
          className="d-block"
          style={{ overflow: "hidden" }}
          src={white}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFade;
