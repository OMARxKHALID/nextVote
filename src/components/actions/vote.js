const BASE_URL = process.env.NEXTAUTH_URL;

export async function createVote(vote) {
  try {
    const res = await fetch(`/api/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return handleFetchError(error);
  }
}

export async function getVote(userId) {
  try {
    const res = await fetch(`${BASE_URL}/api/vote/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return handleFetchError(error);
  }
}

export async function deleteVoteById(_id) {
  try {
    const res = await fetch(`/api/vote/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
      cache: "no-store",
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    return handleFetchError(error);
  }
}

export async function getVoteById(_id) {
  try {
    const res = await fetch(`${BASE_URL}/api/vote/get/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    return handleFetchError(error);
  }
}

export async function updateVoteById({ _id, data }) {
  try {
    const res = await fetch(`/api/vote/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, data }),
      cache: "no-store",
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    return handleFetchError(error);
  }
}

export async function getVoteOptionsById(_id) {
  try {
    const res = await fetch(`/api/vote/get/${_id}/options`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    return handleFetchError(error);
  }
}

export async function castVoteLogs(id, option, userId) {
  try {
    const res = await fetch(`/api/vote/cast/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ option, id, userId }),
      cache: "no-store",
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    return handleFetchError(error);
  }
}

export async function getVoteLogs(id, userId) {
  try {
    const res = await fetch(`/api/vote/cast/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userId }),
      cache: "no-store",
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    return handleFetchError(error);
  }
}

export async function listActiveVotes() {
  try {
    const res = await fetch(`${BASE_URL}/api/vote/list/active`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    return handleFetchError(error);
  }
}
export async function listExpiredVotes() {
  try {
    const res = await fetch(`${BASE_URL}/api/vote/list/expired`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const resData = await res.json();
    return resData;
  } catch (error) {
    return handleFetchError(error);
  }
}

async function handleFetchError(error) {
  console.error("Error:", error.message);
  return { error: error.message };
}
