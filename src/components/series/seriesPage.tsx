import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { PaginationItem, Rating } from '@material-ui/lab';
import Pagination from '@material-ui/lab/Pagination';
import {
  Card,
  CardDeck,
  Col,
  Form,
  Row,
  Button,
  ListGroup,
} from 'react-bootstrap';
import unnamed from '../../data/icon/unnamed.jpg';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';
import { seriesListState } from '../ArticleList/articleList';
import { ISeries } from '../../../services/crud-server/src/models/series';

export interface ISearchFilter {
  name?: string;
  author?: string;
  category?: string;
}

export default function SeriesPage(props: { rows?: number }) {
  const seriesList = useRecoilValue<ISeries[]>(seriesListState);
  const [seriesRows, setSeriesRows] = useState<Array<ISeries[]>>([]);
  const [searchFilter, setSearchFilter] = useState<ISearchFilter>({});

  function seriesLink() {
    return history.push('/seriesCreation');
  }
  const history = useHistory();

  let test = {
    header: {
      background: 'rgba(0, 0, 0, 0.5)',
      backgroundImage:
        'url(https://www.wholelifechallenge.com/wp-content/uploads/2018/06/e-book-header.jpg)',
      height: '28vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },

    content: {
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  useEffect(() => {
    const innerProductList = [...seriesList].filter((product) => {
      let found = true;

      return found;
    });
    const rows = [];

    while (innerProductList.length && rows.length < (props.rows || 2)) {
      rows.push(innerProductList.splice(0, 5));
    }

    setSeriesRows(rows);
  }, [props.rows, searchFilter]);

  const [page, setPage] = useState(1);

  const handlePageChange = (event: any, value: any) => {
    setPage(value);
  };

  return (
    <>
      <div style={test.header}>
        <h2>Series</h2>
      </div>

      <Button variant="primary" onClick={seriesLink}>
        {' '}
        Series Creation{' '}
      </Button>

      <div className="seriesBody">
        <div className="filter">
          <Form>
            <Row>
              <Col>
                <Form.Control as="select" defaultValue="Choose..." value="">
                  <option value="">Show All...</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Control placeholder="Search Series..." />
              </Col>
            </Row>
          </Form>
        </div>

        {seriesRows.map((row) => {
          return (
            <div className="scCardDeck">
              <CardDeck>
                {row.map((series, index) => (
                  <div key={index}>
                    <Card className="sCards">
                      <Card.Img
                        variant="top"
                        width="100%"
                        src={unnamed}
                        className="card-image-top"
                      ></Card.Img>
                      <Card.Body className="scBody">
                        <Card.Title className="scTitle">
                          <Link to={`/series/${series.series_title}`}>
                            {series.series_title}
                          </Link>
                        </Card.Title>
                        <Rating
                          name="half-rating"
                          defaultValue={2.5}
                          precision={1}
                        />
                        <Card.Text className="scText">
                          {series.series_desc}
                        </Card.Text>
                        <ListGroup.Item className="scCategory">
                          {series.series_category}
                        </ListGroup.Item>
                        <Card.Footer className="scFooter">
                          {series.series_owner}
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </CardDeck>
            </div>
          );
        })}
        <Row></Row>

        <Pagination
          componentName="scCardDeck"
          className="scPagin"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </div>
    </>
  );
}
