import { client } from "@/sanity/lib/client";
import BlogPostHeader from "./components/BlogPostHeader";
import Container from "@/app/components/Container";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { tryGetImageDimensions } from "@sanity/asset-utils";
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const portableTextComponents = {
  types: {
    image: ImageComponent,
  },
};

function ImageComponent({ value }) {
  const { width, height } = tryGetImageDimensions(value);

  return (
    <Image
      src={urlFor(value).fit("max").auto("format").url()}
      width={width}
      height={height}
      alt={value.alt || 'Blog post image'}
      loading="lazy"
      className="mx-auto md:max-w-prose rounded-lg"
      style={{
        aspectRatio: width / height,
      }}
    />
  );
}


async function getBlogPost(slug) {
  const query = `*[_type == "blogPost" && slug.current == $slug] {
    title,
    description,
    date,
    "slug":slug.current,
    image,
    content
  }`;

  const posts = await client.fetch(query, { slug });
  return posts;
}

export default async function Page({ params }) {
  const { post } = await params;
  const posts = await getBlogPost(post);

  return posts.length > 0 && (
    <Container>
      <div className="mx-auto max-w-prose space-y-8 py-8">
        <BlogPostHeader post={posts[0]} />
        <hr className="border-primary-200" />
        <article className="prose md:prose-md prose-primary mx-auto">
          <PortableText value={posts[0].content} components={portableTextComponents} />
        </article>
      </div>
    </Container>
  );
}