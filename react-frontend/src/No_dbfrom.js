import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const No_dbfrom = () => {
    const handleSubmit = (values, { setSubmitting }) => {
      // Perform actions to save footer form data
      console.log("Form data:", values);
  
      // Convert form data to string
      let formDataString =
        "Form data:\n" + JSON.stringify(values, null, 2);
  
      // Generate file name based on the value of the "name" field and current date
      const fileName = `${values.name}_${
        new Date().toISOString().split("T")[0]
      }.txt`;
  
      // Create a Blob with the form data
      const blob = new Blob([formDataString], { type: "text/plain" });
  
      // Create a temporary anchor element to trigger file download
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.target = "_blank"; // Open in a new tab to suggest download location
  
      // Append anchor element to body and click it to trigger download
      document.body.appendChild(a);
      a.click();
  
      // Remove anchor element
      document.body.removeChild(a);
  
      // Revoke the Blob URL
      window.URL.revokeObjectURL(a.href);
  
      setSubmitting(false); // Don't forget to setSubmitting(false) when done
    };
  
    return (
      <div className="container my-3">
        <h2 className="text-center">Footer Form</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            dateOfBirth: "",
            country: "",
            subscription: [], // Initialize as an empty array
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            dateOfBirth: Yup.date().required("Required"),
            country: Yup.string().required("Required"),
            subscription: Yup.array().min(
              1,
              "At least one subscription is required"
            ), // Validate as an array
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="col-md-6 m-auto">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <Field type="date" name="dateOfBirth" className="form-control" />
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <Field as="select" name="country" className="form-control">
                  <option value="">Select a country</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label>Subscription</label>
                <div>
                  <div className="form-check form-check-inline">
                    <Field
                      type="checkbox"
                      id="newsletter"
                      name="subscription"
                      value="newsletter"
                      className="form-check-input"
                    />
                    <label htmlFor="newsletter" className="form-check-label">
                      Newsletter
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <Field
                      type="checkbox"
                      id="updates"
                      name="subscription"
                      value="updates"
                      className="form-check-input"
                    />
                    <label htmlFor="updates" className="form-check-label">
                      Updates
                    </label>
                  </div>
                </div>
                <ErrorMessage
                  name="subscription"
                  component="div"
                  className="text-danger"
                />
              </div>
  
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };
  export default No_dbfrom;