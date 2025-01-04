const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
const dayBeforePreviousDay = new Date(
  new Date().getTime() - 24 * 60 * 60 * 1000 * 2
);

import avatar1 from "@/public/images/avatar/avatar-7.jpg";
import avatar2 from "@/public/images/avatar/avatar-2.jpg";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";
import avatar4 from "@/public/images/avatar/avatar-4.jpg";
import avatar5 from "@/public/images/avatar/avatar-5.jpg";
import avatar6 from "@/public/images/avatar/avatar-6.jpg";
import avatar7 from "@/public/images/avatar/avatar-7.jpg";
import avatar8 from "@/public/images/avatar/avatar-8.jpg";
export const profileUser = {
  id: 11,
  avatar: "/images/avatar/avatar-2.jpg",
  fullName: "Mr. Bean",
  bio: "UX/UI Designer",
  role: "admin",
  about:
    "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
  status: "online",
  settings: {
    isTwoStepAuthVerificationEnabled: true,
    isNotificationsOn: false,
  },
  date: "10 am",
};

export const contacts = [
  {
    id: 1,
    fullName: "Felecia Rower",
    role: "Frontend Developer",
    about:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
    avatar: "/images/avatar/avatar-2.jpg",
    status: "online",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 2,
    fullName: "Adalberto Granzin",
    role: "UI/UX Designer",
    about:
      "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
    avatar: "/images/avatar/avatar-3.jpg",
    status: "online",
    unreadmessage: 1,
    date: "10 am",
  },
  {
    id: 3,
    fullName: "Joaquina Weisenborn",
    role: "Town planner",
    about:
      "Soufflé soufflé caramels sweet roll. Jelly lollipop sesame snaps bear claw jelly beans sugar plum sugar plum.",
    avatar: "/images/avatar/avatar-4.jpg",
    status: "busy",
    unreadmessage: 1,
    date: "10 am",
  },
  {
    id: 4,
    fullName: "Verla Morgano",
    role: "Data scientist",
    about:
      "Chupa chups candy canes chocolate bar marshmallow liquorice muffin. Lemon drops oat cake tart liquorice tart cookie. Jelly-o cookie tootsie roll halvah.",
    avatar: "/images/avatar/avatar-5.jpg",
    status: "online",
    unreadmessage: 2,
    date: "10 am",
  },
  {
    id: 5,
    fullName: "Margot Henschke",
    role: "Dietitian",
    about:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
    avatar: "/images/avatar/avatar-6.jpg",
    status: "busy",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 6,
    fullName: "Sal Piggee",
    role: "Marketing executive",
    about:
      "Toffee caramels jelly-o tart gummi bears cake I love ice cream lollipop. Sweet liquorice croissant candy danish dessert icing. Cake macaroon gingerbread toffee sweet.",
    avatar: "/images/avatar/avatar-7.jpg",
    status: "online",
    unreadmessage: 2,
    date: "10 am",
  },
  {
    id: 7,
    fullName: "Miguel Guelff",
    role: "Special educational needs teacher",
    about:
      "Biscuit powder oat cake donut brownie ice cream I love soufflé. I love tootsie roll I love powder tootsie roll.",
    avatar: "/images/avatar/avatar-8.jpg",
    status: "online",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 8,
    fullName: "Mauro Elenbaas",
    role: "Advertising copywriter",
    about:
      "Bear claw ice cream lollipop gingerbread carrot cake. Brownie gummi bears chocolate muffin croissant jelly I love marzipan wafer.",
    avatar: "/images/avatar/avatar-4.jpg",
    status: "away",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 9,
    fullName: "Bridgett Omohundro",
    role: "Designer, television/film set",
    about:
      "Gummies gummi bears I love candy icing apple pie I love marzipan bear claw. I love tart biscuit I love candy canes pudding chupa chups liquorice croissant.",
    avatar: "/images/avatar/avatar-7.jpg",
    status: "offline",
    unreadmessage: 0,
    date: "10 am",
  },
  {
    id: 10,
    fullName: "Zenia Jacobs",
    role: "Building surveyor",
    about:
      "Cake pie jelly jelly beans. Marzipan lemon drops halvah cake. Pudding cookie lemon drops icing",
    avatar: "/images/avatar/avatar-7.jpg",
    status: "away",
    unreadmessage: 1,
    date: "10 am",
  },
];

export const chats = [
  {
    id: 1,
    userId: 1,
    unseenMsgs: 0,
    chat: [
      {
        id: "1",
        message: "Hi",
        time: new Date("2018-12-10T07:45:00Z").toISOString(),
        senderId: 11,
        replayMetadata: false,
      },
      {
        id: "2",
        message: "Hello. How can I help You?",
        time: new Date("2018-12-11T07:45:15Z").toISOString(),
        senderId: 2,
        replayMetadata: false,
      },
      {
        id: "3",
        message: "Can I get details of my last transaction I made last month?",
        time: new Date("2018-12-11T07:46:10Z").toISOString(),
        senderId: 11,
        replayMetadata: false,
      },
      {
        id: "4",
        message: "We need to check if we can provide you such information.",
        time: new Date("2018-12-11T07:45:15Z").toISOString(),
        senderId: 2,
        replayMetadata: false,
      },
      {
        id: "5",
        message: "I will inform you as I get update on this.",
        time: new Date("2018-12-11T07:46:15Z").toISOString(),
        senderId: 2,
        replayMetadata: false,
      },
      {
        id: "6",
        message: "If it takes long you can mail me at my mail address.",
        time: previousDay.toISOString(),
        senderId: 11,
        replayMetadata: false,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    unseenMsgs: 1,
    chat: [
      {
        id: "chat2-1",
        message: "How can we help? We're here for you!",
        time: new Date("2018-12-10T07:45:00Z").toISOString(),
        senderId: 11,
        replayMetadata: false,
      },
      {
        id: "chat2-2",
        message: "Hey John, I am looking for the best admin template. Could you please help me to find it out?",
        time: new Date("2018-12-10T07:45:23Z").toISOString(),
        senderId: 1,
        replayMetadata: false,
      },
      {
        id: "chat2-3",
        message: "It should be Bootstrap 5 compatible.",
        time: new Date("2018-12-10T07:45:55Z").toISOString(),
        senderId: 1,
        replayMetadata: false,
      },
      {
        id: "chat2-4",
        message: "Absolutely!",
        time: new Date("2018-12-10T07:46:00Z").toISOString(),
        senderId: 11,
        replayMetadata: false,
      },
      {
        id: "chat2-5",
        message: "Modern admin is the responsive bootstrap 5 admin template.!",
        time: new Date("2018-12-10T07:46:05Z").toISOString(),
        senderId: 11,
        replayMetadata: false,
      },
      {
        id: "chat2-6",
        message: "Looks clean and fresh UI.",
        time: new Date("2018-12-10T07:46:23Z").toISOString(),
        senderId: 1,
        replayMetadata: false,
      },
      {
        id: "chat2-7",
        message: "It's perfect for my next project.",
        time: new Date("2018-12-10T07:46:33Z").toISOString(),
        senderId: 1,
        replayMetadata: false,
      },
      {
        id: "chat2-8",
        message: "How can I purchase it?",
        time: new Date("2018-12-10T07:46:43Z").toISOString(),
        senderId: 1,
        replayMetadata: false,
      },
      {
        id: "chat2-9",
        message: "Thanks, from ThemeForest.",
        time: new Date("2018-12-10T07:46:53Z").toISOString(),
        senderId: 11,
        replayMetadata: false,
      },
      {
        id: "chat2-10",
        message: "I will purchase it for sure. 👍",
        time: previousDay.toISOString(),
        senderId: 1,
        replayMetadata: false,
      },
    ],
  },
];
