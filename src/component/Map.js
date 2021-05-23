import React from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col,Card } from 'react-bootstrap';
class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityData: '',
            cityName: '',
            show:false,
            error:''
        }
    }
    setCityName = (e) => {
        this.setState({
            cityName:e.target.value
        });
        console.log(this.state.cityName);
    }
    getCityData = async (e) => {
        e.preventDefault();
        let url = `https://eu1.locationiq.com/v1/search.php?key=pk.8dd2131eff40d7a7114d9cf644c29a91&q=${this.state.cityName}&format=json`
        
            try {
            
            let cities = await Axios.get(url);
            let res=cities;
            this.setState({
                cityData: res.data[0],
                show:true
            }); 
            console.log(this.state.cityData[0]);
        }
        catch (err){
            this.setState({
            error:err.message
            });
        }

    }



    render() {
        return (
            <>
                <Row className="justify-content-md-center">
                    <Col className="mt-5" sm={5}>
                        <Form onSubmit={this.getCityData}>
                            <Form.Group>
                                <Form.Label>City Name</Form.Label>
                                <Form.Control className="mb-3" type="text" onChange={this.setCityName} placeholder="Enter City Name" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
        </Button>
                        </Form>
                    </Col>
                    {
                        this.state.show&&
                    
                    <Col className="mt-5" sm={3}>
                    <Card >
                        <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=f5de8e48adbdc6&center=${this.state.cityData.lat},${this.state.cityData.lon}`} />
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>
                                Longtitude: {this.state.cityData.lon} <br/>
                                Latitude: {this.state.cityData.lat}
                         </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{this.state.cityData.display_name}</small>
                            
                        </Card.Footer>
                    </Card>
                    </Col>
    }
                <h5>{this.state.error}</h5>
                </Row>
            </>
        );
    }
}

export default Map;