import { useState } from "react";
import "./App.css";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMoves, setFilteredMoves] = useState([]);

  const [formData, setFormData] = useState({
    title: "Init",
    genre: "comedy",
    rate: "2",
    year: "2022",
    type: "movie",
  });

  const handleFormData = (e) => {
    const target = e.target;
    const name = target.name;
    setFormData({ ...formData, [name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMovies([...movies, formData]);
    setFilteredMoves([...filteredMoves, formData]);
  };


  const filterTitle = (e) => {
    const filteredMovies = movies.filter(movie => movie.title.includes(e.target.value))
    setFilteredMoves(filteredMovies)
  }

  return (
    <Container>
      <h1>movies</h1>
      <Row>
        <Col xs={3}>
          <h2>Filters</h2>
          <Form>
            <Form.Label>Filtruj tytuł</Form.Label>
            <Form.Control
              type="text"
              name="filterTitle"
              placeholder="Filtruj tytuł"
              onChange={filterTitle}
            />
          </Form>
        </Col>
        <Col>
          <h2>Form</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Tytuł</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Tytuł"
                value={formData.title}
                required
                onChange={handleFormData}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="genre">
              <Form.Label>Gatunek</Form.Label>
              <Form.Select
                name="genre"
                value={formData.genre}
                onChange={handleFormData}
              >
                <option value="comedy">Komedia</option>
                <option value="drama">Dramat</option>
                <option value="horror">Horror</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="rate">
              <Form.Label>Ocena</Form.Label>
              {Array.from({ length: 10 }, (_, i) => (i + 1).toString()).map(
                (rate) => {
                  return (
                    <Form.Check
                      onChange={handleFormData}
                      key={rate}
                      type="radio"
                      checked={rate === formData.rate}
                      value={rate}
                      name="rate"
                      label={rate}
                    />
                  );
                }
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="year">
              <Form.Label>Rok wydania</Form.Label>
              <Form.Control
                type="text"
                name="year"
                placeholder="Rok wydania"
                value={formData.year}
                required
                onChange={handleFormData}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Ocena</Form.Label>
              {["movie", "series"].map((rate) => {
                return (
                  <Form.Check
                    key={rate}
                    checked={rate === formData.type}
                    type="radio"
                    value={rate}
                    name="type"
                    label={rate}
                    onChange={handleFormData}
                  />
                );
              })}
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        <Col>
          <h2>List</h2>
          {filteredMoves.map((movie, i) => {
            return (
              <Card key={`${movie.title}${i}`} className="mb-2">
                <Card.Header>{movie.title}</Card.Header>
                <Card.Body>
                  <p>Ocena: {movie.rate}</p>
                  <p>Garunek: {movie.genre}</p>
                  <p>Rok: {movie.year}</p>
                  <p>Type: {movie.type}</p>
                </Card.Body>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
