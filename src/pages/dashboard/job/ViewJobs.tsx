/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useState } from "react";
import DataTable from "../../../components/ui/dashboard/common/DataTable";
import { useDeleteJobMutation, useJobsQuery } from "../../../redux/api/jobApi";
import { Link, useNavigate } from "react-router-dom";

const ViewJobs = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useJobsQuery({ ...query });
  const jobData = data?.data?.data;
  const [deleteJob] = useDeleteJobMutation();
  // console.log("jobData", jobData);

  const navigate = useNavigate();

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const deleteHandler = async (id: string) => {
    message.loading("Deleting.....");
    try {
      const res = await deleteJob(id);
      if (res) {
        message.success("Job Deleted successfully");
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/dashboard/blog/edit/${id}`);
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Salary",
      dataIndex: "salary",
      sorter: true,
    },
    {
      title: "Job Type",
      dataIndex: "jobType",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link to={`/dashboard/job/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => handleEdit(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button onClick={() => deleteHandler(data)} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <h2
        style={{
          color: "#1F2B6C",
          textAlign: "center",
          margin: "30px 0",
        }}
      >
        Job Details
      </h2>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={jobData}
        showSizeChanger={true}
        showPagination={true}
        pageSize={size}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
      />
    </div>
  );
};

export default ViewJobs;
