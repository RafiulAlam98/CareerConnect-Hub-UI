import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
// import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const adminSidebarItems: MenuProps["items"] = [
    {
      label: "Manage Company",
      key: "company",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link to="/dashboard/company-chart">Company Chart</Link>,
          key: `/${role}/dashboard/company-chart`,
        },
        {
          label: <Link to="/dashboard/company">View Company</Link>,
          key: `/${role}/dashboard/company`,
        },
      ],
    },
    {
      label: "Manage Blog",
      key: "blog",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link to="/dashboard/blog">View Blog</Link>,
          key: `/${role}/dashboard/blog`,
        },
        {
          label: <Link to="/dashboard/blog/create">Publish a Blog</Link>,
          key: `/${role}/dashboard/blog/create`,
        },
      ],
    },
    // {
    //   label: "Manage Events",
    //   key: "events",
    //   icon: <AppstoreOutlined />,
    //   children: [
    //     {
    //       label: <Link to="/dashboard/events">View Events</Link>,
    //       key: `/${role}/dashboard/events`,
    //     },
    //     {
    //       label: <Link to="/dashboard/events/create">Create an event</Link>,
    //       key: `/${role}/dashboard/events/create`,
    //     },
    //   ],
    // },
  ];

  const recruiterSidebarItems: MenuProps["items"] = [
    {
      label: "Manage Job",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link to="/dashboard/job">View Jobs</Link>,
          key: `/${role}/dashboard/job`,
        },
        {
          label: <Link to="/dashboard/job/create">Publish a Job</Link>,
          key: `/${role}/dashboard/job/create`,
        },
        {
          label: <Link to="/dashboard/job/applied-jobs">Applied Jobs</Link>,
          key: `/${role}/dashboard/job/applied-jobs`,
        },
      ],
    },
  ];

  const applicantSidebarItems: MenuProps["items"] = [
    {
      label: "Jobs",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link to="/dashboard/job/appliedJob">Applied Job</Link>,
          key: `/${role}/dashboard/job/appliedJob`,
        },
      ],
    },
  ];

  // if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  // else if (role === USER_ROLE.RECRUITER) return recruiterSidebarItems;

  return recruiterSidebarItems;
};
