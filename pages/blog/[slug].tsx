import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import { postFilePaths, POSTS_PATH } from "utils/mdxUtils";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import React from "react";
import Box from "@mui/material/Box";

import ContainerHero from "components/ContainerHero";
import { Typography, Stack, Avatar } from "@mui/material";

/* const components = {
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  TestComponent: dynamic(() => import("components/TestComponent")),
  Head,
  h2: () => <Typography variant="h2" sx={{ color: "red" }} />,
  h3: () => <Typography variant="h3" sx={{ color: "red" }} />,
}; */

const components = {
    h1: (props) => <Typography variant="h1" {...props} />,
    h2: (props) => (
        <Typography
            component="h2"
            {...props}
            sx={{
                fontWeight: 700,
                fontSize: "1.5em",
                marginTop: "2em",
                marginBottom: "1em",
                lineHeight: "1.3333",
                color: "#111827",
            }}
        />
    ),
    p: (props) => (
        <Typography
            component="p"
            {...props}
            sx={{
                marginTop: "1.25em",
                marginBottom: "1.25em",
                "& > a ": {
                    color: "#3b82f6",
                    textDecoration: "underline",
                    fontWeight: "600",
                    transitionProperty: "all",
                    transitionTimingFunction: `cubic-bezier(.4,0,.2,1)`,
                    transitionDuration: ".15s",
                    "&:hover": {
                        color: "#1d4ed8",
                    },
                },
            }}
        />
    ),
    blockquote: (props) => (
        <Typography
            component="blockquote"
            {...props}
            sx={{
                /* fontWeight: "bold", */
                fontStyle: "italic",
                borderLeftWidth: "0.25rem",
                borderLeftColor: "#e5e7eb",
                color: "#111827",
                marginTop: "1.6em",
                marginBottom: "1.6em",
                paddingLeft: "1em",
                " > p ": {
                    fontWeight: 600,
                },
            }}
        />
    ),
    ul: (props) => (
        <Typography
            {...props}
            component="ul"
            sx={{
                listStyle: "none",
                margin: "0",
                padding: "0",
                listStyleType: "disc",
                paddingLeft: "1.625em !important",
                "& > li": {
                    paddingLeft: "0.375em",
                    marginTop: "0.5em",
                    marginBottom: "0.5em",
                },
            }}
        />
    ),
};

export default function PostPage({ source, frontMatter }) {
    // console.log(source);

    return (
        <ContainerHero variantContainer="blog">
            <header>
                <nav></nav>
            </header>
            <Box sx={{ mb: "32px", mt: "16px" }}>
                <Typography
                    component="h1"
                    sx={{ fontSize: "42px", fontWeight: "800" }}
                >
                    {frontMatter.title}
                </Typography>
                <Box component="blockquote">ads</Box>
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignContent: "center",
                        mt: "16px",
                        mb: "32px",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "inherit" }}
                    >
                        <Avatar
                            sx={{
                                width: "26px",
                                height: "26px",
                            }}
                        >
                            A
                        </Avatar>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "gray",
                            }}
                        >
                            Arrofi Reza Satria
                        </Typography>
                        <Typography>/</Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "gray",
                            }}
                        >
                            August 07, 2019
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "gray",
                            }}
                        >
                            12 min read
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "gray",
                            }}
                        >
                            /
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "gray",
                            }}
                        >
                            8231 views
                        </Typography>
                    </Stack>
                </Stack>
                {/* 
                {frontMatter.description && (
                    <Typography className="description">
                        {frontMatter.description}
                    </Typography>
                )} */}
            </Box>
            <main>
                <MDXRemote {...source} components={components} />;
            </main>
        </ContainerHero>
    );
}

export const getStaticProps = async ({ params }) => {
    const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
    // console.log(POSTS_PATH);

    const source = fs.readFileSync(postFilePath);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                rehypeSlug,
                rehypeCodeTitles,
                rehypeAutolinkHeadings,
                rehypePrism,
            ],
        },
        scope: data,
    });

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    };
};

export const getStaticPaths = async () => {
    const paths = postFilePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ""))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
};
