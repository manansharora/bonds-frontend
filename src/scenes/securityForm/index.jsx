import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

const SecurityForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
    axios
      .post('http://localhost:8080/security', values)
      .then(response => {
        console.log(response)
      })
  };

  return (
    <Box m="20px">
      <Header title="ADD SECURITY" subtitle="Create a New Security" />

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
                label="ISIN"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.isin}
                name="isin"
                // error={!!touched.firstName && !!errors.firstName}
                // helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CUSIP"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cusip}
                name="cusip"
                // error={!!touched.lastName && !!errors.lastName}
                // helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Issuer Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.issuer}
                name="issuer"
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Coupon Value"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.coupon}
                name="coupon"
                // error={!!touched.contact && !!errors.contact}
                // helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                // error={!!touched.address1 && !!errors.address1}
                // helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Face Value"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.faceValue}
                name="faceValue"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Security
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  isin: yup.string().required("required"),
  cusip: yup.string().required("required"),
  issuer: yup.string().required("required"),
  coupon: yup
    .number()
    .required("required"),
  type: yup.string().required("required"),
  faceValue: yup.number().required("required"),
  status: yup.string().required("required"),
});
const initialValues = {
  isin: "",
  cusip: "",
  issuer: "",
  coupon: 0,
  type: "",
  faceValue: 0,
  status: ""
}

export default SecurityForm;
