import React from "react";
import Link from "next/link";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";

export default function BlogPostCard({ title, slug, gradient }) {
  return (
    <Link href={"#"}>
      <a>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "200px",
            border: "4px solid lightgray",
            borderRadius: "6px",
            padding: 2,
          }}
        >
          <Stack
            sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <Typography>Title</Typography>
            <Stack direction="row">
              <Box>Icon</Box>
              <Box>viewcount</Box>
            </Stack>
          </Stack>
        </Box>
      </a>
    </Link>
  );
}
