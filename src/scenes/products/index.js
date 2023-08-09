import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  // Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import Header from "components/Header";
// import axios from "axios";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  type,
  maturityDate,
  coupon,
  supply,
  faceValue,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  // const navigate = useNavigate();
  const date = maturityDate.substring(0, 10);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <b>
          <Typography
            sx={{ fontSize: 18 }}
            color={theme.palette.secondary[700]}
            gutterBottom
          >
            Bond: {type}
          </Typography>
        </b>
        <hr />
        <Typography
          sx={{ fontSize: 18 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          Face Value: {faceValue}
        </Typography>

        <Typography
          sx={{ fontSize: 18 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          Coupon Rate: {coupon}%
        </Typography>
        <Typography
          sx={{ fontSize: 18 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          Maturity Date: {date}
        </Typography>
        <hr></hr>
        <Typography variant="h5" component="div">
          Issuer: {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="large"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
        <Link to={`/securities/${_id}/trades`} state={{ id: _id }}>
          <Button
            variant="contained"
            size="large"
            sl={{ ml: 2 }}
            // onClick={() => navigate("/http://localhost:8080/securities/1/trades")}
          >
            View Trades
          </Button>
        </Link>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>Bond Id: BO412</Typography>
          <Typography>Bonds Left: 254</Typography>
          <Typography>Bonds Bought This Year: 4500</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Sample = () => {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:8080/security")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box m="1.5rem 2.5rem">
      {/* <Header title="PRODUCTS" subtitle="See your list of products." /> */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {users.map((user) => (
          <Product
            key={user.isin}
            _id={user.id}
            name={user.issuer}
            description={
              "description description description description description description"
            }
            price={2400}
            type={user.type}
            supply={"supply"}
            stat={"stat"}
            faceValue={user.faceValue}
            coupon={user.coupon}
            maturityDate={user.maturityDate}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Sample;