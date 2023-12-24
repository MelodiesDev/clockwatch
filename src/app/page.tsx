"use client";

import { Card } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import { ClockifyUser } from "@/types/ClockifyUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<ClockifyUser>({
    queryKey: ["clockify", "user"],
    queryFn: () =>
      fetch(
        "https://api.clockify.me/api/v1/workspaces/{workspaceId}/expenses",
        {
          headers: {
            "X-Api-Key": localStorage.getItem("apiKey") || ""
          }
        }
      ).then((res) => res.json())
  });

  return (
    <main className="flex">
      <Grid
        container
        spacing={2}
        sx={{ ml: "auto", mr: "auto", textAlign: "center" }}
      >
        <Grid xs={4}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              cum
            </Typography>
            <Typography variant="h3" gutterBottom>
              3.06
            </Typography>
            <Card sx={{ borderRadius: "16px" }}>
              <Typography>
                <span style={{ color: "lightGreen" }}>+3.56%</span>
                <span> since yesterday!</span>
              </Typography>
            </Card>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h5">Client Leaderboard</Typography>
            <Typography>Pee</Typography>
          </Card>
        </Grid>
        <Grid xs={4}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h5">Projected Earnings</Typography>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
}
