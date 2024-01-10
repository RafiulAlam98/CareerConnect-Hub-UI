/* eslint-disable @typescript-eslint/no-explicit-any */
import Search from "antd/es/input/Search";
import { useJobsQuery } from "../../redux/api/jobApi";
import { Button, Card, Col, Divider, Flex, Row } from "antd";
import { IJobData } from "../../types";
import { RiseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import GlobalModal from "../../components/shared/GlobalModal";
import AppliedModal from "../../components/ResumeModal/AppliedModal";
import { useState } from "react";

const FindJob = () => {
  const [open, setOpen] = useState(false);
  const query: Record<string, any> = {};
  const { data } = useJobsQuery({ ...query });
  const jobData = data?.data?.data;

  return (
    <div style={{ minHeight: "100vh", margin: "30px 50px" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            color: "#123770",
            marginBottom: "20px",
            fontSize: "30px",
          }}
        >
          Explore Exciting Job Opportunities
        </h2>
        <h4>
          Discover your next career move with personalized job recommendations.
        </h4>
        <p>In the meantime, run a search to find your perfect job</p>
      </div>

      <Row gutter={[16, 24]}>
        <Col
          xs={24}
          sm={24}
          md={8}
          lg={8}
          xl={8}
          style={{
            textAlign: "center",
          }}
        >
          <h3>Search Criteria</h3>
          <p
            style={{
              marginTop: "5px",
              marginBottom: "15px",
            }}
          >
            As per my{" "}
            <span
              style={{
                color: "#4096FF",
                fontWeight: "bold",
              }}
            >
              preferences
            </span>
          </p>
          <Search placeholder="Search for jobs" enterButton size="large" />
        </Col>

        {jobData?.map((job: IJobData) => (
          <Col xs={24} sm={24} md={16} lg={16} xl={16} key={job?._id}>
            <div
              style={{
                height: "100%",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  padding: "0 20px",
                  paddingTop: "20px",
                  color: "blue",
                  display: "flex",
                  gap: "5px",
                }}
              >
                <RiseOutlined /> <p>Active Hiring</p>
              </div>

              <Card bordered={false}>
                <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                  {job?.title}
                </h3>
                <p>{job?.company}</p>
                <br />
                <div>
                  <h4>Location</h4>
                  <p>{job?.location}</p>
                </div>

                <Divider />

                <Flex wrap="wrap" gap="20px">
                  <div>
                    <h4>Job Type</h4>
                    <p>{job?.jobType}</p>
                  </div>
                  <div>
                    <h4>Joining Date</h4>
                    <p>{job?.joiningDate}</p>
                  </div>
                  <div>
                    <h4>CTC</h4>
                    <p>{job?.salary}</p>
                  </div>
                  <div>
                    <h4>Experience</h4>
                    <p>{job?.experienceLevel}</p>
                  </div>
                </Flex>

                <Divider />
                <br />
                <Flex wrap="wrap" gap="small" justify="end" align="center">
                  <Link to={`/details/${job?._id}`}>View Details</Link>
                  <Button type="primary" onClick={() => setOpen(true)}>
                    Apply Now
                  </Button>
                </Flex>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      <GlobalModal open={open} setOpen={setOpen} width={650} title={""}>
        <AppliedModal />
      </GlobalModal>
    </div>
  );
};

export default FindJob;