import HomePageCard from "@/components/Cards/HomePageCard";
import getPosts from "@/util/getPots";
import { IPost } from "@/util/PostsInterface";

export default async function Home () {
  const posts: IPost[] = await getPosts()

  return (
    <div className="flex w-full h-screen items-center flex-col overflow-auto">
        <div className="mt-14 sm:hidden"></div>
          {posts.map((items: IPost) => (
            <HomePageCard {...items} />
          ))}
          <div className="mb-16"></div>
    </div>
  );
}