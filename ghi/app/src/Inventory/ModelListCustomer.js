import React from 'react';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


class ModelListCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modelColumns: [[],[],[]],
        };
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/models/';
        try {
            const response = await fetch(url)
            if (response.ok) {
              const data = await response.json()
              const modelColumns = [[], [], []];
              let i = 0
              for (let model of data.models) {
                modelColumns[i].push(model)
                i = i + 1
                if (i > 2) {
                    i = 0
                }
              }
              this.setState({modelColumns: modelColumns})
            }
          } catch (e) {
            console.error(e)
          }
        }

    render() {
        return (
          <>
            <div>
              <h2 className="display-6 fw-bold">Vehicle Models</h2>
              <div>
              </div>
            </div>
            <Container>
              <Row>
                {this.state.modelColumns.map((list, key) => {
                  return (
                    <Col key={key}>
                    {list.map(model => {
                      return (
                        <div key={model.id}>
                        <Card>
                            <Card.Title
                                style={{paddingLeft:'10px', paddingTop:'10px', fontWeight:'bold'}}
                            >
                                {model.name}
                            </Card.Title>
                            <Card.Img
                                src={model.picture_url}
                                style={{paddingTop:'30px'}}
                            >
                            </Card.Img>
                            <Card.Body
                                style={{fontWeight:'bold'}}
                            >
                            </Card.Body>
                            <Card.Text
                                style={{}}
                            >
                                Starting MSRP: ${ new Intl.NumberFormat().format(model.price) }
                            </Card.Text>
                        </Card>

                        </div>
                      )
                    })}
                    </Col>
                  )
                })}
              </Row>
            </Container>
          </>
        );
      }


}

export default ModelListCustomer;