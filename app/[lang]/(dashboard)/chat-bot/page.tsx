import ChatBotPageView from "./page-view";
import { getDictionary } from "@/app/dictionaries";

const Page = async ({ params: { lang } }: { params: { lang: "en" | "bn" | "ar" } }) => {
  const trans = await getDictionary(lang);
  return <ChatBotPageView trans={trans} />;
};

export default Page;