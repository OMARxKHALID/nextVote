"use server";

const BASE_URL = process.env.NEXTAUTH_URL;

async function fetchData(url, method = "POST", body) {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return handleFetchError(error);
  }
}

export async function createVote(vote) {
  return fetchData("/api/vote", "POST", { vote });
}

export async function getVote(userId) {
  return fetchData("/api/vote/get", "POST", { userId });
}

export async function deleteVoteById(_id) {
  return fetchData("/api/vote/delete", "POST", { _id });
}

export async function getVoteById(_id) {
  return fetchData(`/api/vote/get/${_id}`, "POST", { _id });
}

export async function updateVoteById({ _id, data }) {
  return fetchData("/api/vote/edit", "POST", { _id, data });
}

export async function getVoteOptionsById(_id) {
  return fetchData(`/api/vote/get/${_id}/options`, "POST", { _id });
}

export async function castVoteLogs(id, option, userId) {
  return fetchData(`/api/vote/cast/${id}`, "POST", { option, id, userId });
}

export async function getVoteLogs(id, userId) {
  return fetchData("/api/vote/cast/get", "POST", { id, userId });
}

export async function listActiveVotes() {
  return fetchData("/api/vote/list/active");
}

export async function listExpiredVotes() {
  return fetchData("/api/vote/list/expired");
}

export async function createComment({ text, voteId, sendBy }) {
  return fetchData("/api/comment/create", "POST", { text, voteId, sendBy });
}

export async function getComment(voteId) {
  return fetchData("/api/comment", "POST", voteId);
}

async function handleFetchError(error) {
  console.error("Error:", error.message);
  return { error: error.message };
}
