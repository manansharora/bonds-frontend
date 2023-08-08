import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

const TradeForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    axios
      .post(`http://localhost:8080/securities/${values.securityid}/trades`, values)
      .then(response => {
        console.log(response)
      })
  };

  return (
    <Box m="20px">
      <Header title="ADD TRADE" subtitle="Create a New Trade" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Counterparty Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.counterpartyid}
                name="counterpartyid"
                // error={!!touched.firstName && !!errors.firstName}
                // helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Security Id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.securityid}
                name="securityid"
                // error={!!touched.contact && !!errors.contact}
                // helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Quantity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantity}
                name="quantity"
                // error={!!touched.contact && !!errors.contact}
                // helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                // error={!!touched.contact && !!errors.contact}
                // helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
             
              
              <TextField
                type="checkbox"
                label="Status (Available or Not)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.status}
                name="status"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                // sx={{ gridColumn: "span 2" }}
              />
              <TextField
                type="checkbox"
                label="Buy/Sell"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.buySell}
                name="buySell"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                // sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Trade
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  counterpartyid: yup.string().required("required"),
  securityid: yup.number().required("required"),
  quantity: yup.number().required("required"),
  price: yup.number().required("required"),
  status: yup.string().required("required"),
  buySell: yup.string().required("required"),
});
const initialValues = {
  counterpartyid: "",
  securityid: 0,
  quantity: 0,
  price: 0,
  status: "",
  buySell: "",
}

export default TradeForm;
