import React, { useEffect } from "react";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../redux/userReducer";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const basicSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Required"),
    password: yup.string().required("Required"),
  });
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, errorMsg } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (user && isSuccess) {
      navigate("/");
    }

    console.log("working");
    dispatch(reset());
  }, [user]);
  const onSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <Typography variant="h4">Login Page</Typography>
        {isError && <Alert severity="error">{errorMsg}</Alert>}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={basicSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form>
              <div style={{ marginTop: "10px" }}>
                <Field
                  as={TextField}
                  label="Email"
                  error={errors.email && touched.email}
                  helperText={<ErrorMessage name="email" />}
                  name="email"
                  fullWidth
                />
              </div>

              <div style={{ marginTop: "10px" }}>
                <Field
                  as={TextField}
                  type="password"
                  name="password"
                  label="Password"
                  error={errors.password && touched.password}
                  helperText={<ErrorMessage name="password" />}
                  placeholder="password"
                  fullWidth
                />
              </div>
              <div style={{ marginTop: "10px" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div style={{ marginTop: "10px" }}>
        <span>
          Create a new Account <Link to={"/signup"}>Signup</Link>
        </span>
      </div>
    </Container>
  );
};

export default LoginPage;

// const {
//   values,
//   handleChange,
//   handleSubmit,
//   errors,
//   touched,
//   handleBlur,
//   isSubmitting,
// } = useFormik({
//   initialValues: {
//     email: "",
//     password: "",
//   },
//   validationSchema: basicSchema,
//   onSubmit,
// });

// {
//   /* <Container maxWidth="xs">
//       <div style={{ marginTop: "100px", textAlign: "center" }}>
//         <Typography variant="h4">Login</Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Email"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             id="email"
//             value={values.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />
//           {errors.email && touched.email && <span>{errors.email}</span>}

//           <TextField
//             label="Password"
//             fullWidth
//             variant="outlined"
//             margin="normal"
//             type="password"
//             id="password"
//             value={values.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//           />
//           {errors.password && touched.password && (
//             <span>{errors.password}</span>
//           )}
//           <Button disabled={isSubmitting} type="submit" fullWidth variant="contained" color="primary">
//             Login
//           </Button>
//         </form>
//       </div>
//     </Container> */
// }
