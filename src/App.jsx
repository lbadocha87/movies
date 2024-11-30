import { useEffect, useState } from "react";
import "./App.css";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

function App() {
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);
  const [filteredMoves, setFilteredMoves] = useState(JSON.parse(localStorage.getItem('movies')) || []);

  const [formData, setFormData] = useState({
    title: "Init",
    genre: "comedy",
    rate: "7",
    year: "2022",
    type: "movie",
  });

  const [filters, setFilters] = useState({});

  const handleFormData = (e) => {
    const target = e.target;
    const name = target.name;
    setFormData({ ...formData, [name]: target.value });
  };

  const handleFilterData = (e) => {
    const target = e.target;
    const name = target.name;

    setFilters({ ...filters, [name.split('F')[0]]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = { id: Date.now(), ...formData }

    setMovies([...movies, newMovie]);
    setFilteredMoves([...filteredMoves, newMovie]);
  };

  const handleDelete = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
    setFilteredMoves(filteredMoves.filter(movie => movie.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
  }, [movies])

  useEffect(() => {
    const filteredMovies = movies.filter((movie) =>
      Object.entries(filters).every(([key, value]) => movie[key] === value)
    );

    setFilteredMoves(filteredMovies)
  }, [filters, movies])



  return (
    <Container>
      <h1>movies</h1>
      <Row>
        <Col xs={3}>
          <h2>Filters</h2>
          <Button onClick={() => setFilters({})}>Resetuj filtry</Button>
          <Form>
            <Form.Group className="mb-3" controlId="genre">
              <Form.Label>Gatunek</Form.Label>
              <Form.Select
                name="genreFilter"
                onChange={handleFilterData}
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
                      onChange={handleFilterData}
                      key={rate}
                      type="radio"
                      value={rate}
                      name="rateFilter"
                      label={rate}
                    />
                  );
                }
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Typ</Form.Label>
              {["movie", "series"].map((type) => {
                return (
                  <Form.Check
                    key={type}
                    type="radio"
                    value={type}
                    name="typeFilter"
                    label={type}
                    onChange={handleFilterData}
                  />
                );
              })}
            </Form.Group>
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
              <Form.Label>Typ</Form.Label>
              {["movie", "series"].map((type) => {
                return (
                  <Form.Check
                    key={type}
                    checked={type === formData.type}
                    type="radio"
                    value={type}
                    name="type"
                    label={type}
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
                <Card.Footer>
                  <Button variant="danger" onClick={() => handleDelete(movie.id)}>Delete</Button>
                </Card.Footer>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
