/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, message } from "antd";
import { useAddPortfolioMutation } from "../../redux/api/portfolioApi";
import { getUserInfo } from "../../services/auth.service";
import Form from "../Forms/Form";
import FormInput from "../Forms/FormInput";

const PortfolioModal = () => {
  const [addPortfolio] = useAddPortfolioMutation();
  const { email } = getUserInfo() as any;

  const onSubmit = async (trainingData: any) => {
    message.loading("Adding...");
    try {
      const trainingDataWithEmail = {
        ...trainingData,
        userEmail: email,
      };
      await addPortfolio(trainingDataWithEmail);
      message.success("Portfolio added successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <div>
      <p
        style={{
          fontSize: "1.1rem",
          marginTop: "1rem",
          marginBottom: ".5rem",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Work samples
      </p>
      <Form submitHandler={onSubmit}>
        <div style={{ width: "100%", marginTop: "-.5rem" }}>
          <FormInput label="GitHub profile" name="gitHub" size="large" />
        </div>
        <div style={{ width: "100%", marginTop: "-.5rem" }}>
          <FormInput label="Other work sample link" name="other" size="large" />
        </div>
        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "10px" }}
        >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PortfolioModal;
