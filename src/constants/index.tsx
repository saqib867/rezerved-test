import { PaymentTypes } from "@/types/PaymentTypes";
import { MenueItemsTypes } from "@/types/CommonTypes";
import { RiDashboardLine, RiFileListLine } from "react-icons/ri";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { TbUsersGroup } from "react-icons/tb";
import { TfiAnnouncement } from "react-icons/tfi";
import { UserTypes } from "@/types/UserTypes";

const user = "/images/user.svg";
export const menuItems: MenueItemsTypes[] = [
  { name: "Dashboard", icon: RiDashboardLine, route: "/dashboard" },
  { name: "Payments", icon: HiArrowsRightLeft, route: "/dashboard/payments" },
  { name: "ADs", icon: TfiAnnouncement, route: "/dashboard/ads" },
  { name: "Users", icon: TbUsersGroup, route: "/dashboard/users" },
  { name: "Reports", icon: RiFileListLine, route: "/dashboard/reports" },
];

// payment
export const paymentData: any[] = [
  {
    userId: "1",
    name: "Ahmad",
    img: user,
    email: "ahmad@gmail.com",
    time: "Dec 4, 2019 21:42",
    RequestAmount: 100,
    status: "Active",
  },
  {
    userId: "2",
    name: "Noman",
    img: user,
    email: "noman@gmail.com",
    time: "Dec 4, 2019 21:42",
    RequestAmount: 150,
    status: "Pending",
  },
  {
    userId: "3",
    name: "Anas",
    img: user,
    email: "anas@gmail.com",
    time: "Dec 4, 2019 21:42",
    RequestAmount: 200,
    status: "Denied",
  },
];

export const paymentTabs = [
  { id: 1, tabName: "All", value: "all" },
  { id: 2, tabName: "Pending", value: "pending" },
  { id: 3, tabName: "Paid", value: "paid" },
  { id: 4, tabName: "Denied", value: "denied" },
];

// user
export const userData: any[] = [
  {
    userId: "1",
    name: "Ahmad",
    img: user!,
    email: "ahmad@gmail.com",
    status: "Active",
  },
  {
    userId: "2",
    name: "Noman",
    img: user,
    email: "noman@gmail.com",
    status: "Disable",
  },
  {
    userId: "3",
    name: "Anas",
    img: user,
    email: "anas@gmail.com",
    status: "Active",
  },
];

export const userTabs = [
  { id: 1, tabName: "All", lable: "all" },
  { id: 2, tabName: "Active Users", lable: "active" },
  { id: 3, tabName: "Suspended Users", lable: "suspended" },
];

export const reservationTab = [
  { id: 1, tabName: "All", lable: "all" },
  { id: 2, tabName: "Approved", lable: "approved" },
  { id: 3, tabName: "Rejected", lable: "rejected" },
];

// report
export const reportData: any[] = [
  {
    userId: "1",
    name: "Ahmad",
    img: user,
    email: "ahmad@gmail.com",
    time: "Dec 4, 2019 21:42",
    subject: "loading issue",
    description:
      "pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.",
    status: "Active",
  },
  {
    userId: "2",
    name: "Noman",
    img: user,
    email: "noman@gmail.com",
    time: "Dec 4, 2019 21:42",
    subject: "loading issue",
    description:
      "pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.",
    status: "Pending",
  },
  {
    userId: "3",
    name: "Anas",
    img: user,
    email: "anas@gmail.com",
    time: "Dec 4, 2019 21:42",
    subject: "loading issue",
    description:
      "pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.",
    status: "Denied",
  },
];

export const reportTabs = [
  { id: 1, tabName: "All", label: "all" },
  { id: 2, tabName: "Pending", label: "pending" },
  { id: 3, tabName: "Resolved", label: "resolved" },
];

// ads
export const adsData: any[] = [
  {
    adsId: "1",
    title: "The White Abode",
    img: user,
    location: "33, Laxmi Palace, S V Road, r....",
    guests: "10 guests",
    price: 80,
    status: "Accepted",
  },
  {
    adsId: "2",
    title: "Noman",
    img: user,
    location: "33, Laxmi Palace, S V Road, r....",
    guests: "10 guests",
    price: 80,
    status: "Rejected",
  },
  {
    adsId: "3",
    title: "Anas",
    img: user,
    location: "33, Laxmi Palace, S V Road, r....",
    guests: "10 guests",
    price: 80,
    status: "Denied",
  },
];

export const adsTabs = [
  { id: 1, tabName: "All" },
  { id: 2, tabName: "New" },
  { id: 3, tabName: "Approved" },
  { id: 4, tabName: "Rejected" },
];
