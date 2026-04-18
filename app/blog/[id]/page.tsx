import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllNews, getNewsById } from "@/lib/data/news";

type PageProps = {
    params: {
        id: string;
    };
}

function formatFullDate(dateString: string){
    const date = new Date(dateString);

    return date.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
    }).toUpperCase();

}

export async function generateStaticParams(){
    const posts = await getAllNews();

    return posts.map((post) => ({
        id: post.id,
    }));
}


export default async function BlogPostPage({ params }: PageProps) {
    const { id } = await params;

    const post = getNewsById(id);

    if (!post){
        notFound();
    }
  

    return (
      <main className="mx-[120px] pt-12">
        <Link href="/blog" className="my-[40px] cursor-pointer hover:underline">
          &lt; &thinsp; Back to recent news
        </Link>

        <div className="flex justify-between my-[30px]">
          <h1 className="text-[70px] leading-none tracking-tighter mr-[40px]">{post.title}</h1>
          <p className="self-start mr-[40px] text-[14px] max-w-[80px]">{formatFullDate(post.date)}</p>
        </div>

        <hr className="h-[2px] mb-[40px]"/>
        <div className="mb-[40px]">
            {post.image ? (
                <Image
                    src={post.image}
                    alt={post.title}
                    width={900}
                    height={500}
                    className="h-auto w-full max-w-[900px] max-h-[500px] object-cover"
                />
            ) : null}
          <p className="whitespace-pre-wrap text-[19px]">{post.description}</p>

          {post.url ? (
            <div className="flex">
                <a
                    href={post.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center mt-[40px] ml-auto rounded-full mr-[30px] border px-5 py-3 transition hover:opacity-80"
                    >
                    Read more &thinsp; &gt;
                </a>
            </div>
        ) : null}
        </div>
      </main>
    );
  }